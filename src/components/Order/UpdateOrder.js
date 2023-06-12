import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import imageDefault from "../Registration/logo/imageDefault.jpg";
import { useSearchParams } from "react-router-dom";

const UpdateOrder = () => {
  const [order, setOrder] = useState([]);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const orderId = localStorage.getItem("orderId");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState({});

  const orderInfo = () => {
    const url = `http://localhost:5555/getOrderStatus/${userId}/${orderId}`;
    axios
      .get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        console.log(
          "Here is the info of the order...",
          response.data.orderInfo
        );
        setOrder(response.data.orderInfo);
      })
      .catch((error) => {
        console.log("Here is the error..", error);
      });
  };

  useEffect(() => {
    orderInfo();
  }, []);

  const onSubmitFunction = (data) => {
    console.log("Form", data);
    const url = `http://localhost:5555/updateOrder/${userId}/${orderId}`;
    axios
      .put(
        url,
        {
          productQuantity: data.productQuantity,
          orderCiy: data.orderCiy,
          orderState: data.orderState,
          orderPinCode: data.orderPinCode,
          orderAddressPhoneNumber: data.orderAddressPhoneNumber,
          orderAddressName: data.orderAddressName,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log("response=======", response.data);
        window.location.replace("/orderHistory");
      })
      .catch((error) => {
        // alert(err.response.data.message);
        setError(error.response.data);
        console.log("here is the error==", error);
      });
  };
  return (
    <div className="row no-gutters full_body_div">
      <div className="col-md-6 col-12 left_side">
        {order.map((item) => {
          return (
            <div className="row">
              <div className="update_order_info">
                <div className="col-md-3 col-6 update_order_product_img">
                  {!item.productImage === null ? (
                    <img
                      className="updte_order_product_image"
                      id={item.orderId}
                      src={item.productImage}
                      alt="image"
                    />
                  ) : (
                    <img
                      className="updte_order_product_image"
                      id={item.orderId}
                      src={imageDefault}
                      alt="image"
                    />
                  )}
                </div>
              </div>
              <div className="col-md-3 col-6 update_order_product_info">
                <p>{item.productType}</p>
                <h5>{item.productName}</h5>
                <h5>{item.productPrice}</h5>
                <h5>{item.productQuantity}</h5>
              </div>
            </div>
          );
        })}
      </div>
      <div className="col-md-6 col-12">
        <Form
          className="order_update_form"
          onSubmit={handleSubmit(onSubmitFunction)}
        >
          <Form.Group controlId="formBasicQuantity">
            <Form.Control
              type="number"
              class="form-control"
              placeholder="Number of Items"
              name="productQuantity"
              {...register("productQuantity", { required: true })}
            />
            {errors.productQuantity &&
              errors.productQuantity.type == "required" && (
                <p className="errorMsg">Number of Items are required.</p>
              )}
          </Form.Group>
          <Form.Group className="form_group" controlId="formBasicCity">
            {/* <Form.Label>lastName: </Form.Label> */}
            <Form.Control
              type="text"
              class="form-control"
              placeholder="Enter City"
              name="orderCiy"
              {...register("orderCiy", { required: true })}
            />
            {errors.orderCiy && errors.orderCiy.type == "required" && (
              <p className="errorMsg">City is required.</p>
            )}
          </Form.Group>
          <Form.Group className="form_group" controlId="formBasicState">
            {/* <Form.Label>Email: </Form.Label> */}
            <Form.Control
              type="text"
              class="form-control"
              placeholder="Enter State"
              name="orderState"
              {...register("orderState", {
                required: true,
              })}
            />
            {errors.orderState && errors.orderState.type == "required" && (
              <p className="errorMsg">State is required.</p>
            )}
          </Form.Group>
          <Form.Group className="form_group" controlId="formBasicPinCode">
            {/* <Form.Label>Email: </Form.Label> */}
            <Form.Control
              type="text"
              class="form-control"
              placeholder="Enter PinCode"
              name="orderPinCode"
              {...register("orderPinCode", {
                required: true,
              })}
            />
            {errors.orderPinCode && errors.orderPinCode.type == "required" && (
              <p className="errorMsg">PinCode is required.</p>
            )}
          </Form.Group>
          <Form.Group className="form_group" controlId="formBasicPhoneNumber">
            <Form.Control
              type="text"
              class="form-control"
              placeholder="Enter receivers phone Number"
              name="orderAddressPhoneNumber"
              {...register("orderAddressPhoneNumber", { required: true })}
            />
            {errors.orderAddressPhoneNumber &&
              errors.orderAddressPhoneNumber.type == "required" && (
                <p className="errorMsg">Receiver's phoneNumber is required.</p>
              )}
            {error.message &&
              error.message == "Please enter a valid phoneNumber." && (
                <p className="errorMsg">Please enter a valid phoneNumber.</p>
              )}
          </Form.Group>
          <Form.Group className="form_group" controlId="formBasicName">
            <Form.Control
              type="text"
              class="form-control"
              placeholder="Enter Name"
              name="orderAddressName"
              {...register("orderAddressName", {
                required: true,
              })}
            />
            {errors.orderAddressName &&
              errors.orderAddressName.type == "required" && (
                <p className="errorMsg">Name is required.</p>
              )}
          </Form.Group>

          <Button variant="primary" type="submit" className="btn">
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
};
export default UpdateOrder;
