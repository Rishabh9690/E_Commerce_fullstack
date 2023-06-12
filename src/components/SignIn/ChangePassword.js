import axios from "axios";
import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

const ChangePasword = ({ show, handleClose, handleSave }) => {
  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({});

  const handlePasswordChange = (event) => {
    setPassword({
      ...password,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Call the handleSave function passed from the parent component

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
        handleSave(password);
      })
      .catch((error) => {
        console.log("Here is the erorr from ChangePassword...", error);
        setError(error.response.data.message);
      });

    //   handleSave(password);// Pass the form values as arguments
    // handleClose(); // Close the modal after saving
    // localStorage.removeItem("email");
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Enter new Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          {/* Add your form fields here */}
          <Form.Group controlId="formNewPassword">
            <Form.Label></Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter New Password"
              name="newPassword"
              value={password.newPassword}
              onChange={handlePasswordChange}
            />
            {error &&
              error ==
                "Password must contain 1 Number, 1 special character, 1 lower case character & 1 upper case character with minimum length of 8 and maximum length of 16." && (
                <p className="errorMsg">
                  Password must contain 1 Number, 1 special character, 1 lower
                  case character & 1 upper case character with minimum length of
                  8 and maximum length of 16.
                </p>
              )}
          </Form.Group>
          <Form.Group controlId="formConfirmPassword">
            <Form.Label></Form.Label>
            <Form.Control
              type="password"
              placeholder="Re-enter to confirm."
              name="confirmPassword"
              value={password.confirmPassword}
              onChange={handlePasswordChange}
            />
            {error &&
              error == "newPassword does not match with confirmPassword" && (
                <p className="errorMsg">
                  newPassword does not match with confirmPassword
                </p>
              )}
          </Form.Group>
          {/* Add more form fields as needed */}
          <Button variant="primary" type="submit">
            Update
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
export default ChangePasword;
