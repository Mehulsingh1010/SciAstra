import { useState, useEffect, useRef } from "react";
import { Search, ShoppingCart, User, LogIn, UserPlus, LogOut, Settings, Layout } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const menuRef = useRef(null);
  const userButtonRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setIsLoggedIn(true);
      setIsAdmin(decodedToken.role === "admin");
    }

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) &&
          userButtonRef.current && !userButtonRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsAdmin(false);
    setShowUserMenu(false);
    setUsername('');
    setPassword('');
    toast.success(" Logged out successfully!");
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        username,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        const decodedToken = JSON.parse(atob(response.data.token.split('.')[1]));
        setIsLoggedIn(true);
        setIsAdmin(decodedToken.role === "admin");
        setShowLogin(false);
        setShowUserMenu(false);
        setError('');
        toast.success("Login successful!");
      }
    } catch (err) {
      setError("Invalid username or password");
      toast.error("Login failed! Please check your credentials.");
    }
  };

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:3000/register", {
        username,
        password,
      });
      setShowRegister(false);
      setShowLogin(true);
      setError('');
      toast.success("Account created successfully!");
    } catch (err) {
      setError("Error registering. Please try again.");
      toast.error("Registration failed! Please try again.");
    }
  };

  const AuthModal = ({ isLogin, onClose }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
              placeholder="Enter your username"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <button
            onClick={isLogin ? handleLogin : handleRegister}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {isLogin ? "Sign In" : "Create Account"}
          </button>

          <button
            onClick={onClose}
            className="w-full py-3 px-4 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
          >
            Cancel
          </button>

          {isLogin ? (
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => {
                  setShowLogin(false);
                  setShowRegister(true);
                }}
                className="text-blue-600 hover:text-blue-700"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => {
                  setShowRegister(false);
                  setShowLogin(true);
                }}
                className="text-blue-600 hover:text-blue-700"
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <header className="bg-white shadow-md sticky top-0 z-10 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <Link to="/">
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                SciAstra
              </h1>
            </Link>
          </div>

          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <input
                type="text"
                className="w-full bg-gray-50 rounded-full pl-10 pr-4 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search courses or instructors"
              />
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <nav className="flex items-center space-x-6">
            <Link to="/allcourse">
              <span className="text-gray-600 hover:text-blue-600 transition-colors duration-200">Courses</span>
            </Link>

            <Link to="/blogpage">
              <span className="text-gray-600 hover:text-blue-600 transition-colors duration-200">Blog</span>
            </Link>

            <button className="p-2 hover:bg-gray-100 rounded-full relative transition-all duration-200">
              <ShoppingCart className="h-6 w-6 text-gray-600" />
            </button>

            <div className="relative">
            <button
  ref={userButtonRef}
  onClick={toggleUserMenu}
  className={`p-2 rounded-full transition-all duration-200 ${isLoggedIn ? 'bg-green-500' : 'bg-white-100'}`}
>
  <User className="h-6 w-6 text-black" />
</button>

              {showUserMenu && (
                <div
                  ref={menuRef}
                  className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg py-2 border border-gray-100"
                >
                  {isLoggedIn ? (
                    <>
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-medium text-gray-800">{username}</p>
                        <p className="text-sm text-gray-500">Logged in as {isAdmin ? 'Admin' : 'User'}</p>
                      </div>
                      {isAdmin && (
                        <Link to="/admin-dashboard">
                          <button className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 gap-3">
                            <Layout className="h-5 w-5" />
                            <span>Admin Dashboard</span>
                          </button>
                        </Link>
                      )}
                      <button className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 gap-3">
                        <Settings className="h-5 w-5" />
                        <span>Settings</span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 gap-3"
                      >
                        <LogOut className="h-5 w-5" />
                        <span>Sign Out</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setShowLogin(true)}
                        className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 gap-3"
                      >
                        <LogIn className="h-5 w-5" />
                        <span>Sign In</span>
                      </button>

                      <button
                        onClick={() => setShowRegister(true)}
                        className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 gap-3"
                      >
                        <UserPlus className="h-5 w-5" />
                        <span>Create Account</span>
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>

      {showLogin && (
        <AuthModal
          isLogin={true}
          onClose={() => {
            setShowLogin(false);
            setError('');
          }}
        />
      )}

      {showRegister && (
        <AuthModal
          isLogin={false}
          onClose={() => {
            setShowRegister(false);
            setError('');
          }}
        />
      )}

      {/* Toast container with no transform */}
      <ToastContainer
  position="top-center"  // This centers the toast
  autoClose={2000}
  
  newestOnTop
  closeOnClick
  pauseOnFocusLoss
  draggable
  pauseOnHover
  toastStyle={{
    top: '80%',
      // Ensures the toast is vertically centered
    fontSize: '16px',
    textAlign: 'center',
  }}
/>
    </header>
  );
};

export default Navbar;
