import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, UserCheck, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "../components/Navbar";

export default function AllCoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 9;

  const allCourses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      instructor: "Dr. Angela Yu",
      image:
        "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20221222184908/web-development1.png?height=200&width=300",
      price: "₹1,999",
      originalPrice: "₹3,499",
      rating: 4.8,
      students: 125000,
      duration: "48 hours",
      level: "Beginner",
      description:
        "This comprehensive bootcamp covers everything from HTML, CSS, JavaScript, to advanced topics like React and Node.js.",
      videoPreview: "https://www.example.com/course-preview.mp4", // Dummy video link for preview
    },
    {
      id: 2,
      title: "Machine Learning A-Z",
      instructor: "Kirill Eremenko",
      image:
        "https://www.fsm.ac.in/blog/wp-content/uploads/2022/08/ml-e1610553826718.jpg?height=200&width=300",
      price: "₹2,499",
      originalPrice: "₹4,299",
      rating: 4.9,
      students: 150000,
      duration: "56 hours",
      level: "Intermediate",
      description:
        "This course covers all aspects of machine learning, from the basics to advanced techniques like neural networks and deep learning.",
      videoPreview: "https://www.example.com/course-preview.mp4", // Dummy video link for preview
    },
    {
      id: 3,
      title: "The Complete Digital Marketing Course",
      instructor: "Rob Percival",
      image:
        "https://www.simplilearn.com/ice9/free_resources_article_thumb/What_is_digital_marketing.jpg?height=200&width=300",
      price: "₹2,299",
      originalPrice: "₹3,999",
      rating: 4.7,
      students: 100000,
      duration: "52 hours",
      level: "Beginner",
      description:
        "A complete guide to digital marketing that covers SEO, social media marketing, and paid advertising strategies.",
      videoPreview: "https://www.example.com/course-preview.mp4", // Dummy video link for preview
    },
    {
      id: 4,
      title: "Python for Data Science and Machine Learning",
      instructor: "Jose Portilla",
      image:
        "https://cdn.prod.website-files.com/63ccf2f0ea97be12ead278ed/644a18b637053fa3709c5ba2_what-is-data-science.jpg?height=200&width=300",
      price: "₹2,199",
      originalPrice: "₹3,299",
      rating: 4.6,
      students: 95000,
      duration: "42 hours",
      level: "Intermediate",
      description:
        "Learn Python and apply it to real-world data science and machine learning projects with hands-on examples.",
      videoPreview: "https://www.example.com/course-preview.mp4", // Dummy video link for preview
    },
    {
      id: 5,
      title: "React - The Complete Guide",
      instructor: "Maximilian Schwarzmüller",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsuB9QV_N5E3pZEpe3EbPms-_rYO6j1UOEBQ&s?height=200&width=300",
      price: "₹1,999",
      originalPrice: "₹2,999",
      rating: 4.8,
      students: 110000,
      duration: "48 hours",
      level: "Intermediate",
      description:
        "Master React with this comprehensive course that covers everything from state management to advanced React concepts.",
      videoPreview: "https://www.example.com/course-preview.mp4", // Dummy video link for preview
    },
    {
      id: 6,
      title: "Advanced CSS and Sass",
      instructor: "Jonas Schmedtmann",
      image:
        "https://www.w3docs.com/uploads/media/default/0001/05/6d07a36ebe6d55273b39440f2391f1d7e6d4092a.png?height=200&width=300",
      price: "₹1,699",
      originalPrice: "₹2,599",
      rating: 4.7,
      students: 85000,
      duration: "28 hours",
      level: "Intermediate",
      description:
        "Enhance your CSS skills and learn Sass to create responsive, modern websites and applications.",
      videoPreview: "https://www.example.com/course-preview.mp4", // Dummy video link for preview
    },
    {
      id: 7,
      title: "The Complete JavaScript Course 2023",
      instructor: "Jonas Schmedtmann",
      image:
        "https://miro.medium.com/v2/resize:fit:1400/1*LyZcwuLWv2FArOumCxobpA.png?height=200&width=300",
      price: "₹1,999",
      originalPrice: "₹3,299",
      rating: 4.8,
      students: 120000,
      duration: "69 hours",
      level: "Intermediate",
      description:
        "Dive deep into JavaScript and learn modern ES6+ features and tools for creating dynamic web applications.",
      videoPreview: "https://www.example.com/course-preview.mp4", // Dummy video link for preview
    },
    {
      id: 8,
      title: "iOS 14 & Swift 5 - The Complete iOS App Development",
      instructor: "Dr. Angela Yu",
      image:
        "https://developer.apple.com/swift/images/swift-og.png?height=200&width=300",
      price: "₹2,999",
      originalPrice: "₹4,499",
      rating: 4.8,
      students: 90000,
      duration: "55 hours",
      level: "Intermediate",
      description:
        "Learn iOS app development with Swift 5 and build stunning applications for iPhone and iPad.",
      videoPreview: "https://www.example.com/course-preview.mp4", // Dummy video link for preview
    },
    {
      id: 9,
      title: "The Complete 2023 Web Development Bootcamp",
      instructor: "Dr. Angela Yu",
      image:
        "https://cdn.pixabay.com/photo/2016/12/28/09/36/web-1935737_1280.png?height=200&width=300",
      price: "₹2,199",
      originalPrice: "₹3,299",
      rating: 4.7,
      students: 135000,
      duration: "65 hours",
      level: "Beginner",
      description:
        "A beginner's guide to web development that covers HTML, CSS, JavaScript, and building full-stack web applications.",
      videoPreview: "https://www.example.com/course-preview.mp4", // Dummy video link for preview
    },
    {
      id: 10,
      title: "Advanced React and Redux",
      instructor: "Stephen Grider",
      image:
        "https://cdn.pixabay.com/photo/2017/03/30/17/41/javascript-2189147_1280.png?height=200&width=300",
      price: "₹2,099",
      originalPrice: "₹3,299",
      rating: 4.6,
      students: 70000,
      duration: "21 hours",
      level: "Advanced",
      description:
        "Master advanced React and Redux concepts for building fast and efficient web applications.",
      videoPreview: "https://www.example.com/course-preview.mp4", // Dummy video link for preview
    },
    {
      id: 11,
      title: "Docker and Kubernetes: The Complete Guide",
      instructor: "Stephen Grider",
      image:
        "https://cdn.pixabay.com/photo/2017/01/29/13/21/mobile-devices-2017980_1280.png?height=200&width=300",
      price: "₹2,399",
      originalPrice: "₹3,999",
      rating: 4.7,
      students: 65000,
      duration: "22 hours",
      level: "Advanced",
      description:
        "Learn Docker and Kubernetes for deploying and managing containerized applications.",
      videoPreview: "https://www.example.com/course-preview.mp4", // Dummy video link for preview
    },
    {
      id: 12,
      title: "The Complete Node.js Developer Course",
      instructor: "Andrew Mead",
      image:
        "https://cdn.pixabay.com/photo/2015/04/23/17/41/node-js-736399_1280.png?height=200&width=300",
      price: "₹1,899",
      originalPrice: "₹2,999",
      rating: 4.7,
      students: 85000,
      duration: "35 hours",
      level: "Intermediate",
      description:
        "Learn Node.js and build scalable backend applications with Express and MongoDB.",
      videoPreview: "https://www.example.com/course-preview.mp4", // Dummy video link for preview
    },
  ];
  

  const filteredCourses = allCourses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">All Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentCourses.map((course) => (
            <div key={course.id} className="bg-white  hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-xl shadow-lg overflow-hidden">
              <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-4">By {course.instructor}</p>
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-yellow-400 mr-1" />
                  <span className="text-sm font-medium text-gray-900 mr-2">{course.rating}</span>
                  <UserCheck className="h-4 w-4 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-500">{course.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center mb-4">
                  <Clock className="h-4 w-4 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-500">{course.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">{course.price}</span>
                  <Link to={`/course/${course.id}`} className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-colors duration-200 shadow-sm hover:shadow-md text-sm font-medium">Enroll Now</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
