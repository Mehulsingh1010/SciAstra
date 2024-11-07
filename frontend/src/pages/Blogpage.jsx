import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/blogs')
      .then((response) => {
        setBlogPosts(response.data.blogs);
        setLoading(false);
      })
      .catch((err) => {
        setError('Error fetching blogs');
        setLoading(false);
      });
  }, []);

  const truncateContent = (content, length = 100) => {
    const strippedContent = content.replace(/<\/?[^>]+(>|$)/g, ""); // Remove HTML tags
    return strippedContent.length > length ? strippedContent.slice(0, length) + '...' : strippedContent;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to the SciAstra Blog</h1>
          <p className="text-xl opacity-90 mb-6">
            Discover the latest insights in technology, programming, and education. Stay ahead with our expert articles.
          </p>
          <Link
            to="#latest-posts"
            className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            Explore Latest Articles
          </Link>
        </div>
        {/* Hero Decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white"></div>
      </div>

      {/* Blog Posts Section */}
      <main id="latest-posts" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-4xl font-semibold text-gray-900 mb-8 text-center">Latest Blog Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.length > 0 ? (
            blogPosts.map((post) => (
              <article key={post.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-48 object-cover transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{post.category}</span>
                    <span className="mx-2">•</span>
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{post.blogDate}</span>
                    <span className="mx-2">•</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                    {post.title}
                  </h2>
                  <p className="text-gray-700 mb-4">
                    {/* Truncate content */}
                    {truncateContent(post.content, 100)}
                  </p>

                  {/* Read More Button */}
                  <Link to={`/post/${post.id}`} className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                    Read More <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <p className="text-center text-gray-600">No blog posts available.</p>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 text-center">
        <p>&copy; 2023 SciAstra Blog. All rights reserved.</p>
      </footer>
    </div>
  );
}
