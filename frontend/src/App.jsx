/* eslint-disable react/prop-types */
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import ELearningCourseStart from "./pages/Elearning2";
import AllCoursesPage from "./pages/Allcourse";
import BlogPage from "./pages/Blogpage";
import Loader from "./components/Loader";
import BlogExtended from "./pages/Blogextended";
import STT from "./hooks/STT";
import CourseDetails from "./pages/CourseDetails";
import DummyPaymentPage from "./pages/DummyPaymentPage";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setIsLoggedIn(true);
      setIsAdmin(decodedToken.role === "admin");
    }
  }, []);

  const PrivateRoute = ({ children }) => {
    if (!isLoggedIn) {
      return <Navigate to="/" />;
    }

    if (!isAdmin) {
      return <Navigate to="/" />;
    }

    return children;
  };

  return (
    <Router>
      <STT />
      <Loader />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/allcourse" element={<AllCoursesPage />} />
        <Route
          path="/eLearning/course/:courseId"
          element={<ELearningCourseStart />}
        />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/payment/:courseId" element={<DummyPaymentPage />} />
        <Route path="/post/:id" element={<BlogExtended />} />
        <Route path="/blogpage" element={<BlogPage />} />
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}
