import axios from "axios";
import React, { useEffect, useState } from "react";
import "./order.css";
import imageDefault from "../Registration/logo/imageDefault.jpg";
import { Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const productId = localStorage.getItem("productId");

  const getOrderHistory = () => {
    const url = `http://localhost:5555/getAllOrders/${userId}`;
    axios
      .get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        console.log("Here is the order history...", response.data);
        setOrders(response.data.Orders);
      })
      .catch((error) => {
        console.log("Here is the error from order history..", error);
      });
  };

  useEffect(() => {
    getOrderHistory();
  }, []);

  const cancelOrder = (e) => {
    e.preventDefault();
    console.log(
      "A request to cancel the order is clicked....",
      userId,
      e.currentTarget.id
    );
    const url = `http://localhost:5555/cancelOrder/${userId}/${e.currentTarget.id}`;
    axios
      .put(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        console.log("Order has been cancelled..", response.data);
        getOrderHistory();
      })
      .catch((error) => {
        console.log("Error is here.... in Cancellation of the order.", error);
      });
  };

  const updateOrder = (e) => {
    e.preventDefault();
    console.log(
      "A request to update the order is clicked....",
      userId,
      e.currentTarget.id
    );
    localStorage.setItem("orderId", e.currentTarget.id);
    window.location.replace("/updateOrder");
  };

  const orderAgain = (e) => {
    e.preventDefault();
    console.log(
      "A request to purchase again the order is clicked....",
      userId,
      e.currentTarget.id
    );
    localStorage.setItem("productId", e.currentTarget.id);
    window.location.replace("/order");
  };

  console.log("here is the order history...", orders);

  return (
    <div className="order_item">
      <div className="row no-gutters">
        <div className="col-md-12 col-12">
          {orders ? (
            orders.map((item) => {
              const orderDate = item.orderDate ? item.orderDate.split("T") : "";
              const dDate = item.delieveryDate
                ? item.delieveryDate.split("T")
                : "Coming Soon";
              const delieveryDate = dDate.length == 2 ? dDate[0] : dDate;
              return (
                <div
                  className={
                    productId && productId == item.productId
                      ? "row full_order_body_product_search"
                      : "row full_order_body"
                  }
                >
                  <div
                    className="col-md-3 col-12 product_order_image"
                    key={item.orderId}
                    id={item.orderId}
                  >
                    {!item.productImage === null ? (
                      <img
                        className="order_product_image"
                        id={item.orderId}
                        src={item.productImage}
                        alt="image"
                      />
                    ) : (
                      <img
                        className="order_product_image"
                        id={item.orderId}
                        src={imageDefault}
                        alt="image"
                      />
                    )}
                  </div>
                  <div
                    className="col-md-2 col-12 order_product_info"
                    key={item.orderId}
                    id={item.orderId}
                  >
                    <p>
                      <b>{item.productType}</b>
                    </p>
                    <h5>{item.productName}</h5>
                    <h4>{item.productPrice}</h4>
                  </div>
                  <div
                    className="col-md-2 col-12 order_address_info"
                    key={item.orderId}
                    id={item.orderId}
                  >
                    <h4>{item.orderAddressName}</h4>
                    <h5>{item.orderAddressPhoneNumber}</h5>
                    {/* <div className="order_add_info"> */}
                    <p>
                      <b>
                        {item.orderCity}, {item.orderPinCode}
                      </b>
                    </p>
                    {/* </div> */}
                    <h5>{item.orderState}</h5>
                  </div>
                  <div
                    className="col-md-2 col-12 order_product_totalprice"
                    key={item.orderId}
                    id={item.orderId}
                  >
                    <h5>Quantity: {item.productQuantity}</h5>
                    <h5>Total Price: {item.totalPrice}</h5>
                  </div>
                  <div
                    className="col-md-3 col-12 order_data_status"
                    key={item.orderId}
                    id={item.orderId}
                  >
                    <h5
                      className={
                        item.status == "Active"
                          ? "order_data_status_active"
                          : "order_data_status_cancel"
                      }
                    >
                      {item.status}
                    </h5>
                    <h5>OrderedOn: {orderDate[0]}</h5>
                    <h5>
                      DeliveryDate:{" "}
                      {item.status === "Cancelled" ? "NULL" : delieveryDate}
                    </h5>
                    {item.status == "Active" ? (
                      <div className="order_btns">
                        <Button
                          className="btn-sm"
                          key={item.orderId}
                          id={item.orderId}
                          onClick={updateOrder}
                        >
                          Update Order Address
                        </Button>

                        <Button
                          className="btn-sm"
                          key={item.orderId}
                          id={item.orderId}
                          onClick={cancelOrder}
                        >
                          Cancel Order
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Link to={""}>
                          <Button
                            className="btn-sm"
                            key={item.orderId}
                            id={item.productId}
                            onClick={orderAgain}
                          >
                            Buy it again
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <>
              <div className="emptyList">
                <Alert variant="success">
                  <Alert.Heading>No ordres are made yet</Alert.Heading>
                  <p>Please order.</p>
                  <hr />
                  <Link to={"/"}>
                    <Button>Shop now</Button>
                  </Link>
                </Alert>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default OrderHistory;
