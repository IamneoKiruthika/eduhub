import React, { useEffect, useState } from 'react';
import './HomePage.css'; // Import your custom styles
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import StudentNavbar from '../StudentComponents/StudentNavbar';
import EducatorNavbar from '../EducatorComponents/EducatorNavbar';


const HomePage = () => {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    setUserRole(role);
  }, []);
  
  return (
    <div className="wrapper">
      {userRole === 'Educator' ? <EducatorNavbar /> : <StudentNavbar />}
      <div className="coverimage">
        <LazyLoadImage
          effect="blurr"
          src={process.env.PUBLIC_URL + '/eduhubcoverimage.jpg'} 
          alt="Cover" 
        />
        <div className="title">Edu-Hub</div>
      </div>

      <div className="content">
          <p>Your journey to knowledge begins with us. Our platform offers a seamless enrollment process, competitive course rates, and quick approval. Start your enrollment today and get one step closer to enhancing your knowledge.</p>
        </div>

      <div className="contact">
        <h2>Contact Us</h2>
        <p>Email: example@example.com</p>
        <p>Phone: 123-456-7890</p>
      </div>
    </div>
  );
};

export default HomePage;