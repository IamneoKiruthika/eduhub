import React, { useState, useEffect } from 'react';
import './CourseForm.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from './EducatorNavbar';
import API_BASE_URL from '../apiConfig';

const CourseForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    Title: '',
    Description: '',
    CourseStartDate: '',
    CourseEndDate: '',
    Category: '',
    Level: '',
    CoverImage: ''
  });

  const [errors, setErrors] = useState({
    Title: '',
    Description: '',
    CourseStartDate: '',
    CourseEndDate: '',
    Category: '',
    Level: '',
    CoverImage: ''
  });

  const [successPopup, setSuccessPopup] = useState(false);
  const [filePreview, setFilePreview] = useState(null);

  useEffect(() => {
    if (id) {
      fetchCourse(id);
    }
  }, [id]);

  const fetchCourse = async (id) => {
    try {
      const response = await axios.get(API_BASE_URL + `/api/course/${id}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });

      console.log('Course:', response);

      if (response.status === 200) {
        const CourseStartDate = new Date(response.data.CourseStartDate).toISOString().split('T')[0];
        const CourseEndDate = new Date(response.data.CourseEndDate).toISOString().split('T')[0];

        setFormData({
          Title: response.data.Title,
          Description: response.data.Description,
          CourseStartDate,
          CourseEndDate,
          Category: response.data.Category,
          Level: response.data.Level,
          CoverImage: response.data.CoverImage
        });
        setFilePreview(response.data.CoverImage);
      }
    } catch (error) {
      console.log("error", error);
      // navigate('/error');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleFileChange = async (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const base64String = await convertFileToBase64(file);
  //     setFilePreview(base64String);
  //     setFormData({ ...formData, CoverImage: base64String });
  //   }
  // };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setFilePreview(URL.createObjectURL(file));
        setFormData({ ...formData, CoverImage: file });
    }
};


  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddCourse = async () => {
    const fieldErrors = {};

    if (!formData.Title) {
      fieldErrors.Title = 'Title is required';
    }

    if (!formData.Description) {
      fieldErrors.Description = 'Description is required';
    }

    if (!formData.CourseStartDate) {
      fieldErrors.CourseStartDate = 'Course Start Date is required';
    }

    if (!formData.CourseEndDate) {
      fieldErrors.CourseEndDate = 'Course End Date is required';
    }

    if (!formData.Category) {
      fieldErrors.Category = 'Category is required';
    }

    if (!formData.Level) {
      fieldErrors.Level = 'Level is required';
    }

    if (!formData.CoverImage) {
      fieldErrors.CoverImage = 'Cover Image is required';
    }

    if (Object.values(fieldErrors).some((error) => error)) {
      setErrors(fieldErrors);
      return;
    }

    try {
      const formDataToSend = new FormData();
        formDataToSend.append('Title', formData.Title);
        formDataToSend.append('Description', formData.Description);
        formDataToSend.append('CourseStartDate', formData.CourseStartDate);
        formDataToSend.append('CourseEndDate', formData.CourseEndDate);
        formDataToSend.append('Category', formData.Category);
        formDataToSend.append('Level', formData.Level);
        formDataToSend.append('CoverImageFile', formData.CoverImageFile); // Ensure 'CoverImageFile' matches backend model

      const requestObject = {
        Title: formData.Title,
        Description: formData.Description,
        CourseStartDate: formData.CourseStartDate,
        CourseEndDate: formData.CourseEndDate,
        Category: formData.Category,
        Level: formData.Level,
        CoverImage: formData.CoverImage
      };

      const config = {
              headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: localStorage.getItem('token'),
              },
          };

      console.log(requestObject);

      const response = id
            ? await axios.put(API_BASE_URL + `/api/course/${id}`, requestObject, config)
            : await axios.post(API_BASE_URL + '/api/course', requestObject, config);


      // const response = id
      //   ? await axios.put(API_BASE_URL + `/api/course/${id}`, requestObject, {
      //       headers: { Authorization: localStorage.getItem('token') },
      //     })
      //   : await axios.post(API_BASE_URL + '/api/course', requestObject, {
      //       headers: { Authorization: localStorage.getItem('token') },
      //     });

      console.log('Response add or update:', response);

      if (response.status === 200) {
        setSuccessPopup(true);
      }
    } catch (error) {
      console.log("error", error);
      // navigate('/error');
    }
  };

//   const handleAddCourse = async () => {
//     const fieldErrors = {};

//     if (!formData.Title) {
//         fieldErrors.Title = 'Title is required';
//     }

//     if (!formData.Description) {
//         fieldErrors.Description = 'Description is required';
//     }

//     if (!formData.CourseStartDate) {
//         fieldErrors.CourseStartDate = 'Course Start Date is required';
//     }

//     if (!formData.CourseEndDate) {
//         fieldErrors.CourseEndDate = 'Course End Date is required';
//     }

//     if (!formData.Category) {
//         fieldErrors.Category = 'Category is required';
//     }

//     if (!formData.Level) {
//         fieldErrors.Level = 'Level is required';
//     }

//     if (!formData.CoverImageFile) {
//         fieldErrors.CoverImageFile = 'Cover Image is required';
//     }

//     if (Object.values(fieldErrors).some((error) => error)) {
//         setErrors(fieldErrors);
//         return;
//     }

//     try {
//         const formDataToSend = new FormData();
//         formDataToSend.append('Title', formData.Title);
//         formDataToSend.append('Description', formData.Description);
//         formDataToSend.append('CourseStartDate', formData.CourseStartDate);
//         formDataToSend.append('CourseEndDate', formData.CourseEndDate);
//         formDataToSend.append('Category', formData.Category);
//         formDataToSend.append('Level', formData.Level);
//         formDataToSend.append('CoverImageFile', formData.CoverImageFile); // Ensure 'CoverImageFile' matches backend model

//         const config = {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//                 Authorization: localStorage.getItem('token'),
//             },
//         };

//         const response = id
//             ? await axios.put(API_BASE_URL + `/api/course/${id}`, formDataToSend, config)
//             : await axios.post(API_BASE_URL + '/api/course', formDataToSend, config);

//         console.log('Response add or update:', response);

//         if (response.status === 200) {
//             setSuccessPopup(true);
//         }
//     } catch (error) {
//         console.log('error', error);
//         // navigate('/error');
//     }
// };


  const handleSuccessMessage = () => {
    setSuccessPopup(false);
    navigate('/viewcourse');
  };

  return (
    <div>
      <Navbar />
      <div className={`course-form-container ${successPopup ? 'blur' : ''}`}>
        {id && (
          <>
            <button
              type="button"
              className="back-button"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
            <h2 className='Editheading'>Edit Course</h2>
          </>
        )}
        {!id && <h2>Create New Course</h2>}
        <div>
          <div className="form-group">
            <label htmlFor="Title">
              Title <span className="required-asterisk">*</span>
            </label>
            <input
              type="text"
              name="Title"
              value={formData.Title}
              placeholder="Title"
              onChange={handleChange}
            />
            {errors.Title && <div className="error">{errors.Title}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="Description">
              Description <span className="required-asterisk">*</span>
            </label>
            <input
              type="text"
              name="Description"
              value={formData.Description}
              placeholder="Description"
              onChange={handleChange}
            />
            {errors.Description && <div className="error">{errors.Description}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="CourseStartDate">
              Course Start Date <span className="required-asterisk">*</span>
            </label>
            <input
              type="date"
              name="CourseStartDate"
              value={formData.CourseStartDate}
              placeholder="Course Start Date"
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
            />
            {errors.CourseStartDate && <div className="error">{errors.CourseStartDate}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="CourseEndDate">
              Course End Date <span className="required-asterisk">*</span>
            </label>
            <input
              type="date"
              name="CourseEndDate"
              value={formData.CourseEndDate}
              placeholder="Course End Date"
              onChange={handleChange}
              min={formData.CourseStartDate}
            />
            {errors.CourseEndDate && <div className="error">{errors.CourseEndDate}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="Category">
              Category <span className="required-asterisk">*</span>
            </label>
            <input
              type="text"
              name="Category"
              value={formData.Category}
              placeholder="Category"
              onChange={handleChange}
            />
            {errors.Category && <div className="error">{errors.Category}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="Level">
              Level <span className="required-asterisk">*</span>
            </label>
            <select
              name="Level"
              value={formData.Level}
              onChange={handleChange}
            >
              <option value="">Select Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            {errors.Level && <div className="error">{errors.Level}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="CoverImage">
              Cover Image <span className="required-asterisk">*</span>
            </label>
            <input
              type="file"
              name="CoverImage"
              onChange={handleFileChange}
              accept=".jpg, .jpeg, .png, .pdf" // Specify the allowed file types
            />
            {errors.CoverImage && <div className="error">{errors.CoverImage}</div>}
            {filePreview && <img src={filePreview} alt="Cover Preview" className="cover-preview" />}
          </div>
          <button className='coursebutton' type="button" onClick={handleAddCourse}>
            {id ? 'Update Course' : 'Add Course'}
          </button>
        </div>
      </div>
      {successPopup && (
        <>
          <div className="overlay"></div>
          <div className="modalpopup">
            <p>{id ? 'Updated Successfully!' : 'Successfully Added!'}</p>
            <button onClick={handleSuccessMessage}>Ok</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CourseForm;
