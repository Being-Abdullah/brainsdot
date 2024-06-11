import PropTypes from 'prop-types';
import React from 'react';
import { Row, Col, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';

const FirebaseLogin = ({ className, ...rest }) => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Formik
        initialValues={{
          email: 'example@gmail.com',
          password: '******',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            // Check credentials
            if (values.email === 'usman@gmail.com' && values.password === '123') {
              navigate('/app/dashboard/default');
            } else {
              setStatus({ success: false });
              setErrors({ submit: 'Invalid email or password' });
              setSubmitting(false);
            }
          } catch (error) {
            setStatus({ success: false });
            setErrors({ submit: 'Something went wrong' });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} className={className} {...rest}>
            <div className="form-group mb-3">
              <input
                className="form-control"
                label="Email Address / Username"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                type="email"
                value={values.email}
              />
              {touched.email && errors.email && <small className="text-danger form-text">{errors.email}</small>}
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

            {errors.submit && (
              <Col sm={12}>
                <Alert variant="danger">{errors.submit}</Alert>
              </Col>
            )}

            <Row>
              <Col mt={2}>
                <Button className="btn-block" color="primary" disabled={isSubmitting} size="large" type="submit" variant="primary">
                  Signin
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
