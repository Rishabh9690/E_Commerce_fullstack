import React, { useEffect, useState } from "react";
import "../Registration/registration.css";
import axios from "axios";
import { Alert, Button } from "react-bootstrap";
import imageDefault from "../Registration/logo/imageDefault.jpg";
import profile from "../Registration/logo/profile.jpg";
import plus from "./signs/plus_sign.jpg";
import minus from "./signs/minus_sign.jpg";
import remove from "./signs/remove.jpg";
import EmptyCartModal from "./EmptyCartModal";
import Product from "../Home/Product";
import { Link } from "react-router-dom";

const Cart = () => {
  //   const [user, setUser] = useState([]);
  const [products, setproducts] = useState([]);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [showModal, setShowModal] = useState(false);
  const orderProductIds = [];
  let totalPrice = 0;

  const handleClose = () => {
    setShowModal(false);
  };
  const handleOpen = () => {
    setShowModal(true);
  };

  useEffect(() => {
    // getUserData();
    getCartProducts();
  }, []);

  const getCartProducts = () => {
    const url = `http://localhost:5555/getAllProductsFromCart/${userId}`;
    axios
      .get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        console.log("Here is the products from Cart..", response.data.products);
        setproducts(response.data.products);
      })
      .catch((error) => {
        console.log("Here is the error from Cart..", error);
      });
  };

  const removeProduct = (e) => {
    // e.preventDefault();
    const id = e.currentTarget.id;

    console.log("Inside the cart");
    const url = `http://localhost:5555/deleteProductfromCart/${userId}/${id}`;
    axios
      .delete(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        console.log("Deleted....", response.data);
        window.location.reload(true);
        // console.log("Count Qunatity....", count);
        // getCartProducts();
      })
      .catch((error) => {
        console.log("Error is here from Cart..", error);
      });
  };

  const deleteProduct = (id) => {
    // e.preventDefault();
    // const id = e.currentTarget.id;

    console.log("Inside the cart");
    const url = `http://localhost:5555/deleteProductfromCart/${userId}/${id}`;
    axios
      .delete(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        console.log("Deleted....", response.data);
        window.location.reload(true);
        // getCartProducts();
      })
      .catch((error) => {
        console.log("Error is here from Cart..", error);
      });
  };

  const increaseProduct = (e) => {
    // e.preventDefault();
    // console.log("Count Qunatity....", count);
    console.log("Increase button is clicked..");
    const url = `http://localhost:5555/increaseProductQuantityBy1/${userId}/${e.currentTarget.id}`;
    axios
      .put(url)
      .then((response) => {
        console.log("Increased by 1", response.data);
        // window.location.reload(true);
        getCartProducts();
      })
      .catch((error) => {
        console.log("Error from Increase Product Quantity", error);
      });
  };

  const decreaseProduct = (e) => {
    // e.preventDefault();
    // console.log("Count Qunatity....", count);
    console.log(
      "Here is the Quantity...",
      e.currentTarget.getAttribute("Quantity")
    );
    if (e.currentTarget.getAttribute("Quantity") == 1) {
      console.log("Calling delete function");
      //   console.log("Count Qunatity....", count);
      deleteProduct(e.currentTarget.id);
    }
    console.log("Decrease button is clicked..");
    const url = `http://localhost:5555/decreaseProductQuantityBy1/${userId}/${e.currentTarget.id}`;
    axios
      .put(url)
      .then((response) => {
        console.log("Decreased by 1", response.data);
        // window.location.reload(true);
        getCartProducts();
      })
      .catch((error) => {
        console.log("Error from Decrease Product Quantity", error);
      });
  };
  const home = (e) => {
    e.preventDefault();
    window.location.replace("/");
  };
  const placeOrder = (e) => {
    e.preventDefault();
    orderProductIds.push(e.currentTarget.id);
    localStorage.setItem("productId", orderProductIds);
    window.location.replace("/order");
  };

  const orderAll = () => {
    if (totalPrice > 0) {
      products.forEach((prod) => {
        orderProductIds.push(prod.id);
      });
      localStorage.setItem("productId", orderProductIds);
      console.log(
        "The user wants to order all the products present in the cart",
        orderProductIds
      );
      window.location.replace("/order");
    }
  };

  console.log("Products=====", products.length);
  return (
    <div>
      {products.length == 0 ? (
        <div className="emptyList">
          <Alert variant="success">
            <Alert.Heading>Your Cart is Empty</Alert.Heading>
            <p>Add items to it now.</p>
            <hr />
            <Link to={"/"}>
              <Button>Shop now</Button>
            </Link>
          </Alert>
        </div>
      ) : (
        <div className="row no-gutters">
          <div className="col-md-9 col-12 profile_right">
            {products.map((item, index) => {
              {
                totalPrice += item.Quantity * item.productPrice;
                console.log("totalPrice===", totalPrice )
              }
              return (
                <div>
                  <div className="row product_style">
                    <div className="col-md-2 my-auto image__">
                      {!item.productImage === null ? (
                        <>
                          <img
                            className="wish_product_image"
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
                    </div>
                    <div className=" col-md-4 product_data">
                      <h5>Type: {item.productType}</h5>
                      <h5>Name: {item.productName}</h5>
                      <h5>Price: {item.productPrice}</h5>
                      <h5>Details : {item.productDetails}</h5>
                    </div>
                    <div className="col-md-2">
                      <div
                        className="row quanity_add_sub"
                        key={item.id}
                        id={item.id}
                      >
                        <img
                          className="qty_image"
                          id={item.id}
                          onClick={increaseProduct}
                          src={plus}
                          alt={"plus"}
                        />
                        <h5 className="input_qty">{item.Quantity}</h5>
                        <img
                          className="qty_image"
                          id={item.id}
                          Quantity={item.Quantity}
                          onClick={decreaseProduct}
                          src={minus}
                          alt={"minus"}
                        />
                        <div className="qty_image">
                          <img
                            className="remove_btn"
                            id={item.id}
                            onClick={removeProduct}
                            src={remove}
                            alt={"remove"}
                          />
                        </div>
                      </div>
                    </div>
                    <div className=" col-md-1product_price">
                      <button className="btns" onClick={home}>
                        Continue Shopping
                      </button>
                      <button
                        className="btns"
                        id={item.id}
                        Quantity={item.Quantity}
                        onClick={placeOrder}
                      >
                        Place Order
                      </button>
                      <h5 className="price_text">
                        Total Item Price: {item.Quantity * item.productPrice}
                      </h5>
                    </div>
                  </div>
                </div>
              );
            })}
            {/* </div> */}
          </div>
          <div className="col-md-3 col-12">
            <div className="form_left_side">
              <h5>Products Details</h5>
              <div className="cart_sub_total">
                <h5>Total Items: {products.length}</h5>
                <hr />
                <h5>Delivery Charges: 0</h5>
                <hr />
                <h5>Amount Payable: {totalPrice}</h5>
                <Button
                  className="btn-sm"
                  id="cart_order_btn"
                  onClick={orderAll}
                >
                  Order All
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Cart;
