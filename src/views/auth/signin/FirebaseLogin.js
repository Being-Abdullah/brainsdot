import PropTypes from 'prop-types';
import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useToast } from '@chakra-ui/react';


const backendUrl = process.env.REACT_APP_BACKEND_URL;
// console.log("BACKEND URL : " , backendUrl)

const FirebaseLogin = ({ className, ...rest }) => {
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async (values, { setErrors, setStatus, setSubmitting }) => {
    try {
      const response = await fetch(`${backendUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      });

      console.log(response);
  
      if (!response.ok) {
        
        toast({
          title: 'Login failed',
          description: 'Invalid username or password',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
        //throw new Error('Invalid username or password');
      }
      else{
      toast({
        title: 'Login successful',
        description: 'Redirecting to dashboard...',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      const data = await response.json();
      const { access_token, userId } = data;
      console.log('id',access_token,userId);
  
      // Set cookies using document.cookie
      document.cookie = `accessToken=${access_token}; path=/;`;
      document.cookie = `userId=${userId}; path=/;`;
      
      // Navigate to dashboard after successful login
      navigate('/dashboard');
    }
    } catch (error) {
      toast({
        title: 'Login failed',
        description: 'Something went wrongeee',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setStatus({ success: false });
      setErrors({ submit: error.message || 'Something went wrong' });
      setSubmitting(false);
      
    }
  };
  
  return (
    <React.Fragment>
      
      <Formik
        initialValues={{
          username: 'username',
          password: '******',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().max(255).required('Username is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={handleLogin}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} className={className} {...rest}>
            <div className="form-group mb-3">
              <input
                className="form-control"
                label="Username"
                name="username"
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.username}
              />
              {touched.username && errors.username && <small className="text-danger form-text">{errors.username}</small>}
            </div>
            <div className="form-group mb-4">
              <input
                className="form-control"
                label="Password"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.password}
              />
              {touched.password && errors.password && <small className="text-danger form-text">{errors.password}</small>}
            </div>

            

            <Row>
              <Col mt={2}>
                <Button className="btn-block" color="primary" disabled={isSubmitting} size="large" type="submit" variant="primary">
                  Sign In
                </Button>
              </Col>
            </Row>
          </form>
        )}
      </Formik>

      <hr />
    </React.Fragment>
  );
};

FirebaseLogin.propTypes = {
  className: PropTypes.string
};

export default FirebaseLogin;
