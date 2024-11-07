import  { useState, useRef, useEffect } from 'react'
import { ChevronDown, ChevronUp, Play, Pause, RotateCcw, RotateCw, BookOpen, Code, Database, Network, Maximize, Minimize, Volume2, VolumeX, Settings } from 'lucide-react'
import Navbar from '../components/Navbar'

export default function ELearningCourseStart() {
    const [activeTopics, setActiveTopics] = useState([])
    const [isPlaying, setIsPlaying] = useState(false)
    const [playbackRate, setPlaybackRate] = useState(1)
    const [volume, setVolume] = useState(1)
    const [isMuted, setIsMuted] = useState(false)
    const [progress, setProgress] = useState(0)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [currentVideo, setCurrentVideo] = useState(null)
    const [error, setError] = useState(null)
    const [isSpeedMenuOpen, setIsSpeedMenuOpen] = useState(false)
    const videoRef = useRef(null)
    const iframeRef = useRef(null)
    const videoContainerRef = useRef(null)

  const courseContent = {
    title: "Java Programming Masterclass",
    description: "Master Java programming from basics to advanced concepts",
    topics: [
      {
        id: 1,
        title: "Introduction to Java",
        icon: BookOpen,
        videos: [
          { 
            id: 1, 
            title: "History Of Java", 
            duration: "03:51", 
            url: "https://www.youtube.com/watch?v=ioWkx6WRH2I",
            description: "Learn about the origins and evolution of the Java programming language, from its inception to its current status as one of the most popular programming languages in the world."
          },
          { 
            id: 2, 
            title: "Introduction to Java", 
            duration: "05:07", 
            url: "/videos/straight line demo.mp4",
            description: "Get an overview of Java's key features, its architecture, and why it's widely used in enterprise applications and Android development."
          },
          { 
            id: 3, 
            title: "Why Java is a secured programming language?", 
            duration: "06:28", 
            url: "/sample-video.mp4",
            description: "Explore the security features built into Java, including the Security Manager, bytecode verification, and how Java handles memory management to prevent common security vulnerabilities."
          },
          { 
            id: 4, 
            title: "Why is Java platform independent?", 
            duration: "06:20", 
            url: "/sample-video.mp4",
            description: "Understand the concept of 'Write Once, Run Anywhere' and how Java achieves platform independence through its bytecode and Java Virtual Machine (JVM)."
          },
          { 
            id: 5, 
            title: "Getting started with Eclipse IDE", 
            duration: "08:05", 
            url: "/sample-video.mp4",
            description: "Learn how to set up and use Eclipse, one of the most popular Integrated Development Environments (IDEs) for Java programming."
          }
        ]
      },
      {
        id: 2,
        title: "Java Fundamentals",
        icon: Code,
        videos: [
          { 
            id: 6, 
            title: "Understanding Data Types", 
            duration: "04:30", 
            url: "/sample-video.mp4",
            description: "Explore Java's primitive data types and object types, understanding their differences and when to use each."
          },
          { 
            id: 7, 
            title: "Working with Variables", 
            duration: "05:15", 
            url: "/sample-video.mp4",
            description: "Learn how to declare, initialize, and use variables in Java, including best practices for naming and scope."
          },
          { 
            id: 8, 
            title: "Control Flow Statements", 
            duration: "07:20", 
            url: "/sample-video.mp4",
            description: "Master the use of if-else statements, switch cases, loops, and other control flow mechanisms in Java."
          },
          { 
            id: 9, 
            title: "Arrays and Collections", 
            duration: "08:45", 
            url: "/sample-video.mp4",
            description: "Understand how to work with arrays and various collection types in Java, including ArrayList, LinkedList, and HashSet."
          },
          { 
            id: 10, 
            title: "Introduction to Methods", 
            duration: "06:30", 
            url: "/sample-video.mp4",
            description: "Learn how to create and use methods in Java, including method parameters, return types, and method overloading."
          },
          { 
            id: 11, 
            title: "Understanding Strings", 
            duration: "05:55", 
            url: "/sample-video.mp4",
            description: "Dive deep into String manipulation in Java, including common methods, string concatenation, and the StringBuilder class."
          }
        ]
      },
      {
        id: 3,
        title: "Object-Oriented Programming",
        icon: Database,
        videos: [
          { 
            id: 12, 
            title: "Classes and Objects", 
            duration: "06:10", 
            url: "/sample-video.mp4",
            description: "Learn the fundamentals of object-oriented programming by creating and using classes and objects in Java."
          },
          { 
            id: 13, 
            title: "Inheritance and Polymorphism", 
            duration: "07:30", 
            url: "/sample-video.mp4",
            description: "Explore how to use inheritance to create class hierarchies and leverage polymorphism for flexible code design."
          },
          { 
            id: 14, 
            title: "Encapsulation and Abstraction", 
            duration: "05:55", 
            url: "/sample-video.mp4",
            description: "Understand the principles of encapsulation and abstraction, and how to apply them in Java for better code organization."
          },
          { 
            id: 15, 
            title: "Interfaces and Abstract Classes", 
            duration: "08:20", 
            url: "/sample-video.mp4",
            description: "Learn when and how to use interfaces and abstract classes to define contracts and create flexible, extensible code."
          },
          { 
            id: 16, 
            title: "Working with Packages", 
            duration: "04:45", 
            url: "/sample-video.mp4",
            description: "Understand how to organize your Java code using packages, and learn about access modifiers and their impact on visibility."
          },
          { 
            id: 17, 
            title: "Introduction to Design Patterns", 
            duration: "09:15", 
            url: "/sample-video.mp4",
            description: "Get an overview of common design patterns in Java, including Singleton, Factory, and Observer patterns."
          }
        ]
      },
      {
        id: 4,
        title: "Advanced Java Concepts",
        icon: Network,
        videos: [
          { 
            id: 18, 
            title: "Exception Handling", 
            duration: "05:40", 
            url: "/sample-video.mp4",
            description: "Master the art of handling exceptions in Java, including creating custom exceptions and best practices for error management."
          },
          { 
            id: 19, 
            title: "Multithreading", 
            duration: "09:15", 
            url: "/sample-video.mp4",
            description: "Explore concurrent programming in Java, learning how to create and manage threads for efficient, parallel execution."
          },
          { 
            id: 20, 
            title: "Java I/O and NIO", 
            duration: "07:50", 
            url: "/sample-video.mp4",
            description: "Understand how to work with files and streams in Java, including both the traditional I/O and the more modern NIO packages."
          },
          { 
            id: 21, 
            title: "Java 8+ Features", 
            duration: "10:30", 
            url: "/sample-video.mp4",
            description: "Explore modern Java features like lambda expressions, streams, and the Optional class introduced in Java 8 and beyond."
          },
          { 
            id: 22, 
            title: "Introduction to Generics", 
            duration: "06:20", 
            url: "/sample-video.mp4",
            description: "Learn how to use generics in Java to create more flexible and type-safe code, including generic methods and classes."
          },
          { 
            id: 23, 
            title: "Working with Databases using JDBC", 
            duration: "08:40", 
            url: "/sample-video.mp4",
            description: "Understand how to connect to and interact with databases using Java Database Connectivity (JDBC)."
          }
        ]
      }
    ]
  }

  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
  }

  const isYouTubeVideo = (url) => {
    return url.includes('youtube.com') || url.includes('youtu.be')
  }

  const toggleTopic = (topicId) => {
    setActiveTopics(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    )
  }

  const handlePlayPause = () => {
    if (currentVideo && isYouTubeVideo(currentVideo.url)) {
      if (isPlaying) {
        iframeRef.current.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
      } else {
        iframeRef.current.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*')
      }
      setIsPlaying(!isPlaying)
    } else if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleSpeedChange = (speed) => {
    if (currentVideo && isYouTubeVideo(currentVideo.url)) {
      iframeRef.current.contentWindow.postMessage(`{"event":"command","func":"setPlaybackRate","args":[${speed}]}`, '*')
    } else if (videoRef.current) {
      videoRef.current.playbackRate = speed
    }
    setPlaybackRate(speed)
    setIsSpeedMenuOpen(false)
  }

  const handleVolumeChange = (newVolume) => {
    if (videoRef.current) {
      videoRef.current.volume = newVolume
      setVolume(newVolume)
      setIsMuted(newVolume === 0)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume
        setIsMuted(false)
      } else {
        videoRef.current.volume = 0
        setIsMuted(true)
      }
    }
  }

  const handleSeek = (seconds) => {
    if (currentVideo && isYouTubeVideo(currentVideo.url)) {
      iframeRef.current.contentWindow.postMessage(`{"event":"command","func":"seekTo","args":[${seconds}, true]}`, '*')
    } else if (videoRef.current) {
      videoRef.current.currentTime += seconds
    }
  }

  const handleProgressChange = (e) => {
    const newProgress = parseFloat(e.target.value)
    const newTime = (newProgress / 100) * duration
    if (videoRef.current) {
      videoRef.current.currentTime = newTime
    }
    setProgress(newProgress)
    setCurrentTime(newTime)
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoContainerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
  }

  const selectVideo = (video) => {
    setCurrentVideo(video)
    setIsPlaying(false)
    setProgress(0)
    setCurrentTime(0)
    setError(null)
  }

  const handleVideoError = (e) => {
    console.error("Video error:", e)
    setError("There was an error loading the video. Please try again.")
  }

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    const updateProgress = () => {
      if (videoRef.current) {
        const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100
        setProgress(progress)
        setCurrentTime(videoRef.current.currentTime)
      }
    }

    const handleLoadedMetadata = () => {
      if (videoRef.current) {
        setDuration(videoRef.current.duration)
      }
    }

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    const videoElement = videoRef.current
    videoElement?.addEventListener('timeupdate', updateProgress)
    videoElement?.addEventListener('loadedmetadata', handleLoadedMetadata)
    videoElement?.addEventListener('error', handleVideoError)
    document.addEventListener('fullscreenchange', handleFullscreenChange)

    return () => {
      videoElement?.removeEventListener('timeupdate', updateProgress)
      videoElement?.removeEventListener('loadedmetadata', handleLoadedMetadata)
      videoElement?.removeEventListener('error', handleVideoError)
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [currentVideo])

  return (
    <>
    <Navbar/>
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
        
      {/* Sidebar */}
      <div className="w-full lg:w-96 bg-white shadow-lg overflow-y-auto">
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">{courseContent.title}</h2>
          <p className="text-gray-600 mb-6">{courseContent.description}</p>
          {courseContent.topics.map((topic) => (
            <div key={topic.id} className="mb-4 bg-gray-50 rounded-lg shadow">
              <button
                onClick={() => toggleTopic(topic.id)}
                className="flex items-center justify-between w-full p-4 text-left focus:outline-none"
              >
                <div className="flex items-center">
                  <topic.icon className="h-6 w-6 mr-3 text-blue-500" />
                  <span className="font-medium text-gray-700">{topic.title}</span>
                </div>
                {activeTopics.includes(topic.id) ? <ChevronUp className="h-5 w-5 text-blue-500" /> : <ChevronDown className="h-5 w-5 text-blue-500" />}
              </button>
              {activeTopics.includes(topic.id) && (
                <div className="px-4 pb-4 space-y-2">
                  {topic.videos.map((video) => (
                    <button
                      key={video.id}
                      className="flex items-center w-full p-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition duration-150 ease-in-out focus:outline-none"
                      onClick={() => selectVideo(video)}
                    >
                      <Play className="h-4 w-4 mr-2 text-blue-500" />
                      <div className="flex-1 text-left">
                        <p>{video.title}</p>
                        <p className="text-xs text-gray-500">{video.duration}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 lg:overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden" ref={videoContainerRef}>
            <div className="relative">
              {currentVideo && isYouTubeVideo(currentVideo.url) ? (
                <iframe
                  ref={iframeRef}
                  className="w-full aspect-video"
                  src={`https://www.youtube.com/embed/${getYouTubeId(currentVideo.url)}?enablejsapi=1`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={currentVideo.title}
                ></iframe>
              ) : (
                <video
                  ref={videoRef}
                  className="w-full aspect-video"
                  src={currentVideo?.url}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onError={handleVideoError}
                />
              )}
              {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
                  <p>{error}</p>
                </div>
              )}
              {(!currentVideo || !isYouTubeVideo(currentVideo.url)) && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={handleProgressChange}
                    className="w-full mb-4 appearance-none bg-gray-200 h-1 rounded-full outline-none"
                  />
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center space-x-4">
                      <button
                        className="p-2 rounded-full hover:bg-white/20 focus:outline-none"
                        onClick={handlePlayPause}
                      >
                        {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                      </button>
                      <button
                        className="p-2 rounded-full hover:bg-white/20 focus:outline-none"
                        onClick={() => handleSeek(-10)}
                      >
                        <RotateCcw className="h-5 w-5" />
                      </button>
                      <button
                        className="p-2 rounded-full hover:bg-white/20 focus:outline-none"
                        onClick={() => handleSeek(10)}
                      >
                        <RotateCw className="h-5 w-5" />
                      </button>
                      <div className="flex items-center space-x-2">
                        <button
                          className="p-2 rounded-full hover:bg-white/20 focus:outline-none"
                          onClick={toggleMute}
                        >
                          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                        </button>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={isMuted ? 0 : volume}
                          onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                          className="w-24 appearance-none bg-gray-200 h-1 rounded-full outline-none"
                        />
                      </div>
                      <span className="text-sm">
                        {formatTime(currentTime)} / {formatTime(duration)} • {playbackRate}x
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <button
                          className="p-2 rounded-full hover:bg-white/20 focus:outline-none"
                          onClick={() => setIsSpeedMenuOpen(!isSpeedMenuOpen)}
                        >
                          <Settings className="h-5 w-5" />
                        </button>
                        <div className={`absolute right-0 bottom-full mb-2 w-32 bg-white rounded-md shadow-lg transition-all duration-200 ease-in-out ${isSpeedMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                          {[0.5, 1, 1.5, 2].map((speed) => (
                            <button
                              key={speed}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() =>handleSpeedChange(speed)}
                            >
                              {speed}x
                            </button>
                          ))}
                        </div>
                      </div>
                      <button
                        className="p-2 rounded-full hover:bg-white/20 focus:outline-none"
                        onClick={toggleFullscreen}
                      >
                        {isFullscreen ? <Minimize className="h-6 w-6" /> : <Maximize className="h-6 w-6" />}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="mt-6">
            <h1 className="text-3xl font-bold mb-2 text-gray-800">{currentVideo?.title || "Select a video"}</h1>
            <p className="text-gray-600">{currentVideo?.description || "Choose a video from the sidebar to start learning."}</p>
          </div>
        </div>
      </div>
    </div>

    </>
  )
}