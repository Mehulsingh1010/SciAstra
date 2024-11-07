const express = require("express");
const oracledb = require("oracledb");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;

const JWT_SECRET = 'your_jwt_secret_key'; // Secret key to sign JWT tokens

// Middleware for parsing request body and enabling CORS
app.use(bodyParser.json());
app.use(cors());

// Database configuration for Oracle
const dbConfig = {
  user: "system", // Oracle DB username
  password: "q", // Oracle DB password
  connectString: "LAPTOP-ORK2PTHC:1521/XE", // Oracle DB connection string
};

// Function to connect to Oracle DB
async function getDBConnection() {
  try {
    console.log("Attempting to connect to the database...");
    const connection = await oracledb.getConnection(dbConfig);
    console.log("Successfully connected to the database");
    return connection;
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    throw new Error("Database connection error");
  }
}

// Register Route
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  let connection;
  try {
    connection = await getDBConnection();

    // Check if the user already exists
    const existingUserResult = await connection.execute(
      `SELECT COUNT(*) AS count FROM user2 WHERE username = :username`,
      [username],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    if (existingUserResult.rows[0].COUNT > 0) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      // Assign role 'admin' if username is 'admin', otherwise assign 'user'
      const role = username === 'admin' ? 'admin' : 'user';

      // Insert new user with USER_ID generated from sequence and assign role
      const result = await connection.execute(
        `INSERT INTO user2 (USER_ID, username, password, ROLE) 
         VALUES (user2_seq.NEXTVAL, :username, :password, :role)`,
        [username, password, role],
        { autoCommit: true }
      );
      res.status(201).json({ message: "User registered successfully" });
    }
  } catch (err) {
    console.error("Error in /register route:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (closeError) {
        console.error("Error closing the database connection:", closeError.message);
      }
    }
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  let connection;
  try {
    connection = await getDBConnection();

    // Query to check the user details, including the role (admin or not)
    const result = await connection.execute(
      `SELECT * FROM user2 WHERE username = :username`,
      [username],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    if (result.rows.length > 0) {
      const user = result.rows[0];

      // Check password
      if (user.PASSWORD === password) {
        // Generate a JWT token with user info and role
        const token = jwt.sign(
          { userId: user.USER_ID, username: user.username, role: user.ROLE },
          JWT_SECRET,
          { expiresIn: "1h" } // Token expires in 1 hour
        );

        // Send response with the JWT token
        res.json({
          message: "Login successful",
          token: token, // Send the token to the client
        });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error("Error in /login route:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (closeError) {
        console.error("Error closing the database connection:", closeError.message);
      }
    }
  }
});

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Store user info in request for further use
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

// Admin Dashboard Route (Only accessible by admin)
app.get("/admin-dashboard", verifyToken, (req, res) => {
  if (req.user.role !== "admin" || req.user.userId !== 1) {
    return res.status(403).json({ message: "No access: You are not authorized" });
  }

  // Allow access for admin users
  res.json({ message: "Welcome to the admin dashboard!", userId: req.user.userId });
});

// Logout Route (Client will clear the token from storage)
app.post("/logout", (req, res) => {
  // Since JWT is stateless and stored on the client-side, we don't need to do anything here.
  res.json({ message: "Logged out successfully" });
});

// Blog Routes
app.post('/api/blogs', async (req, res) => {
  const { TITLE, CONTENT, AUTHOR, IMAGEURL, CATEGORY, READTIME } = req.body;

  if (!TITLE || !CONTENT) {
    return res.status(400).json({ message: "Title and content are required." });
  }

  // Ensure CONTENT is a string (if necessary, depending on the input you expect)
  if (typeof CONTENT !== 'string') {
    return res.status(400).json({ message: "Content must be a string." });
  }

  let connection;
  try {
    connection = await getDBConnection();

    // Insert the blog post without specifying BLOG_DATE as it defaults to SYSDATE
    const result = await connection.execute(
      `INSERT INTO blogs (TITLE, CONTENT, AUTHOR, IMAGEURL, CATEGORY, READTIME)
       VALUES (:TITLE, :CONTENT, :AUTHOR, :IMAGEURL, :CATEGORY, :READTIME)
       RETURNING ID INTO :ID`,
      {
        TITLE,
        CONTENT,  // Insert as a string now that CONTENT is VARCHAR2
        AUTHOR,
        IMAGEURL,
        CATEGORY,
        READTIME,
        ID: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
      },
      { autoCommit: true }
    );

    // Send the blog ID and success message as the response
    res.status(201).json({
      message: "Blog post created successfully",
      blogId: result.outBinds.ID[0]
    });
  } catch (err) {
    console.error("Error inserting blog:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (closeError) {
        console.error("Error closing the database connection:", closeError.message);
      }
    }
  }
});



// DELETE route to delete a blog by ID
app.delete('/api/blogs/:id', async (req, res) => {
  const { id } = req.params; // Get the blog ID from the URL parameter

  let connection;
  try {
    connection = await getDBConnection();

    // Query to delete the blog post by ID
    const result = await connection.execute(
      `DELETE FROM blogs WHERE ID = :id`,
      [id],
      { autoCommit: true }
    );

    // If no rows were affected, the blog ID was not found
    if (result.rowsAffected === 0) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // Return success response
    res.status(200).json({ message: 'Blog post deleted successfully' });
  } catch (err) {
    console.error("Error deleting blog:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (closeError) {
        console.error("Error closing the database connection:", closeError.message);
      }
    }
  }
});



// GET route to fetch all blogs
// Custom function to avoid circular structure in JSON
// Custom function to avoid circular structure in JSON
// Custom function to avoid circular structure in JSON
function removeCircularReferences(obj) {
  const cache = new Set();
  return JSON.parse(
    JSON.stringify(obj, (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (cache.has(value)) {
          return; // Skip circular reference
        }
        cache.add(value);
      }
      return value;
    })
  );
}

// Function to extract only useful fields from Oracle row data
function trimBlogData(blogs) {
  return blogs.map((blog) => {
    return {
      id: blog.ID,             // Ensure only relevant fields are selected
      title: blog.TITLE,
      content: blog.CONTENT,
      author: blog.AUTHOR,
      imageUrl: blog.IMAGEURL,
      category: blog.CATEGORY,
      readTime: blog.READTIME,
      blogDate: blog.BLOG_DATE,
    };
  });
}

// GET route to fetch all blogs
app.get('/api/blogs', async (req, res) => {
  let connection;
  try {
    connection = await getDBConnection();

    // Query to fetch all blogs
    const result = await connection.execute(
      `SELECT ID, TITLE, CONTENT, AUTHOR, IMAGEURL, CATEGORY, READTIME, BLOG_DATE FROM blogs`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT } // Return results as objects
    );

    // If no blogs are found, return an empty array
    if (result.rows.length === 0) {
      return res.json({ message: "No blogs found", blogs: [] });
    }

    // Remove circular references and trim data to only useful fields
    const trimmedBlogs = trimBlogData(removeCircularReferences(result.rows));

    // Return the cleaned up blog data
    res.json({ blogs: trimmedBlogs });
  } catch (err) {
    console.error("Error fetching blogs:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (closeError) {
        console.error("Error closing the database connection:", closeError.message);
      }
    }
  }
});


// GET route to fetch a single blog by ID
// GET route to fetch a single blog by ID


// GET route to fetch a single blog by ID
// GET route to fetch a single blog by ID
app.get('/api/blogs/:id', async (req, res) => {
  const blogId = req.params.id; // Get the blog ID from the route parameter
  let connection;
  try {
    connection = await getDBConnection();

    // Query to fetch the blog by ID
    const result = await connection.execute(
      `SELECT ID, TITLE, CONTENT, AUTHOR, IMAGEURL, CATEGORY, READTIME, BLOG_DATE 
       FROM blogs WHERE ID = :id`,
      [blogId],
      { outFormat: oracledb.OUT_FORMAT_OBJECT } // Return results as objects
    );

    // Check if the blog exists
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Trim the data to only include useful fields
    const trimmedBlog = trimBlogData(removeCircularReferences(result.rows))[0];

    // Return the single blog data
    res.json({ blog: trimmedBlog });
  } catch (err) {
    console.error("Error fetching blog by ID:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (closeError) {
        console.error("Error closing the database connection:", closeError.message);
      }
    }
  }
});



// Start the Express server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
