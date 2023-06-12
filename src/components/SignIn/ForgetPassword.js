import axios from "axios";
import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

const ForgetPassword = ({ show, handleClose, /*handleSave,*/ handleOtp }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState({});

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("Email from ForgetPassword Modal...", email);

    console.log("Here is the email....1", email);
    const url = `http://localhost:5555/forgetPassword`;
    axios
      .post(url, { email: email })
      .then((response) => {
        console.log(
          "Here is the response from the email.... forget Password",
          response.data
        );
        localStorage.setItem("email", email);
        handleClose();
        handleOtp();
      })
      .catch((err) => {
        console.log("Here is the error from forget Password..", err);
        setError(err.response.data.message);
      });

    /*
    // Call the handleSave function passed from the parent component
    handleSave(email); // Pass the form values as arguments
    handleClose(); // Close the modal after saving
    console.log("here inside the forgetpassword..");
    // handleOtp();
    */
  };

  //   console.log("Error====>", error);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Forget Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          {/* Add your form fields here */}
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your Email"
              value={email}
              onChange={handleEmailChange}
            />
            {error && error == "Email not found." && (
              <p className="errorMsg">Email not found!</p>
            )}
          </Form.Group>
          {/* Add more form fields as needed */}
          <Button variant="primary" type="submit">
            Verify
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ForgetPassword;
