import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./order.css";
import imageDefault from "../Registration/logo/imageDefault.jpg";
import plus from "../Cart/signs/plus_sign.jpg";
import minus from "../Cart/signs/minus_sign.jpg";
import OrderDone from "./OrderDone";

const Order = () => {
  const [addresses, setAddresses] = useState([]);
  const [products, setProducts] = useState([]); //= [];
  const [address, setAddress] = useState([]);
  const [cartBool, setCartBool] = useState(false);
  const [showModal, setShowModal] = useState(false);
  //   const [qty, setQty] = useState(1);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const pIds = localStorage.getItem("productId");
  const productIds = pIds.split(",");
  console.log("Here===", userId, productIds);
  //   let Quantity = 1; //ByDefault
  let totalPrice = 0;

  const handleClose = () => {
    setShowModal(false);
  };
  const handleOpen = () => {
    setShowModal(true);
  };

  //Checking that the product is present in the cart or not, and comfirming the Quantity.
  const searchCartByProductIdToGetQty = (productId, resolve, reject) => {
    const url = `http://localhost:5555/getSingleProductById/${userId}/${productId}`;
    axios
      .get(url)
      .then((response) => {
        console.log(
          "Here is the response from searchCartByProductId..",
          response.data
        );
        setCartBool(response.data.bool);
        if (response.data.bool) {
          resolve(response.data.info);
        } else {
          searchProductByProductId(productId, resolve, reject);
        }
      })
      .catch((error) => {
        console.log("Here is the error from searchCartByProductId..", error);
        reject(error);
      });
  };

  const searchProductByProductId = (productId, resolve, reject) => {
    console.log("The code entered here........");
    const url = `http://localhost:5555/getProductById/${productId}`;
    axios
      .get(url)
      .then((response) => {
        console.log(
          "Here is the product from searchProductByProductId..",
          response.data.product
        );
        resolve(response.data.product);
      })
      .catch((error) => {
        console.log("Error is here..", error);
        reject(error);
      });
  };

  //Fetching the addresses of the users.
  const getAddressOfUser = () => {
    const url = `http://localhost:5555/getAllAddresses/${userId}`;
    axios
      .get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((respsonse) => {
        console.log(
          "Here are the addresses of the user..",
          respsonse.data.Address
        );
        setAddresses(respsonse.data.Address);
      })
      .catch((error) => {
        console.log("Here is the error..", error);
      });
  };

  const fetchingProducts = () => {
    const promises = productIds.map((element) => {
      return new Promise((resolve, reject) => {
        searchCartByProductIdToGetQty(element, resolve, reject);
      });
    });

    Promise.all(promises)
      .then((results) => {
        const productsData = results.filter((data) => data !== null);
        console.log(
          "Here is the result of the promise,,,,,,,,,,,,",
          productsData
        );
        setProducts(productsData);
      })
      .catch((error) => {
        console.log("Error occurred while fetching product data:", error);
      });
  };

  useEffect(() => {
    fetchingProducts();

    getAddressOfUser();
  }, []);

  const orderAddress = (e) => {
    e.preventDefault();
    console.log(
      "Here is the address which is selected by the user",
      e.currentTarget.id
    );
    const addressId = e.currentTarget.id;
    if (!addressId) {
      alert("Please select one Address.");
    } else {
      const url = `http://localhost:5555/getAddressByAddressId/${userId}/${addressId}`;
      axios
        .get(url, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          console.log(
            "Here is the response from GenerateOrder....",
            response.data
          );
          setAddress(response.data.Address);
        })
        .catch((error) => {
          console.log("Here is the error from GenerateOrder...", error);
        });
    }
  };

  const increaseQty = (e) => {
    e.preventDefault();
    const productId = e.currentTarget.id;
    setProducts((prevProducts) =>
      prevProducts.map((item) =>
        item[0].productId == productId
          ? { ...item, ...(item[0].quantity = item[0].quantity + 1) }
          : item
      )
    );
  };

  const decreaseQty = (e) => {
    e.preventDefault();
    const productId = e.currentTarget.id;
    setProducts((prevProducts) =>
      prevProducts.map((item) =>
        item[0].productId == productId
          ? { ...item, ...(item[0].quantity = item[0].quantity - 1) }
          : item
      )
    );
  };

  const clearCartAfterOrder = () => {
    if (cartBool) {
      products.forEach((item) => {
        const url = `http://localhost:5555/deleteProductfromCart/${userId}/${item[0].productId}`;
        axios
          .delete(url, { headers: { Authorization: `Bearer ${token}` } })
          .then((response) => {
            console.log("Product from cart is deleted..", response.data);
          })
          .catch((error) => {
            console.log(
              "Error is here... from DeleteProductsFromCart...",
              error
            );
          });
      });
    }
  };

  const generateOrder = () => {
    console.log("Order generation products===>", products);
    console.log("Order generation address===>", address);
    if (address.length === 0) {
      alert("Please select one Address to continue.");
    } else {
      const orderData = {
        orderCiy: address[0].city,
        orderState: address[0].state,
        orderPinCode: address[0].pinCode,
        orderAddressPhoneNumber: address[0].addressPhoneNumber,
        orderAddressName: address[0].addressName,
      };
      if (products[0].length == 1 && !pIds.includes(",")) {
        console.log("Inside the generate Orders, for single products");
        const url = `http://localhost:5555/orderProduct/${userId}/${pIds}`;
        orderData.productQuantity = 1;
        axios
          .post(url, orderData, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            console.log("Order placed...", response.data);
            // alert("Order Placed.");
            handleOpen();
            window.location.replace("/");
          })
          .catch((error) => {
            console.log("Here is the error from single products..", error);
            if (
              error.response.data.message ==
              "If you want to increase the number of items of the product, then update your order."
            ) {
              alert(
                "This product hass already been ordered, you can update this order from OrderHistory."
              );
              window.location.replace("/orderHistory");
            }
          });
        if (cartBool) {
          clearCartAfterOrder();
        }
      } else {
        console.log("Inside the generate Orders, for Multiple products");
        const promises = products.map((item) => {
          const url = `http://localhost:5555/orderProduct/${userId}/${item[0].productId}`;
          console.log(url);
          orderData.productQuantity = item[0].quantity;

          console.log("Here is the body to hit..", orderData);
          return axios.post(url, orderData, {
            headers: { Authorization: `Bearer ${token}` },
          });
        });

        Promise.all(promises)
          .then((responses) => {
            console.log("Order Done...", responses);
            // alert("Order Placed");
            handleOpen();
            clearCartAfterOrder(); // Call the function after all requests are completed
            window.location.replace("/");
          })
          .catch((error) => {
            console.log("Error occurred while generating order:", error);
          });
      }
    }
  };

  console.log("Here is the array of products from productId", products);
  console.log("Product of the product item..", typeof products);
  const sampleArr = [];
  products.forEach((product) => {
    sampleArr.push(product[0]);
  });

  console.log("Here is the array of products from SAMPLEARR", sampleArr);

  return (
    // <div>
    <div className="row no-gutters full_page">
      <div className="col-md-8 col-12 product_info">
        {sampleArr.map((item, index) => {
          {
            totalPrice += item.quantity * item.productPrice;
          }
          return (
            <div className="row">
              {!item.quantity || item.quantity == undefined
                ? (item.quantity = 1)
                : item.quantity}
              <div className="combine_prod_data">
                <div
                  className="col-md-3 col-4 prod_image"
                  key={item.id}
                  id={item.id}
                >
                  {!item.productImage === null ? (
                    <img
                      className="order_product_image"
                      id={item.id}
                      src={item.productImage}
                      alt="image"
                    />
                  ) : (
                    <img
                      className="order_product_image"
                      id={item.id}
                      src={imageDefault}
                      alt="image"
                    />
                  )}
                </div>
                <div className="col-md-3 col-4 product_data">
                  <h5>{item.productType}</h5>
                  <h5>{item.productName}</h5>
                  <h5>
                    <b>{item.productPrice}</b>
                  </h5>
                  <h5>{item.productDetails}</h5>
                </div>
                <div className="col-md-2 col-4 total_price">
                  <div className="inc_dec_qty">
                    <img
                      className="qty_image"
                      id={item.productId}
                      onClick={increaseQty}
                      src={plus}
                      alt={"plus"}
                    />
                    <h5 className="input_qty">{item.quantity}</h5>
                    <img
                      className="qty_image"
                      id={item.id}
                      onClick={decreaseQty}
                      src={minus}
                      alt={"minus"}
                    />
                  </div>
                  <div className="total_price_text">
                    <h5>Total Price:{item.quantity * item.productPrice}</h5>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="col-md-4 col-12">
        <div className="choose_address">
          {addresses ? (
            <>
              {addresses.map((item, index) => {
                return (
                  <div className="address_block">
                    <label key={index}>
                      <input
                        type="radio"
                        name="myGroupName"
                        value={item.id}
                        id={item.id}
                        onChange={orderAddress}
                      />
                      <h4>{item.Name}</h4>
                      <p>
                        <b>{item.phoneNumber}</b>
                      </p>
                      <div className="city_pincode">
                        <p>
                          <b>{item.city}</b>
                        </p>
                        <p>
                          <b>({item.pinCode})</b>
                        </p>
                      </div>
                    </label>
                  </div>
                );
              })}
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="add_address">
          <h5 className="order_total_price">
            Total Payable Amount: {totalPrice}
          </h5>
          <Link to={"/Addaddress"}>
            <Button className="address_btn">New Address</Button>
          </Link>
          <Button className="order_btn" onClick={generateOrder}>
            Make Order
          </Button>
          <Link to={"/"}>
            <Button className="cancel_btn">Cancel</Button>
          </Link>
          <OrderDone show={showModal} handleClose={handleClose} />
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Order;
