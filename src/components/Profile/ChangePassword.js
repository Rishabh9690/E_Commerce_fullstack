import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import profile from "../Registration/logo/profile.jpg";
import "../Registration/registration.css";

const ChangePassword = () => {
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
    // if(data.newPassword !== data.confirmPassword)
    // {

    // }
    const url = `http://localhost:5555/changePassword/${userId}`;
    const newData = {
      email: data.email ? data.email : "", //user.Email,
      phoneNumber: data.phoneNumber ? data.phoneNumber : "", //user.phoneNumber,
      password: data.password,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword,
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
            <h2 className="create_account">Change Password</h2>
            <Form onSubmit={handleSubmit(onSubmitFunction)}>
              <Form.Group className="form_group" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  class="form-control"
                  placeholder="Enter your email ID"
                  name="email"
                  {...register("email")}
                />
                {errors.email && errors.email.type == "required" && (
                  <p className="errorMsg">email is required.</p>
                )}
                {error.message && error.message == "Email already exist.!" && (
                  <p className="errorMsg">Email already exist.!</p>
                )}
                {error.message &&
                  error.message == "Please enter a valid email address." && (
                    <p className="errorMsg">
                      Please enter a valid email address.
                    </p>
                  )}
                {error.message &&
                  error.message ==
                    "Id does not match with ID from the given Email" && (
                    <p className="errorMsg">
                      Id does not match with ID from the given Email
                    </p>
                  )}
                {error.message &&
                  error.message ==
                    "phoneNumber does not match with phoneNumber from the given Email" && (
                    <p className="errorMsg">
                      phoneNumber does not match with phoneNumber from the given
                      Email
                    </p>
                  )}
                {error.message &&
                  error.message ==
                    "Email does not match with Email from the given Email" && (
                    <p className="errorMsg">
                      Email does not match with Email from the given Email
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
                {errors.phoneNumber &&
                  errors.phoneNumber.type == "required" && (
                    <p className="errorMsg">phoneNumber is required.</p>
                  )}
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
                {error.message &&
                  error.message ==
                    "Id does not match with ID from the given phoneNumber" && (
                    <p className="errorMsg">
                      Id does not match with ID from the given phoneNumber
                    </p>
                  )}
              </Form.Group>
              <Form.Group className="form_group" controlId="formBasicPassword">
                {/* <Form.Label>Password: </Form.Label> */}
                <Form.Control
                  type="text"
                  class="form-control"
                  placeholder="Enter a password"
                  name="password"
                  {...register("password", { required: true })}
                />
                {errors.password && errors.password.type === "required" && (
                  <p className="errorMsg">password is required.</p>
                )}
                {error.message && error.message === "Wrong Password." && (
                  <p className="errorMsg">Wrong Password.</p>
                )}
              </Form.Group>
              <Form.Group
                className="form_group"
                controlId="formBasicNewPassword"
              >
                <Form.Control
                  type="password"
                  class="form-control"
                  placeholder="Enter new password"
                  name="newPassword"
                  {...register("newPassword", { required: true })}
                />
                {errors.newPassword &&
                  errors.newPassword.type === "required" && (
                    <p className="errorMsg">password is required.</p>
                  )}
                {error.message &&
                  error.message ===
                    "Password must contain 1 Number, 1 special character, 1 lower case character & 1 upper case character with minimum length of 8 and maximum length of 16." && (
                    <p className="errorMsg">
                      Password must contain 1 Number, 1 special character…ith
                      minimum length of 8 and maximum length of 16.
                    </p>
                  )}
              </Form.Group>
              <Form.Group
                className="form_group"
                controlId="formBasicconfirmPassword"
              >
                <Form.Control
                  type="password"
                  class="form-control"
                  placeholder="Re-enter new password"
                  name="confirmPassword"
                  {...register("confirmPassword", { required: true })}
                />
                {errors.confirmPassword &&
                  errors.confirmPassword.type === "required" && (
                    <p className="errorMsg">password is required.</p>
                  )}
                {error.message &&
                  error.message ===
                    "Password must contain 1 Number, 1 special character, 1 lower case character & 1 upper case character with minimum length of 8 and maximum length of 16." && (
                    <p className="errorMsg">
                      Password must contain 1 Number, 1 special character…ith
                      minimum length of 8 and maximum length of 16.
                    </p>
                  )}
                {error.message &&
                  error.message ===
                    "newPassword does not match with confirmPassword" && (
                    <p className="errorMsg">
                      newPassword does not match with confirmPassword
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
export default ChangePassword;
