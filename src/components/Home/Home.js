import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Container, Button } from "react-bootstrap";
import "./Product_style.css";
import imageDefault from "../Registration/logo/imageDefault.jpg";
import { useNavigate } from "react-router-dom";
import SignInInside from "./SignInModal";

const Home = (props) => {
  const [products, setProducts] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [err, setErr] = useState({});
  const [showModal, setShowModal] = useState(false);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const wishIdArr = [];
  localStorage.removeItem("productId");
  localStorage.removeItem("orderId");
  localStorage.removeItem("email");

  const navigate = useNavigate();

  const handleClose = () => {
    setShowModal(false);
  };
  const handleOpen = () => {
    setShowModal(true);
  };

  document.addEventListener("DOMContentLoaded", function () {
    if (token) {
      window.history.pushState(null, null, "/"); //window.location.href
      window.onpopstate = function (event) {
        window.history.go(1);
      };
    }
  });

  const getProductBySearch = (productName) => {
    console.log("Here is the code...", productName);
    const url = `http://localhost:5555/getProductByNameorType/${productName}`;
    axios
      .get(url)
      .then((response) => {
        console.log("Here is the response from search..", response.data);
        // setProducts(response.data.Product);
      })
      .catch((error) => {
        console.log("Erroe is from search...", error);
      });
  };

  useEffect(() => {
    if (props.productName) {
      console.log("A message from Home useEffect 1");
      if (props.productName.length > 0) {
        console.log("A message from Home useEffect 2");
        getProductBySearch(props.productName);
      }
    } else {
      getAllProducts();
    }
    if (token && userId) {
      // navigate("/"); //, { replace: true }
      navigate(1);
      getWishList();
    }
  }, []);

  const getWishList = async () => {
    const url = `http://localhost:5555/getAllProductsOfuserFromWishList/${userId}`;
    axios
      .get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        console.log(
          "here is the respose from Wishlist.===",
          response.data.products
        );
        setWishList(response.data.products);
      })
      .catch((error) => {
        console.log("Here is the error from wishlist==>", err);
        setErr(error.response.data);
      });
  };

  if (wishList.length > 0) {
    wishList.forEach((item) => {
      wishIdArr.push(item.id);
    });
  }

  const getAllProducts = async () => {
    const url = `http://localhost:5555/getAllProducts`;
    axios
      .get(url)
      .then((response) => {
        console.log("here is the respose from Products===", response.data);
        setProducts(response.data.Product);
      })
      .catch((error) => {
        console.log("Here is the error==>", err);
        setErr(error.response.data);
      });
  };

  const logOutFunction = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.replace("/");
  };

  const clickProduct = (e) => {
    e.preventDefault();
    console.log(
      "clickProduct is clicked and the product id is==>",
      e.currentTarget.id
    );
    localStorage.setItem("productId", e.currentTarget.id);
    window.location.replace("/product");
  };

  const wishUpdate = (e) => {
    e.preventDefault();
    if (token && userId) {
      console.log("Wishlist clicked..");
      console.log("token==========", token);

      const url = `http://localhost:5555/changeProductStatusInWishlist/${userId}/${e.currentTarget.id}`;
      console.log("the url", url);

      axios
        .put(url)
        .then((response) => {
          console.log("the api response---------->", response);
          // window.location.reload(true);
          getWishList();
        })
        .catch((error) => {
          console.log("error===>", error.response.data);
          setErr(error.response.data);
        });
    } else {
      // alert("Please signIn First.");
      handleOpen();
      // window.location.replace("signIn");
    }
  };

  const handleSignInSave = (data) => {
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
          window.location.replace("/");
        }
      })
      .catch((err) => {
        console.log("here is the message==", err.response.data);
        console.log("here is the status==>", err.response.status);
      });
  };
  return (
    <>
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
      <div className="">
        <div className="full_body">
          <Container>
            <h2>All Products</h2>
            <div className="row">
              {products.map((item, index) => {
                return (
                  <div className="col-md-4" key={index}>
                    <Card
                      className="product_class"
                      key={item.id}
                      id={item.id}
                      // onClick={clickProduct}
                    >
                      <div className="product_type">
                        <h5 className="type">{item.productType}</h5>
                        <button
                          id={item.id}
                          className={
                            wishIdArr.length > 0
                              ? wishIdArr.includes(item.id)
                                ? "wish_in_btn"
                                : "wish_out_btn"
                              : "wish_out_btn"
                          }
                          onClick={wishUpdate}
                        />
                      </div>
                      <Card.Title
                        className="product_name"
                        id={item.id}
                        onClick={clickProduct}
                      >
                        {item.productName}
                      </Card.Title>
                      {/* <button onClick={clickProduct}> */}
                      {!item.productImage === null ? (
                        <>
                          <Card.Img
                            // className="product_image"
                            className="img-fluid"
                            id={item.id}
                            onClick={clickProduct}
                            src={item.productImage}
                            alt={"image"}
                          />
                        </>
                      ) : (
                        <>
                          <Card.Img
                            className="product_image"
                            id={item.id}
                            onClick={clickProduct}
                            src={imageDefault}
                            alt={"image"}
                          />
                        </>
                      )}
                      {/* </button> */}
                      <Card.Text
                        className="product_details"
                        id={item.id}
                        onClick={clickProduct}
                      >
                        {item.productDetails}
                      </Card.Text>
                      <Card.Body
                        className="price_box"
                        id={item.id}
                        onClick={clickProduct}
                      >
                        Price: {item.productPrice}
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
            </div>
            <SignInInside
              show={showModal}
              handleClose={handleClose}
              handleSave={handleSignInSave}
              handleOtp={handleOpen}
            />
            ;
          </Container>
        </div>
      </div>
    </>
  );
};
export default Home;
