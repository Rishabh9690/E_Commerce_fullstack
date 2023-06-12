import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import profile from "../Registration/logo/profile.jpg";
import "../Registration/registration.css";

const EditProfile = () => {
  const [user, setUser] = useState([]);
  const [error, setError] = useState({});
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getUserInfo = () => {
    const url = `http://localhost:5555/getUser/${userId}`;
    axios
      .get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        console.log("Here is the user...", response.data);
        setUser(response.data.user);
      })
      .catch((error) => {
        console.log("Here is the error...", error);
      });
  };

  useEffect(() => {
    localStorage.removeItem("orderId");
    localStorage.removeItem("AddressId");
    localStorage.removeItem("productId");

    getUserInfo();
  }, []);

  //   console.log("Here is the user name..", user.Name.split(" ")[0]);

  const onSubmitFunction = (data) => {
    console.log("Form", data);
    const url = `http://localhost:5555/updateUser/${userId}`;
    const newData = {
      firstName: data.firstName ? data.firstName : user.Name.split(" ")[0],
      lastName: data.lastName ? data.lastName : user.Name.split(" ")[1],
      email: data.email ? data.email : "", //user.Email,
      phoneNumber: data.phoneNumber ? data.phoneNumber : "", //user.phoneNumber,
    };

    axios
      .put(url, newData, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        console.log("User profile is updated successfully=", response.data);
        window.location.replace("/profile");
      })
      .catch((err) => {
        console.log("error is in Adding-->", err);
        setError(err.response.data);
      });
  };

  return (
    <>
      <div className="row no-gutters">
        <div className="col-md-4 col-12">
          <div className="form_left_side card h-100 border-primary justify-content-center bg-image text-center">
            <img
              className="profile_image"
              src={profile}
              alt="profile_Picture"
            />
            <h3 className="user_data">{user.Name}</h3>
            <h3 className="user_data">{user.Email}</h3>
            <h3 className="user_data">{user.phoneNumber}</h3>
          </div>
        </div>
        <div className="col-md-8 col-12">
          <div className="form_right_side card h-100vh border-primary justify-content-center">
            <h2 className="create_account">Update profile</h2>
            <Form onSubmit={handleSubmit(onSubmitFunction)}>
              <Form.Group className="form_group" controlId="formBasicFirstName">
                <Form.Control
                  type="text"
                  class="form-control"
                  placeholder="Enter First Name"
                  name="firstName"
                  {...register("firstName")}
                />
              </Form.Group>
              <Form.Group className="form_group" controlId="formBasicLastName">
                <Form.Control
                  type="text"
                  class="form-control"
                  placeholder="Enter Last Name"
                  name="lastName"
                  {...register("lastName")}
                />
              </Form.Group>
              <Form.Group className="form_group" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  class="form-control"
                  placeholder="Enter your email ID"
                  name="email"
                  {...register("email")}
                />
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
                <Form.Control
                  type="text"
                  class="form-control"
                  placeholder="Enter your phone Number"
                  name="phoneNumber"
                  {...register("phoneNumber")}
                />
                {error.message &&
                  error.message == "PhoneNumber is already in use." && (
                    <p className="errorMsg">PhoneNumber alreadt exist.</p>
                  )}
                {error.message &&
                  error.message == "Please enter a valid phoneNumber." && (
                    <p className="errorMsg">
                      Please enter a valid phoneNumber.
                    </p>
                  )}
              </Form.Group>
              <Button variant="primary" type="submit" className="btn">
                Update
              </Button>
              <Link to={"/profile"}>
                <Button variant="primary" type="submit" className="btn">
                  Cancel
                </Button>
              </Link>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditProfile;
