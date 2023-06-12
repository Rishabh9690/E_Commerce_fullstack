import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./order.css";
import imageDefault from "../Registration/logo/imageDefault.jpg";
import plus from "../Cart/signs/plus_sign.jpg";
import minus from "../Cart/signs/minus_sign.jpg";

const Order2 = () => {
  const [addresses, setAddresses] = useState([]);
  const [products, setProducts] = useState([]); //= [];
  const [address, setAddress] = useState([]);
  const [cartBool, setCartBool] = useState(false);
  const [bool, setBool] = useState(0);
  const add1 = [];
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const pIds = localStorage.getItem("productId");
  if (!pIds) {
    window.location.replace("/");
  }
  const productIds = pIds.split(",");
  const [arr, setArr] = useState({});
  console.log("Here===", userId, productIds);
  let totalPrice = 0;

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

  useEffect(() => {
    getAddressOfUser();

    // Create an array of promises
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
  }, []);

  if (addresses) {
    add1.push(addresses[0]);
  }

  const sampleArr = [];
  products.forEach((product, index) => {
    // const temp = [];
    // temp.push(product[0]);
    // setSampleArr([...sampleArr, temp]);

    sampleArr.push(product[0]);
    // setSampleArr((prevSampleArr) => {
    //   const updatedSampleArr = [...prevSampleArr];
    //   updatedSampleArr[index] = product;
    //   return updatedSampleArr;
    // });
  });

  const orderAddress = (e) => {
    e.preventDefault();
    setBool(Number(e.currentTarget.id));
    console.log(
      "Here is the address which is selected by the user",
      e.currentTarget.id
    );
    const addressId = e.currentTarget.id;
    // localStorage.setItem("AddressId", e.currentTarget.id);
    // const addressId = localStorage.getItem("AddressId");
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

  const increaseQty = (e, productId) => {
    e.preventDefault();
    sampleArr.forEach((item) => {
      if (item.productId == productId) {
        console.log("Here is the Item before change=====", item);
        item.quantity += 1;
        console.log("Here is the Item after change=====", item);
        setArr({ ...arr, quantity: item.quantity + 1 });
        // updateArr(item);
      }
    });
    e.preventDefault();
    // setProducts((prevProducts) =>
    //   prevProducts.map((item) =>
    //     item.productId === productId
    //       ? { ...item, quantity: item.quantity + 1 }
    //       : item
    //   )
    // );
  };

  //   const updateArr=(item)=>{
  //     const index= sampleArr.indexOf(item);
  //     sampleArr[index]=
  //   }

  const decreaseQty = (e, productId) => {
    e.preventDefault();
    sampleArr.forEach((item) => {
      if (item.productId == productId) {
        console.log("Here is the Item before change=====", item);
        item.quantity -= 1;
        console.log("Here is the Item after change=====", item);
        setArr({ ...arr, quantity: item.quantity - 1 });
        // updateArr(item);
      }
    });
    e.preventDefault();
    // setProducts((prevProducts) =>
    //   prevProducts.map((item) =>
    //     item.productId === productId && item.quantity > 1
    //       ? { ...item, quantity: item.quantity - 1 }
    //       : item
    //   )
    // );
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
    // if (address.length == 0) {
    //   alert("Please select one Address to continue.");
    // } else {
    console.log("Order generation address1===>", add1);
    const orderData = {
      orderCiy: bool === 0 ? add1[0].city : address[0].city,
      orderState: bool === 0 ? add1[0].state : address[0].state,
      orderPinCode: bool === 0 ? add1[0].pinCode : address[0].pinCode,
      orderAddressPhoneNumber:
        bool === 0 ? add1[0].phoneNumber : address[0].addressPhoneNumber,
      orderAddressName: bool === 0 ? add1[0].Name : address[0].addressName,
    };

    console.log("Order===================>", orderData);
    if (sampleArr.length == 1 && !pIds.includes(",")) {
      console.log("Inside the generate Orders, for single products");
      const url = `http://localhost:5555/orderProduct/${userId}/${pIds}`;
      orderData.productQuantity = sampleArr[0].quantity;
      axios
        .post(url, orderData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log("Order placed...", response.data);
          alert("Order Placed.");
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
      const promises = sampleArr.map((item) => {
        const url = `http://localhost:5555/orderProduct/${userId}/${item.productId}`;
        console.log(url);
        orderData.productQuantity = item.quantity;

        console.log("Here is the body to hit..", orderData);
        return axios.post(url, orderData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      });

      Promise.all(promises)
        .then((responses) => {
          console.log("Order Done...", responses);
          alert("Order Placed");
          clearCartAfterOrder(); // Call the function after all requests are completed
          window.location.replace("/");
        })
        .catch((error) => {
          console.log("Error occurred while generating order:", error);
        });
    }
    // }
  };

  console.log("Here is the array of products from productId", products);
  console.log("Product of the addresses..", addresses);

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
                      onClick={(e) => increaseQty(e, item.productId)}
                      src={plus}
                      alt={"plus"}
                    />
                    <h5 className="input_qty">{item.quantity}</h5>
                    <img
                      className="qty_image"
                      id={item.id}
                      onClick={(e) => decreaseQty(e, item.productId)}
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
                        checked={index === bool || item.id === bool}
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
          {addresses ? (
            <>
              <Link to={"/Addaddress"}>
                <Button className="address_btn">New Address</Button>
              </Link>
              <Button className="order_btn" onClick={generateOrder}>
                Make Order
              </Button>
            </>
          ) : (
            <>
              <Link to={"/Addaddress"}>
                <Button className="address_btn">Add Address</Button>
              </Link>
            </>
          )}
          <Link to={"/"}>
            <Button className="cancel_btn">Cancel</Button>
          </Link>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Order2;
