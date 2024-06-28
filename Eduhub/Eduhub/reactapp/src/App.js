import React from 'react';
import Login from './Components/Login';
import HomePage from './Components/HomePage';
import SignupForm from './Components/Signup';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import PrivateRoute from './Components/PrivateRoute'; // Import the PrivateRoute component
import { Navigate } from 'react-router-dom';
import ErrorPage from './Components/ErrorPage';
import CourseForm from './EducatorComponents/CourseForm';
import ViewCourse from './EducatorComponents/ViewCourse';

import StudentViewCourse from './StudentComponents/StudentViewCourse';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="user">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<SignupForm />} />
        </Route>
        <Route path="/home"  element={  <PrivateRoute>  <HomePage /> </PrivateRoute>}/>   
        <Route path="/viewcourse" element={ <PrivateRoute> <ViewCourse /> </PrivateRoute>}  />
        <Route path="/newcourse/:id?"  element={  <PrivateRoute>  <CourseForm /> </PrivateRoute>}/>  
        <Route path="*" element={<Navigate to="/user/login" replace />} />
        <Route path="/availablecourse"  element={  <PrivateRoute>  <StudentViewCourse /> </PrivateRoute>}/> 
        <Route path="/error"  element={<ErrorPage/> }/>  

     </Routes>
    </BrowserRouter>
  );
}

export default App;
