import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./StudentNavbar";
import API_BASE_URL from "../apiConfig";
import "./StudentViewCourse.css";

const StudentViewCourse = () => {
  const navigate = useNavigate();
  const [availableCourses, setAvailableCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [showMaterialPopup, setShowMaterialPopup] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const allCoursesResponse = await axios.get(`${API_BASE_URL}/api/course`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      setAvailableCourses(allCoursesResponse.data);
      console.log("All Courses:", allCoursesResponse.data);
      setFilteredCourses(allCoursesResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      console.log("error", error);
      // navigate('/error');
    }
  };

  const filterCourses = (search) => {
    const searchLower = search.toLowerCase();
    if (searchLower === "") return availableCourses;
    return availableCourses.filter(
      (course) =>
        (course.Title && course.Title.toLowerCase().includes(searchLower)) ||
        (course.Description && course.Description.toLowerCase().includes(searchLower))
    );
  };

  const handleSearchChange = (e) => {
    const inputValue = e.target.value;
    setSearchValue(inputValue);
    setFilteredCourses(filterCourses(inputValue));
  };

  return (
    <div>
      <Navbar />
      <div id="enrollmentHomeBody" className={showMaterialPopup ? 'blur' : ''}>
        <h1>Available Courses</h1>
        <hr />
        <div className="top-container">
          <input
            id="searchBox"
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div>
        <table className="course-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Cover Image</th>
              <th>Course Name</th>
              <th>Course Description</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          {filteredCourses.length ? (
            <tbody>
              {filteredCourses.map((course, index) => (
                <tr key={course.CourseId}>
                  <td>{index + 1}</td>
                  <td><img
                src={course.CoverImage}
                alt="Cover"
                className="cover-image"
              /></td>
                  <td>{course.Title}</td>
                  <td>{course.Description}</td>
                  <td>{new Date(course.CourseStartDate).toLocaleDateString()}</td>
                  <td>{new Date(course.CourseEndDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan="5" className="no-records-cell">
                  Oops! No records Found
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default StudentViewCourse;
