import axios from "axios";
import React, { useState } from "react";
import { Alert, Button, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const EmptyWishList = ({ show, handleClose }) => {
  return (
    <Alert variant="success">
      <Alert.Heading>Your Cart is Empty</Alert.Heading>
      <p>Add items to it now.</p>
      <hr />
      <Link to={"/"}>
        <Button>Show now</Button>
      </Link>
    </Alert>
  );
};

export default EmptyWishList;
