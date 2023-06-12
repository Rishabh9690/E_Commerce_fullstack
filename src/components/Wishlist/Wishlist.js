import axios from "axios";
import React, { useEffect, useState } from "react";
import "../Registration/registration.css";
import profile from "../Registration/logo/profile.jpg";
import { Alert, Button } from "react-bootstrap";
import imageDefault from "../Registration/logo/imageDefault.jpg";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const [user, setUser] = useState([]);
  const [prod, setProd] = useState([]);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    getUserData();
    getWishList();
  }, []);

  const getUserData = () => {
    const userUrl = `http://localhost:5555/getUser/${userId}`;
    axios
      .get(userUrl, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        // console.log("User is here===", response.data.user);
        setUser(response.data.user);
      })
      .catch((error) => {
        console.log("error===>", error.response.data);
      });
  };

  const getWishList = () => {
    const url = `http://localhost:5555/getAllProductsOfuserFromWishList/${userId}`;
    axios
      .get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setProd(response.data.products);
      })
      .catch((error) => {
        console.log("Here is the error", error);
      });
  };

  const removeProduct = (e) => {
    e.preventDefault();

    const url = `http://localhost:5555/changeProductStatusInWishlist/${userId}/${e.currentTarget.id}`;

    axios
      .put(url)
      .then((response) => {
        console.log("the api response---------->", response);
        // window.location.reload(true);
        getWishList();
      })
      .catch((error) => {
        console.log("error===>", error.response.data);
      });
  };

  console.log("From prodId=====================", prod);

  const placeOrder = (e) => {
    const productId = e.currentTarget.id;
    console.log("ProductId===", productId);
    localStorage.setItem("productId", productId);
    window.location.replace("/order");
  };

  return (
    <div>
      {prod.length == 0 ? (
        <div className="emptyList">
          <Alert variant="success">
            <Alert.Heading>Your Wishlist is Empty</Alert.Heading>
            <p>Add items to it now.</p>
            <hr />
            <Link to={"/"}>
              <Button>Shop now</Button>
            </Link>
          </Alert>
        </div>
      ) : (
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
          <div className="col-md-8 col-12 profile_right">
            {/* <div className="form_right_side"> */}
            {prod.map((item, index) => {
              return (
                <div>
                  <div className="address_btns" key={index}>
                    <Button
                      className="btn-sm side_btn"
                      key={item.id}
                      id={item.id}
                      onClick={removeProduct}
                    >
                      Remove
                    </Button>
                    <Button
                      className="btn-sm side_btn"
                      id={item.id}
                      onClick={placeOrder}
                    >
                      Place Order
                    </Button>
                  </div>
                  <div>
                    {!item.productImage === null ? (
                      <>
                        <img
                          className="product_image"
                          //   className="img-fluid"
                          id={item.id}
                          src={item.productImage}
                          alt={"image"}
                        />
                      </>
                    ) : (
                      <>
                        <img
                          className="wish_product_image"
                          id={item.id}
                          src={imageDefault}
                          alt={"image"}
                        />
                      </>
                    )}
                    <div className="product_style">
                      <h5>Type:{item.productType}</h5>
                      <h5>Name: {item.productName}</h5>
                      <h5>productPrice: {item.productPrice}</h5>
                      <h5>productDetails : {item.productDetails}</h5>
                    </div>
                  </div>
                </div>
              );
            })}
            {/* </div> */}
          </div>
        </div>
      )}
    </div>
  );
};
export default Wishlist;
