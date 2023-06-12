import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Order from "./Order";

const OrderDone = ({ show, handleClose }) => {
  const handleFormSubmit = (event) => {
    event.preventDefault();
    window.location.replace("/orderHistory");
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          {/* Add your form fields here */}
          <Form.Group controlId="formEmail">
            <Form.Label>Order Placed</Form.Label>
          </Form.Group>
          <Button variant="primary" type="submit">
            OrderHistory
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
export default OrderDone;
