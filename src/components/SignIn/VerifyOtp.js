import axios from "axios";
import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

const VerifyOtp = ({ show, handleClose, handleSave, handleChangePassword }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState({});

  const handleVerifyOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    console.log("Here is the otp....1", otp);
    const email = localStorage.getItem("email");
    const url = `http://localhost:5555/verifyOtp`;
    const data = {
      email: email,
      otp: otp,
    };
    console.log("This is the body for verify otp...", data);
    axios
      .delete(url, { data })
      .then((response) => {
        console.log("Here is the response from Verify OTP..", response.data);
        handleClose();
        handleChangePassword();
      })
      .catch((err) => {
        console.log("Here is the error from forget Password..", err);
        setError(err.response.data.message);
      });

    /*
    // Call the handleSave function passed from the parent component
    handleSave(otp); // Pass the form values as arguments
    handleClose(); // Close the modal after saving
    handleChangePassword();
    */
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>An Otp has been sent to you.</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          {/* Add your form fields here */}
          <Form.Group controlId="formOtp">
            <Form.Label>Verify Otp</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the OTP"
              value={otp}
              onChange={handleVerifyOtpChange}
            />
            {error && error == "Wrong Otp." && (
              <p className="errorMsg">Wrong Otp.</p>
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
export default VerifyOtp;
