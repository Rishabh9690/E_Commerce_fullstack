import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./registration.css";
import image from "./logo/logo.jpg";

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState({});
  const [bool, setBool] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      window.location.replace("/");
    }
  });

  const onSubmitFunction = (data) => {
    console.log("Form", data);
    const url = "http://localhost:5555/registration";
    axios
      .post(url, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
      })
      .then((response) => {
        console.log("response=======", response.data);
        // alert(response.data.message);
        setBool(true);
        window.location.replace("/signIn");
      })
      .catch((err) => {
        // alert(err.response.data.message);
        setError(err.response.data);
        console.log("here is the error==", err.response.data);
        console.log("here is the error==>", err.response.status);
      });
  };
  return (
    <>
      {/* <Container> To cover the whole page, Ia m removing this container*/}
      <div className="row no-gutters">
        <div className="col-md-4 col-12">
          <div className="form_left_side card h-100 border-primary justify-content-center bg-image text-center">
            {/* card h-100 border-primary justify-content-center  ==> Helps to get the data/text in center ()(Horizontally and vertically)*/}
            {/*bg-image  ==> Helps to give a background image, go to registration.css */}

            {/* <div>
              <img className="logo_image" src={image} alt="logo" />
            </div> */}
            <h1 className="welcome_text">Welcome</h1>
            <p className="welcome_text">
              If you have already registered, then signIn
            </p>
            <Link to={"/SignIn"}>
              <Button className="btn">SignIn</Button>
            </Link>
          </div>
        </div>
        <div className="col-md-8 col-12">
          <div className="form_right_side card h-100vh border-primary justify-content-center">
            <h2 className="create_account">Create Account</h2>
            <Form onSubmit={handleSubmit(onSubmitFunction)}>
              <Form.Group className="form_group" controlId="formBasicFirstName">
                {/* <Form.Label>firstName: </Form.Label> */}
                <Form.Control
                  type="text"
                  class="form-control"
                  placeholder="Enter First Name"
                  name="firstName"
                  {...register("firstName", { required: true })}
                />
                {errors.firstName && errors.firstName.type == "required" && (
                  <p className="errorMsg">FirstName is required.</p>
                )}
              </Form.Group>
              <Form.Group className="form_group" controlId="formBasicLastName">
                {/* <Form.Label>lastName: </Form.Label> */}
                <Form.Control
                  type="text"
                  class="form-control"
                  placeholder="Enter Last Name"
                  name="lastName"
                  {...register("lastName", { required: true })}
                />
                {errors.lastName && errors.lastName.type == "required" && (
                  <p className="errorMsg">LastName is required.</p>
                )}
              </Form.Group>
              <Form.Group className="form_group" controlId="formBasicEmail">
                {/* <Form.Label>Email: </Form.Label> */}
                <Form.Control
                  type="email"
                  class="form-control"
                  placeholder="Enter your email ID"
                  name="email"
                  {...register("email", {
                    required: true,
                  })}
                />
                {errors.message &&
                  errors.email.type == "pattern" &&
                  errors.email.message == "From form" && (
                    <p className="errorMsg">From form</p>
                  )}
                {errors.email && errors.email.type == "required" && (
                  <p className="errorMsg">Email is required.</p>
                )}
                {error.message && error.message == "Email already exist.!" && (
                  <p className="errorMsg">Email already exist.!</p>
                )}
                {error.message &&
                  error.message == "Please enter a valid email address." && (
                    <p className="errorMsg">
                      Please enter a valid email address.
                    </p>
                  )}
              </Form.Group>
              <Form.Group
                className="form_group"
                controlId="formBasicPhoneNumber"
              >
                {/* <Form.Label>phoneNumber: </Form.Label> */}
                <Form.Control
                  type="text"
                  class="form-control"
                  placeholder="Enter your phone Number"
                  name="phoneNumber"
                  {...register("phoneNumber", { required: true })}
                />
                {errors.phoneNumber &&
                  errors.phoneNumber.type == "required" && (
                    <p className="errorMsg">phoneNumber is required.</p>
                  )}
                {error.message &&
                  error.message == "PhoneNumber alreadt exist.!" && (
                    <p className="errorMsg">PhoneNumber alreadt exist.</p>
                  )}
                {error.message &&
                  error.message == "Please enter a valid phoneNumber." && (
                    <p className="errorMsg">
                      Please enter a valid phoneNumber.
                    </p>
                  )}
              </Form.Group>
              <Form.Group className="form_group" controlId="formBasicPassword">
                {/* <Form.Label>Password: </Form.Label> */}
                <Form.Control
                  type="password"
                  class="form-control"
                  placeholder="Enter a password"
                  name="password"
                  {...register("password", { required: true })}
                />
                {errors.password && errors.password.type == "required" && (
                  <p className="errorMsg">password is required.</p>
                )}
                {error.message &&
                  error.message ==
                    "Password must contain 1 Number, 1 special character, 1 lower case character & 1 upper case character with minimum length of 8 and maximum length of 16." && (
                    <p className="errorMsg">
                      Password must contain 1 Number, 1 special character…ith
                      minimum length of 8 and maximum length of 16.
                    </p>
                  )}
              </Form.Group>
              <Button variant="primary" type="submit" className="btn">
                Submit
              </Button>
              {bool ? (
                <>
                  <h5>Registration Successful.</h5>
                </>
              ) : (
                <></>
              )}
            </Form>
          </div>
        </div>
      </div>
      {/* </Container> */}
    </>
  );
};

export default Registration;
