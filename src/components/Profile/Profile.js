import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import "../Registration/registration.css";
import profile from "../Registration/logo/profile.jpg";
import edit from "../Registration/logo/edit.jpg";
import Dropdown from "react-bootstrap/Dropdown";
import DeleteProfile from "./DeleteProfile";

const Profile = () => {
  const [user, setUser] = useState([]);
  const [err, setErr] = useState({});
  const [address, setAddress] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const userUrl = `http://localhost:5555/getUser/${userId}`;
  const getAddUrl = `http://localhost:5555/getAllAddresses/${userId}`;

  const handleClose = () => {
    setShowModal(false);
  };
  const handleOpen = () => {
    setShowModal(true);
  };

  const logOutFunction = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.replace("/");
  };

  useEffect(() => {
    localStorage.removeItem("productId");
    getUserData();
    getAllAddresses();
  }, []);

  const getUserData = async () => {
    axios
      .get(userUrl, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        // console.log("User is here===", response.data.user);
        setUser(response.data.user);
      })
      .catch((error) => {
        console.log("error===>", error.response.data);
        setErr(error.response.data);
      });
  };

  const getAllAddresses = async () => {
    axios
      .get(getAddUrl, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        // console.log("Addresses ARE here===", response.data.Address);
        setAddress(response.data.Address);
      })
      .catch((error) => {
        console.log("error===>", error.response.data);
        setErr(error.response.data);
      });
  };

  const deleteAddress = async (e) => {
    // e.preventDefault();
    console.log("Here is the userId and addressId", userId, e.currentTarget.id);
    console.log(
      `http://localhost:5555/deleteAddress/${userId}/${e.currentTarget.id}`
    );
    axios
      .delete(
        `http://localhost:5555/deleteAddress/${userId}/${e.currentTarget.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log("Address deleted.", response.data);
        window.location.reload(true);
      })
      .catch((error) => {
        console.log("Error is from Delete===", error);
      });
  };

  const updateAddress = (e) => {
    e.preventDefault();
    localStorage.setItem("addressId", e.currentTarget.id);
    window.location.replace("/updateAddress");
  };

  const editProfile = (e) => {
    e.preventDefault();
    console.log("Edit is clicked");
    // window.location;
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("addressId");
    localStorage.removeItem("productId");
    // localStorage.removeItem("email");
    window.location.replace("/");
  };

  const handleDeleteProfileSave = (data) => {
    if (data) {
      logOut();
    }
    /*
    console.log("Here is the data for deleting the profile..", data);
    const url = `http://localhost:5555/deleteUser/${userId}`;
    axios
      .delete(url, { data }, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        console.log("Profile has been deleted.", response.data);
        logOut();
      })
      .catch((error) => {
        console.log("Here is the error from Delete Profile", error);
      });
    */
  };

  const deleteUser = () => {
    handleOpen();
  };

  return (
    <div>
      {err.response ? (
        <>
          <h1>Please login again.</h1>
          <Button className="btn" onClick={logOutFunction}>
            SignIn
          </Button>
        </>
      ) : (
        <></>
      )}
      <div className="row no-gutters">
        <div className="col-md-4 col-12">
          <div className="form_left_side card h-100 border-primary justify-content-center bg-image text-center">
            <img
              className="profile_image"
              src={profile}
              alt="profile_Picture"
            />
            <div className="combine">
              <h3 className="user_data">{user.Name}</h3>
              {/* <img
                className="profile_edit"
                onClick={editProfile}
                src={edit}
                alt="edit"
              /> */}
              <h3 className="user_data">{user.Email}</h3>
              <h3 className="user_data">{user.phoneNumber}</h3>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic" />
                <Dropdown.Menu>
                  <Dropdown.Item href="/editProfile">
                    Edit Profile
                  </Dropdown.Item>
                  <Dropdown.Item href="/changePassword">
                    Change Password
                  </Dropdown.Item>
                  <Dropdown.Item onClick={deleteUser}>
                    Delete Account
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <DeleteProfile
              show={showModal}
              handleClose={handleClose}
              handleSave={handleDeleteProfileSave}
            />
          </div>
        </div>
        <div className="col-md-8 col-12 profile_right">
          <Link to={"/Addaddress"}>
            <Button className="btn">AddAddress</Button>
          </Link>

          {address ? (
            address.map((item, index) => {
              return (
                <div>
                  <div className="address_btns" key={index}>
                    <Button
                      className="btn-sm side_btn"
                      key={item.id}
                      id={item.id}
                      onClick={updateAddress}
                    >
                      Update
                    </Button>
                    <Button
                      className="btn-sm side_btn"
                      key={item.id}
                      id={item.id}
                      onClick={deleteAddress}
                    >
                      Remove
                    </Button>
                  </div>
                  <div className="address_style">
                    {/* <div> */}
                    <h5>City: {item.city}</h5>
                    <h5>State: {item.state}</h5>
                    <h5>PinCode: {item.pinCode}</h5>
                    <h5>Name: {item.Name}</h5>
                    <h5>Phone Number: {item.phoneNumber}</h5>
                    {/* </div> */}
                  </div>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
    // <>
    //   <h5>The user data </h5>

    //   <p>{user.Name}</p>
    // </>
  );
};
export default Profile;
