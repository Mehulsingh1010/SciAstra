/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, ShoppingCart, Star, Clock, TrendingUp, UserCheck, PlayCircle, BookOpen, Sparkles, ChevronRight, User } from 'lucide-react'
import Navbar from '../components/Navbar';

export default function Homepage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const [filteredCourses, setFilteredCourses] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  const handleContinueLearning = (courseId) => {
    navigate(`/eLearning/course/${courseId}`);
  }

  const yourCourses = [
    {
      id: 7,
      title: "Advanced JavaScript Concepts",
      instructor: "Kyle Simpson",
      image: "https://cdn.pixabay.com/photo/2015/04/23/17/41/javascript-736400_1280.png?height=200&width=300",
      progress: 65,
      videosLeft: 8,
      totalVideos: 24
    },
    {
      id: 8,
      title: "iOS 14 & Swift 5 - The Complete iOS App Development",
      instructor: "Dr. Angela Yu",
      image: "https://developer.apple.com/swift/images/swift-og.png?height=200&width=300",
      progress: 40,
      videosLeft: 18,
      totalVideos: 30
    },
    {
      id: 9,
      title: "The Complete JavaScript Course 2023",
      instructor: "Jonas Schmedtmann",
      image: "https://miro.medium.com/v2/resize:fit:1400/1*LyZcwuLWv2FArOumCxobpA.png?height=200&width=300",
      progress: 80,
      videosLeft: 4,
      totalVideos: 20
    }
  ]

  const personalizedCourses = [
    {
      id: 1,
      title: "Python for Data Science and Machine Learning",
      instructor: "Jose Portilla",
      image: "https://cdn.prod.website-files.com/63ccf2f0ea97be12ead278ed/644a18b637053fa3709c5ba2_what-is-data-science.jpg?height=200&width=300",
      price: "₹2,199",
      rating: 4.6,
      duration: "42 hours"
    },
    {
      id: 2,
      title: "React - The Complete Guide",
      instructor: "Maximilian Schwarzmüller",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsuB9QV_N5E3pZEpe3EbPms-_rYO6j1UOEBQ&s?height=200&width=300",
      price: "₹1,999",
      rating: 4.8,
      duration: "48 hours"
    },
    {
      id: 3,
      title: "Advanced CSS and Sass",
      instructor: "Jonas Schmedtmann",
      image: "https://www.w3docs.com/uploads/media/default/0001/05/6d07a36ebe6d55273b39440f2391f1d7e6d4092a.png?height=200&width=300",
      price: "₹1,699",
      rating: 4.7,
      duration: "28 hours"
    }
  ]

  const popularCourses = [
    {
      id: 4,
      title: "Complete Web Development Bootcamp",
      instructor: "Dr. Angela Yu",
      image: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20221222184908/web-development1.png?height=200&width=300",
      price: "₹1,999",
      rating: 4.8,
      students: 125000,
      duration: "48 hours"
    },
    {
      id: 5,
      title: "Machine Learning A-Z",
      instructor: "Kirill Eremenko",
      image: "https://www.fsm.ac.in/blog/wp-content/uploads/2022/08/ml-e1610553826718.jpg?height=200&width=300",
      price: "₹2,499",
      rating: 4.9,
      students: 150000,
      duration: "56 hours"
    },
    {
      id: 6,
      title: "The Complete Digital Marketing Course",
      instructor: "Rob Percival",
      image: "https://www.simplilearn.com/ice9/free_resources_article_thumb/What_is_digital_marketing.jpg?height=200&width=300",
      price: "₹2,299",
      rating: 4.7,
      students: 100000,
      duration: "52 hours"
    }
  ]

  const allCourses = [
    ...yourCourses,
    ...personalizedCourses,
    ...popularCourses
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    const filtered = allCourses.filter(course =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredCourses(filtered)
    setIsSearching(true)
  }

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value)
    if (e.target.value === '') {
      setIsSearching(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
     <Navbar />
      
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to the SciAstra Courses</h1>
          <p className="text-xl opacity-90 mb-6">Discover the latest insights in technology, programming, and education. Stay ahead with our expert Courses.</p>
          <Link to="/allcourse" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            Explore Latest Courses
          </Link>
        </div>
        {/* Hero Decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white"></div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isSearching ? (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
              <Search className="mr-2 text-blue-600" /> Search Results
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="relative">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">By {course.instructor}</p>
                    {'progress' in course ? (
                      <>
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">Progress</span>
                            <span className="text-sm font-medium text-blue-600">{course.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                              style={{width: `${course.progress}%`}}
                            ></div>
                          </div>
                        </div>
                        <button 
                          className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-colors duration-200 shadow-sm hover:shadow-md text-sm font-medium flex items-center justify-center"
                          onClick={() => handleContinueLearning(course.id)}
                        >
                          <PlayCircle className="mr-2" />
                          Continue Learning
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center mb-4">
                          <Star className="h-5 w-5 text-yellow-400 mr-1" />
                          <span className="text-sm font-medium text-gray-900 mr-2">{course.rating}</span>
                          <Clock className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-sm text-gray-500">{course.duration}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">{course.price}</span>
                          <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-colors duration-200 shadow-sm hover:shadow-md text-sm font-medium">
                            Enroll Now
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <>
            {/* Your Courses */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <BookOpen className="mr-2 text-blue-600" /> Your Courses
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {yourCourses.map((course) => (
                  <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="relative">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">By {course.instructor}</p>
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Progress</span>
                          <span className="text-sm font-medium text-blue-600">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                            style={{width: `${course.progress}%`}}
                          ></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-600">{course.videosLeft} videos left</span>
                        <span className="text-sm text-gray-600">{course.totalVideos} total videos</span>
                      </div>
                      <button 
                        className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-colors duration-200 shadow-sm hover:shadow-md text-sm font-medium flex items-center justify-center"
                        onClick={() => handleContinueLearning(course.id)}
                      >
                        
                        <PlayCircle className="mr-2" />
                        Continue Learning
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link to='/allcourse'>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700  bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  View All Courses <ChevronRight className="ml-2 h-4 w-4" />
                </button></Link>
              </div>
            </section>

            {/* Personalized Courses */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <UserCheck className="mr-2 text-green-600" /> Personalized for You
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {personalizedCourses.map((course) => (
                  <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="relative">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
                        Recommended
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">By {course.instructor}</p>
                      <div className="flex items-center mb-4">
                        <Star className="h-5 w-5 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium text-gray-900 mr-2">{course.rating}</span>
                        <Clock className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-500">{course.duration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-500">{course.price}</span>
                        <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full hover:from-green-600 hover:to-teal-600 transition-colors duration-200 shadow-sm hover:shadow-md text-sm font-medium">
                          Enroll Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link to='/allcourse'> 
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  View All Recommendations <ChevronRight className="ml-2 h-4 w-4" />
                </button></Link>
              </div>
            </section>

            {/* Most Popular Courses */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <TrendingUp className="mr-2 text-blue-600" /> Most Popular Courses
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {popularCourses.map((course) => (
                  <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="relative">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-0 left-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-2 py-1 rounded-br-lg">
                        Popular
                      </div>
                    </div>
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
                        <button className="px-4 py-2 bg-gradient-to-r from-blue-600  to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-colors duration-200 shadow-sm hover:shadow-md text-sm font-medium">
                          Enroll Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link to='/allcourse'> 
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                  View All Popular Courses <ChevronRight className="ml-2 h-4 w-4" />
                </button></Link>
              </div>
            </section>
          </>
        )}

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl p-8 text-center shadow-inner">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Boost Your Skills?</h2>
          <p className="text-xl text-gray-700 mb-6">Join thousands of learners and start your journey today!</p>
          <Link to='/allcourse'> 
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg font-semibold text-lg transform hover:scale-105 flex items-center justify-center mx-auto">
            <Sparkles className="mr-2" />
            Explore All Courses
          </button></Link>
        </section>
      </main>
      <section className="bg-gradient-to-r from-blue-600 to-purple-600  py-16 py-16 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Stay Updated with Our Latest Courses</h2>
          <p className="mb-6">Subscribe to our newsletter to get the latest course updates directly in your inbox.</p>
          <form className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0">
            <input
              type="email"
              className="w-full md:w-1/2 px-4 py-2 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Enter your email address"
            />
            <button className="w-full md:w-auto bg-purple-500 hover:bg-purple-600 px-6 py-3 rounded-lg font-semibold transition-transform transform hover:scale-105">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 text-center">
        <p>&copy; 2024 SciAstra Blog. All rights reserved.</p>
      </footer>
    </div>
  )
}