import axios from "axios";
import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

const DeleteProfile = ({ show, handleClose, handleSave }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});

  const handlePasswordChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const url = `http://localhost:5555/deleteUser/${userId}`;
    axios
      .delete(url, { data }, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        console.log("Profile has been deleted.", response.data);
        handleClose();
        handleSave(data);
      })
      .catch((err) => {
        console.log("Here is the error from Delete Profile", err);
        setError(err.response.data.message);
      });

    // handleSave(data);
    // handleClose();
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Enter Credentials to Delete Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          {/* Add your form fields here */}
          <Form.Group controlId="formEmail">
            <Form.Label></Form.Label>
            <Form.Control
              type="test"
              placeholder="Enter Email"
              name="email"
              value={data.email}
              onChange={handlePasswordChange}
            />
            {error && error == "Email not found." && (
              <p className="errorMsg">Email not found.</p>
            )}
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label></Form.Label>
            <Form.Control
              type="password"
              placeholder="enter Password."
              name="password"
              value={data.password}
              onChange={handlePasswordChange}
            />
            {error && error == "Email ID and Password does not match." && (
              <p className="errorMsg">Email ID and Password does not match.</p>
            )}
          </Form.Group>
          <Button variant="primary" type="submit">
            Delete
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
export default DeleteProfile;
