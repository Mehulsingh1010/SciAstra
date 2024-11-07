import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function BlogDetail() {
  const { id } = useParams();
  const [blogPost, setBlogPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/blogs/${id}`)
      .then((response) => {
        setBlogPost(response.data.blog);
        setLoading(false);
      })
      .catch((err) => {
        setError('There was an error fetching the blog post.');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin border-t-4 border-blue-500 w-16 h-16 rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Blog Post Detail */}
        {blogPost && (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden lg:flex">
            {/* Blog Image */}
            <div className="lg:w-1/3">
              <img
                src={blogPost.imageUrl}
                alt={blogPost.title}
                className="w-full h-72 object-cover lg:h-full lg:w-full"
              />
            </div>

            <div className="lg:w-2/3 p-6">
              {/* Blog Title */}
              <h1 className="text-4xl font-semibold text-gray-900 mb-4">{blogPost.title}</h1>
              <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                <span className="font-medium">{blogPost.author}</span> |{' '}
                <span className="font-medium">{blogPost.category}</span> |{' '}
                <span>{new Date(blogPost.blogDate).toLocaleDateString()}</span>
              </div>

              {/* Blog Content */}
              <div
                className="text-lg text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blogPost.content }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 text-center">
        <p>&copy; 2023 SciAstra Blog. All rights reserved.</p>
      </footer>
    </div>
  );
}
