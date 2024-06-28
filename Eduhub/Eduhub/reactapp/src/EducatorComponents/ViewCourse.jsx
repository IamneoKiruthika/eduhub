import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./EducatorNavbar";
import API_BASE_URL from "../apiConfig";
import "./ViewCourse.css";

const ViewCourse = () => {
  const navigate = useNavigate();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  const [availableCourses, setAvailableCourses] = useState([]);




  const handleDeleteClick = (course) => {
    setCourseToDelete(course);
    setShowDeletePopup(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (courseToDelete) {
        const response = await axios.delete(
          `${API_BASE_URL}/api/course/${courseToDelete}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        if (response.status === 200) {
          fetchAvailableCourses();
        } else {
// navigate('/error');
        }
        closeDeletePopup();
      }
    } catch (error) {
      console.log("error",error);
// navigate('/error');
    }
  };

  const closeDeletePopup = () => {
    setCourseToDelete(null);
    setShowDeletePopup(false);
  };

  const fetchAvailableCourses = async () => {
  try {
    const res = await axios.get(
      `${API_BASE_URL}/api/course`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    console.log("getAllCourses", res.data.data);
    if (res.status === 200) {
      setAvailableCourses(res.data);
    } else {
// navigate('/error');
    }
  } catch (error) {
    console.log("error",error);
// navigate('/error');
  }
};

  useEffect(() => {
    fetchAvailableCourses();
  }, []);


  return (
    <div id="parent">
      <Navbar />
      <div id="courseHomeBody" className={showDeletePopup ? "blur" : ""}>
        <h1>Courses</h1>
   
        <table className="course-table">
          <thead>
            <tr>
              <th>Cover Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>
              Start Date
              </th>
              <th>End Date</th>
              <th>Category</th>
              <th>Level</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {availableCourses.length > 0 ? (
              availableCourses.map((course) => (
                <tr key={course.CourseId}>
                  
              <td><img
                src={course.CoverImage}
                alt="Cover"
                className="cover-image"
              /></td>
                  <td>{course.Title}</td>
                  <td>{course.Description}</td>
                  <td>{new Date(course.CourseStartDate).toLocaleDateString()}</td>
                  <td>{new Date(course.CourseEndDate).toLocaleDateString()}</td>
                  <td>{course.Category}</td>
                  <td>{course.Level}</td>
                  <td>
                    <button
                      id="greenButton"
                      className="viewcoursebutton"
                      onClick={() => navigate("/newcourse/" + course.CourseId)}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(course.CourseId)}
                      id="deleteButton"
                    >
                      Delete
                    </button>
              
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="no-records-cell">
                  Oops! No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
     
      </div>
      {showDeletePopup && (
        <div className="delete-popup">
          <p>Are you sure you want to delete?</p>
          <button onClick={handleConfirmDelete}>Yes, Delete</button>
          <button onClick={closeDeletePopup}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default ViewCourse;
