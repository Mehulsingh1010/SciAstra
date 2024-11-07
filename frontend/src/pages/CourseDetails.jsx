import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { Star, Clock, UserCheck } from 'lucide-react';
import Navbar from "../components/Navbar";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [isContentVisible, setContentVisible] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate hook

  const allCourses = [
    {
      id: '1',
      title: 'Advanced Machine Learning',
      instructor: 'Dr. Jane Smith',
      price: '₹2,499',
      originalPrice: '₹3,999',
      duration: '48 hours',
      level: 'Intermediate',
      rating: 4.8,
      students: 1234,
      description:
        "This course covers advanced topics in machine learning, including deep learning, reinforcement learning, and more. You'll gain hands-on experience with cutting-edge algorithms and real-world applications.",
      image: 'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20221222184908/web-development1.png?height=200&width=300',
      videoPreview: '',
    },
    // More courses...
  ];

  useEffect(() => {
    const foundCourse = allCourses.find((course) => course.id === id);
    setCourse(foundCourse);
  }, [id]);

  if (!course) return <div>Loading...</div>;

  const handleEnroll = () => {
    // Navigate to the payment page with the course ID
    navigate(`/payment/${course.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-2/3">
              <div className="relative pb-16/9">
                <img className='' src={course.image} alt={course.title} />
              </div>
            </div>
            <div className="md:w-1/3 p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
              <p className="text-xl text-gray-600 mb-4">by {course.instructor}</p>
              <div className="flex items-center mb-4">
                <Star className="h-5 w-5 text-yellow-400 mr-1" />
                <span className="text-lg font-semibold text-gray-900 mr-2">{course.rating}</span>
                <span className="text-gray-600">({course.students} students)</span>
              </div>
              <div className="flex items-center mb-4">
                <Clock className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-600">{course.duration}</span>
                <span className="mx-2">•</span>
                <span className="text-gray-600">{course.level}</span>
              </div>
              <div className="mb-6">
                <span className="text-3xl font-bold text-blue-600 mr-2">{course.price}</span>
                <span className="text-xl text-gray-500 line-through">{course.originalPrice}</span>
              </div>
              <button
                onClick={handleEnroll}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 mb-4"
              >
                Enroll Now
              </button>
              <p className="text-sm text-gray-500 text-center">30-Day Money-Back Guarantee</p>
            </div>
          </div>
          <div className="p-6 border-t border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Course Description</h2>
            <p className="text-gray-700 mb-6">{course.description}</p>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">What you'll learn:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>Advanced machine learning algorithms</li>
              <li>Deep learning architectures and applications</li>
              <li>Reinforcement learning techniques</li>
              <li>Real-world case studies and projects</li>
            </ul>
            <div className="flex justify-between items-center">
              <a
                href="#"
                onClick={() => setContentVisible(!isContentVisible)} // Toggle content visibility
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors duration-200"
              >
                View Course Content
              </a>
              <div className="flex items-center">
                <UserCheck className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-600">Lifetime Access</span>
              </div>
            </div>

            {isContentVisible && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Module 1: Introduction to ML</h3>
                <p className="text-gray-700 mb-4">This module will introduce the basic concepts of machine learning.</p>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Module 2: Deep Learning Basics</h3>
                <p className="text-gray-700 mb-4">An in-depth look into neural networks and their applications.</p>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Module 3: Reinforcement Learning</h3>
                <p className="text-gray-700 mb-4">Learn how reinforcement learning is applied in real-world scenarios.</p>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Module 4: Capstone Project</h3>
                <p className="text-gray-700 mb-4">A practical, hands-on project to apply everything you've learned.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseDetails;
