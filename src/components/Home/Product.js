import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import "./Product_style.css";
import imageDefault from "../Registration/logo/imageDefault.jpg";
import Modal from "react-bootstrap/Modal";
import SignInInside from "./SignInModal";

const Product = () => {
  const [product, setProduct] = useState([]);
  const [bool, setBool] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const productId = localStorage.getItem("productId");

  const handleClose = () => {
    setShowModal(false);
  };
  const handleOpen = () => {
    setShowModal(true);
  };
  useEffect(() => {
    getProduct();
    if (userId && token) {
      getWishList();
      findProductInCart();
    }
  }, []);

  const getProduct = () => {
    const url = `http://localhost:5555/getProductById/${productId}`;
    axios
      .get(url)
      .then((response) => {
        // console.log("here is the respose===", response.data.product);
        setProduct(response.data.product);
      })
      .catch((err) => {
        console.log("Here is the error==>", err);
      });
  };

  const findProductInCart = () => {
    const url = `http://localhost:5555/getSingleProductById/${userId}/${productId}`;
    axios
      .get(url)
      .then((response) => {
        console.log(
          "Here is the result of search from cart..",
          response.data.bool
        );
        setBool(response.data.bool);
      })
      .catch((error) => {
        console.log("Here is the error from product search in cart", error);
      });
  };

  const getWishList = () => {
    const url = `http://localhost:5555/getAllProductsOfuserFromWishList/${userId}`;
    axios
      .get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        console.log(
          "here is the respose from Wishlist.===",
          response.data.products
        );
        // setWishList(response.data.products);
      })
      .catch((error) => {
        console.log("Here is the error from wishlist==>", error);
        // setErr(error.response.data);
      });
  };

  const AddToCart = (e) => {
    e.preventDefault();
    if (!(token && userId)) {
      handleOpen();
      // alert("Please signIn");
      // console.log("Button is clicked.2");
      // window.location.replace("/SignIn");
    } else {
      const url = `http://localhost:5555/addToCart/${userId}/${productId}`;
      axios
        .post(url)
        .then((response) => {
          console.log("Product has been added to cart..", response.data);
          //   window.location.reload(true);
          window.location.replace("/cart");
        })
        .catch((error) => {
          console.log("Here is the error from AddToCart in products..", error);
        });
    }
  };

  const orderNow = (e) => {
    e.preventDefault();
    if (!(token && userId)) {
      handleOpen();
      // console.log("Button is clicked.");
      // alert("Please signIn");
      // console.log("Button is clicked.2");
      // window.location.replace("/SignIn");
    } else {
      window.location.replace("/order");
    }
  };

  const goToCart = (e) => {
    e.preventDefault();
    window.location.replace("/cart");
  };

  console.log("Here is the productId=====", productId);
  console.log("here is the product===", product);

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
    <div className="all_body row">
      {product.map((item, index) => {
        return (
          <>
            <div className="product_image_order">
              <div className="image_product">
                {!product.productImage === null ? (
                  <>
                    <img
                      className="product_product_image"
                      //   className="img-fluid"
                      id={item.id}
                      key={item.id}
                      src={item.productImage}
                      alt={"image"}
                    />
                  </>
                ) : (
                  <>
                    <img
                      className="product_product_image"
                      id={item.id}
                      src={imageDefault}
                      alt={"image"}
                    />
                  </>
                )}
              </div>
              <div className="product_btn">
                {!bool ? (
                  <>
                    <Button onClick={AddToCart}>Add To Cart</Button>
                  </>
                ) : (
                  <>
                    <Button onClick={goToCart}>Go To Cart</Button>
                  </>
                )}
                <Button onClick={orderNow}>Order Now</Button>
              </div>
            </div>
            <div className="product_details">
              <h5>Type: {item.productType}</h5>
              <h5>Name: {item.productName}</h5>
              <h3>Price: {item.productPrice}</h3>
              <h5>Details: {item.productDetails}</h5>
            </div>
            <SignInInside
              show={showModal}
              handleClose={handleClose}
              handleSave={handleSignInSave}
              handleOtp={handleOpen}
            />
            ;
          </>
        );
      })}
    </div>
  );
};
export default Product;
