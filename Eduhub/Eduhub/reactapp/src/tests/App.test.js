import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import store from '../store';
import Login from '../Components/Login';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import Signup from '../Components/Signup';
import ErrorPage from '../Components/ErrorPage';
import HomePage from '../Components/HomePage';
import StudentViewCourse from '../StudentComponents/StudentViewCourse';
import ViewCourse from '../EducatorComponents/ViewCourse';

import CourseForm from '../EducatorComponents/CourseForm';
import StudentNavbar from '../StudentComponents/StudentNavbar';

jest.mock('axios');

// Setup QueryClient
const queryClient = new QueryClient();

describe('Login Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderLoginComponent = (props = {}) => {
    return render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Login {...props} />
          </Router>
        </QueryClientProvider>
      </Provider>
    );
  };

  
  test('frontend_login_component_renders_the_with_login_heading', () => {
    renderLoginComponent();

  
    const loginHeadings = screen.getAllByText(/Login/i);
    expect(loginHeadings.length).toBeGreaterThan(0);

  });


  test('frontend_login_component_displays_validation_messages_when_login_button_is_clicked_with_empty_fields', () => {
    renderLoginComponent();

    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });

   
});
describe('Signup Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderSignupComponent = (props = {}) => {
    return render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Signup {...props} />
          </Router>
        </QueryClientProvider>
      </Provider>
    );
  };
  test('frontend_signup_component_renders_with_signup_heading', () => {
    renderSignupComponent();

    const signupHeadings = screen.getAllByText(/Signup/i);
   expect(signupHeadings.length).toBeGreaterThan(0);

  });

  test('frontend_signup_component_displays_validation_messages_when_submit_button_is_clicked_with_empty_fields', () => {
    renderSignupComponent();

    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    expect(screen.getByText('User Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Mobile Number is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
    expect(screen.getByText('Confirm Password is required')).toBeInTheDocument();
  });

  test('frontend_signup_component_displays_error_when_passwords_do_not_match', () => {
    renderSignupComponent();

    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'password456' } });
    fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

    expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
  });
});
describe('ErrorPage Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const renderErrorComponent = (props = {}) => {
    return render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <ErrorPage {...props} />
          </Router>
        </QueryClientProvider>
      </Provider>
    );
  };
  test('frontend_errorpage_component_renders_with_error_heading', () => {
    renderErrorComponent();
    const headingElement = screen.getByText(/Oops! Something Went Wrong/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('frontend_errorpage_component_renders_with_error_content', () => {
    renderErrorComponent();
    const paragraphElement = screen.getByText(/Please try again later./i);
    expect(paragraphElement).toBeInTheDocument();
  });
});
describe('Home Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const renderHomeComponent = (props = {}) => {
    return render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <HomePage {...props} />
          </Router>
        </QueryClientProvider>
      </Provider>
    );
  };
  test('frontend_home_component_renders_with_heading', () => {
    renderHomeComponent();
    const headingElement = screen.getAllByText(/Edu-Hub/i);
    expect(headingElement.length).toBeGreaterThan(0);

  });
  test('frontend_home_component_renders_with_contact_us', () => {
    renderHomeComponent();
    const headingElement = screen.getAllByText(/Contact Us/i);
    expect(headingElement.length).toBeGreaterThan(0);

  });


});

describe('StudentViewCourse Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderStudentViewCourseComponent = (props = {}) => {
    return render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <StudentViewCourse {...props} />
          </Router>
        </QueryClientProvider>
      </Provider>
    );
  };

  test('frontend_student_view_course_component_renders_with_table', () => {
    renderStudentViewCourseComponent();

    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();
 });
 test('frontend_student_view_course_component_renders_with_logout', () => {
  renderStudentViewCourseComponent();

  const logout = screen.getAllByText('Logout');
  expect(logout.length).toBeGreaterThan(0);
});
  test('frontend_student_view_course_component_renders_with_heading', () => {
    renderStudentViewCourseComponent();
    // Check table data cells
    const heading = screen.getAllByText('Available Courses');
    expect(heading.length).toBeGreaterThan(0); // Check if there are any table data cells rendered
  });
});
describe('StudentNavbar Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderStudentNavbarComponent = (props = {}) => {
    return render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <StudentNavbar {...props} />
          </Router>
        </QueryClientProvider>
      </Provider>
    );
  };

  test('frontend_student_navbar_component_renders_with_home', () => {
    renderStudentNavbarComponent();
    const home = screen.getAllByText('Home');
    expect(home.length).toBeGreaterThan(0);
  });

});

describe('ViewCourse Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderViewCourseComponent = (props = {}) => {
    return render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <ViewCourse {...props} />
          </Router>
        </QueryClientProvider>
      </Provider>
    );
  };

  test('frontend_view_course_component_renders_with_table', () => {
    renderViewCourseComponent();

    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();
 });

 
 test('frontend_view_course_component_renders_with_logout', () => {
  renderViewCourseComponent();

  const logout = screen.getAllByText('Logout');
  expect(logout.length).toBeGreaterThan(0);
});
  test('frontend_view_course_component_renders_with_heading', () => {
    renderViewCourseComponent();
    // Check table data cells
    const heading = screen.getAllByText('Courses');
    expect(heading.length).toBeGreaterThan(0); // Check if there are any table data cells rendered
  });

});

describe('CourseForm Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderCourseFormComponent = (props = {}) => {
    return render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <CourseForm {...props} />
          </Router>
        </QueryClientProvider>
      </Provider>
    );
  };

  test('frontend_course_form_component_displays_error_when_submitting_with_empty_title', () => {
    renderCourseFormComponent();

    fireEvent.click(screen.getByRole('button', { name: /Add Course/i }));

    expect(screen.getByText('Title is required')).toBeInTheDocument();
    expect(screen.getByText('Description is required')).toBeInTheDocument();
    expect(screen.getByText('Course Start Date is required')).toBeInTheDocument();
    expect(screen.getByText('Course End Date is required')).toBeInTheDocument();
    expect(screen.getByText('Category is required')).toBeInTheDocument();
    expect(screen.getByText('Level is required')).toBeInTheDocument();


  });


  test('frontend_course_form_component_renders_with_course', () => {
    renderCourseFormComponent();

    const course = screen.getByText('Create New Course');
    expect(course).toBeInTheDocument();
  });

  test('frontend_course_form_component_renders_with_logout', () => {
    renderCourseFormComponent();
  
    const logout = screen.getAllByText('Logout');
    expect(logout.length).toBeGreaterThan(0);
  });

});
