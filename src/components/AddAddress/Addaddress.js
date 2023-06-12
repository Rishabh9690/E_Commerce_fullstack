import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../Registration/registration.css";
import profile from "../Registration/logo/profile.jpg";

const AddAddress = () => {
  const [user, setUser] = useState({});
  const [err, setErr] = useState({});
  // const [name, setName] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [email, setEmail] = useState("");
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const productId = localStorage.getItem("productId");
  if (!(userId && token)) {
    window.location.replace("/");
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState({});

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const userUrl = `http://localhost:5555/getUser/${userId}`;
    axios
      .get(userUrl, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        console.log("User is here===", response.data);
        setUser(response.data.user);
      })
      .catch((error) => {
        console.log("error===>", error.response.data);
        setErr(error.response.data);
      });
  };

  const onSubmitFunction = (data) => {
    console.log("Form", data);
    const urlAdd = `http://localhost:5555/addAddress/${userId}`;
    axios
      .post(
        urlAdd,
        {
          city: data.city,
          state: data.state,
          pinCode: data.pinCode,
          addressPhoneNumber: data.phoneNumber,
          addressName: data.addressName,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log("Address added successfully=", response.data);
        window.location.replace("/profile");
      })
      .catch((err) => {
        console.log("error is in Adding-->", err);
        setError(err.response.data.message);
      });
  };

  const orderAddress = (data) => {
    console.log("Form", data);
    const urlAdd = `http://localhost:5555/addAddress/${userId}`;
    axios
      .post(
        urlAdd,
        {
          city: data.city,
          state: data.state,
          pinCode: data.pinCode,
          addressPhoneNumber: data.phoneNumber,
          addressName: data.addressName,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log("Address added successfully=", response.data);
        window.location.replace("/order");
      })
      .catch((err) => {
        console.log("error is in Adding-->", err);
        setError(err.response.data.message);
      });
  };
  // console.log("User from outside===", user.user.Name);
  // setName(user.Name);
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
            <h2 className="create_account">Add New Address</h2>
            <Form onSubmit={handleSubmit(onSubmitFunction)}>
              <Form.Group className="form_group" controlId="formBasicCity">
                <Form.Control
                  type="text"
                  class="form-control"
                  placeholder="Enter City name"
                  name="city"
                  {...register("city", { required: true })}
                />
                {errors.city && errors.city.type == "required" && (
                  <p className="errorMsg">City is required.</p>
                )}
              </Form.Group>
              <Form.Group className="form_group" controlId="formBasicState">
                <Form.Control
                  type="text"
                  class="form-control"
                  placeholder="Enter State"
                  name="state"
                  {...register("state", { required: true })}
                />
                {errors.state && errors.state.type == "required" && (
                  <p className="errorMsg">State is required.</p>
                )}
              </Form.Group>
              <Form.Group className="form_group" controlId="formBasicPoinCode">
                <Form.Control
                  type="text"
                  class="form-control"
                  placeholder="Enter your pinCode"
                  name="pinCode"
                  {...register("pinCode", { required: true })}
                />
                {errors.pinCode && errors.pinCode.type == "required" && (
                  <p className="errorMsg">pinCode is required.</p>
                )}
              </Form.Group>
              <Form.Group
                className="form_group"
                controlId="formBasicAddressName"
              >
                <Form.Control
                  type="text"
                  class="form-control"
                  placeholder="Enter the name of reciever"
                  name="addressName"
                  {...register("addressName", { required: true })}
                />
                {errors.addressName &&
                  errors.addressName.type == "required" && (
                    <p className="errorMsg">Name is required.</p>
                  )}
              </Form.Group>
              <Form.Group
                className="form_group"
                controlId="formBasicAddressPhoneNumber"
              >
                {/* <Form.Label>Password: </Form.Label> */}
                <Form.Control
                  type="text"
                  class="form-control"
                  placeholder="Enter Phoene Number of the receiver."
                  name="phoneNumber"
                  {...register("phoneNumber", { required: true })}
                />
                {errors.phoneNumber &&
                  errors.phoneNumber.type == "required" && (
                    <p className="errorMsg">phoneNumber is required.</p>
                  )}
                {error && error == "Please enter a valid phoneNumber." && (
                  <p className="errorMsg">Please enter a valid phoneNumber.</p>
                )}
              </Form.Group>
              <Button variant="primary" type="submit" className="btn">
                Add
              </Button>
              {productId ? (
                <>
                  <Button className="btn" onClick={handleSubmit(orderAddress)}>
                    OrderToThisAddress
                  </Button>

                  <Link to={"/Order"}>
                    <Button className="btn">Cancel</Button>
                  </Link>
                </>
              ) : (
                <></>
              )}
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAddress;
