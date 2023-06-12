import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../Registration/registration.css";
import ForgetPassword from "./ForgetPassword";
import VerifyOtp from "./VerifyOtp";
import ChangePasword from "./ChangePassword";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState({});

  const [showModalFP, setShowModalFP] = useState(false);
  const [showModalVO, setShowModalVO] = useState(false);
  const [showModalCP, setShowModalCP] = useState(false);
  const handleCloseFP = () => {
    setShowModalFP(false);
  };
  const handleOpenFP = () => {
    setShowModalFP(true);
  };
  const handleCloseVO = () => {
    setShowModalVO(false);
  };
  const handleOpenVO = () => {
    console.log("Setting ShowModalVO as true", showModalVO);
    setShowModalVO(true);
  };
  const handleCloseCP = () => {
    setShowModalCP(false);
  };
  const handleOpenCP = () => {
    setShowModalCP(true);
  };

  // const handleForgetPasswordSave = (email) => {
  //   console.log("Here is the email....1", email);
  //   const url = `http://localhost:5555/forgetPassword`;
  //   axios
  //     .post(url, { email: email })
  //     .then((response) => {
  //       console.log(
  //         "Here is the response from the email.... forget Password",
  //         response.data
  //       );
  //       localStorage.setItem("email", email);
  //       handleOpenVO();
  //     })
  //     .catch((err) => {
  //       console.log("Here is the error from forget Password..", err);
  //       if (err.response.data.message === "Email not found.") {
  //         return <p className="errorMsg">Email not found!</p>;
  //       }
  //     });
  // };

  // const handleOtpSave = (otp) => {
  //   console.log("Here is the otp....1", otp);
  //   const email = localStorage.getItem("email");
  //   const url = `http://localhost:5555/verifyOtp`;
  //   const data = {
  //     email: email,
  //     otp: otp,
  //   };
  //   console.log("This is the body for verify otp...", data);
  //   axios
  //     .delete(url, { data })
  //     .then((response) => {
  //       console.log("Here is the response from Verify OTP..", response.data);
  //     })
  //     .catch((err) => {
  //       console.log("Here is the error from forget Password..", err);
  //       // if (err.response.data === "Wrong Otp.") {
  //       // setError("Wrong Otp.");
  //       handleCloseCP();
  //       // }
  //     });
  // };

  const handleChangePasswordSave = (password) => {
    if (password) {
      handleCloseCP();
      localStorage.removeItem("email");
    }
    /*
    console.log("Password from change password..", password);
    const email = localStorage.getItem("email");
    const data = {
      email: email,
      newPassword: password.newPassword,
      confirmPassword: password.confirmPassword,
    };

    console.log("Here is the data from changePassword=======", data);
    const url = `http://localhost:5555/newPassword`;
    axios
      .put(url, {
        email: email,
        newPassword: password.newPassword,
        confirmPassword: password.confirmPassword,
      })
      .then((response) => {
        console.log("Password Updated Successfully.", response.data);
      })
      .catch((error) => {
        console.log("Here is the erorr from ChangePassword...", error);
      });
      */
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      window.location.replace("/");
    }
  });
  localStorage.removeItem("productId");

  const onSubmitFunction = (data) => {
    const url = "http://localhost:5555/signIn";
    axios
      .post(url, {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        console.log("response=======", response.data);
        if (response.data.token.length > 0) {
          localStorage.setItem("userId", response.data.userId);
          localStorage.setItem("token", response.data.token);
          window.location.replace("/");
        }
      })
      .catch((err) => {
        // alert(err.response.data.message);
        setError(err.response.data);
        console.log("here is the message==", err.response.data);
        console.log("here is the status==>", err.response.status);
      });
  };
  return (
    <>
      {/* <Container> */}
      <div className="row no-gutters">
        <div className="col-md-4 col-12">
          <div className="form_left_side card h-100 border-primary justify-content-center bg-image text-center">
            {/* card h-100 border-primary justify-content-center  ==> Helps to get the data/text in center ()(Horizontally and vertically)*/}
            {/*bg-image  ==> Helps to give a background image, go to registration.css */}
            <h1 className="welcome_text">Welcome</h1>
            <p className="welcome_text">New here? Create Account.</p>
            <Link to={"/Registration"}>
              <Button className="btn">register</Button>
            </Link>
          </div>
        </div>
        <div className="col-md-8 col-12">
          <div className="form_right_side card h-100vh border-primary justify-content-center">
            <h2 className="create_account">Please SignIn</h2>
            <Form onSubmit={handleSubmit(onSubmitFunction)}>
              <Form.Group className="form_group" controlId="formBasicEmail">
                {/* <Form.Label>Email: </Form.Label> */}
                <Form.Control
                  type="email"
                  class="form-control"
                  placeholder="Enter your email ID"
                  name="email"
                  {...register("email", { required: true })}
                />
                {errors.email && errors.email.type == "required" && (
                  <p className="errorMsg">Email is required.</p>
                )}
                {error.message && error.message == "Email not found." && (
                  <p className="errorMsg">Email not found!</p>
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
                  <p className="errorMsg">Password is required.</p>
                )}
                {error.message && error.message == "Incorrect Password." && (
                  <p className="errorMsg">Incorrect Password.</p>
                )}
              </Form.Group>
              <Button variant="primary" className="btn" onClick={handleOpenFP}>
                ForgetPassword
              </Button>
              <ForgetPassword
                show={showModalFP}
                handleClose={handleCloseFP}
                // handleSave={handleForgetPasswordSave}
                handleOtp={handleOpenVO}
              />
              <VerifyOtp
                show={showModalVO}
                handleClose={handleCloseVO}
                // handleSave={handleOtpSave}
                handleChangePassword={handleOpenCP}
              />
              <ChangePasword
                show={showModalCP}
                handleClose={handleCloseCP}
                handleSave={handleChangePasswordSave}
              />
              <Button variant="primary" type="submit" className="btn">
                Login
              </Button>
            </Form>
          </div>
        </div>
      </div>
      {/* </Container> */}
    </>
  );
};

export default SignIn;
