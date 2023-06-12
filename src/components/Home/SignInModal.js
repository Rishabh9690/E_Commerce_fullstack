import axios from "axios";
import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

const SignInInside = ({ show, handleClose, handleSave }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});

  const handleSignIn = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

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
          //   window.location.replace("/");
          handleClose();
          window.location.reload(true);
        }
      })
      .catch((err) => {
        console.log("here is the message==", err.response.data);
        setError(err.response.data.message);
        console.log("here is the status==>", err.response.status);
      });

    // handleSave(data);
    // handleClose();
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Please SignIn</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          {/* Add your form fields here */}
          <Form.Group controlId="formEmail">
            <Form.Label></Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Email"
              name="email"
              value={data.email}
              onChange={handleSignIn}
            />
            {error && error === "Email not found." && (
              <p className="errorMsg">Email not found.</p>
            )}
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label></Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              name="password"
              value={data.password}
              onChange={handleSignIn}
            />
            {error && error === "Incorrect Password." && (
              <p className="errorMsg">Incorrect Password.</p>
            )}
          </Form.Group>
          {/* Add more form fields as needed */}
          <Button variant="primary" type="submit">
            SignIn
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
export default SignInInside;
