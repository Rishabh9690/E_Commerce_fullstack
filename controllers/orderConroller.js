const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { queryExecutor } = require("../utils/common");
const { CONSTANT_VARIABLES } = require("../config/config");

//searchUserById checks does this ID given in params exist in database or not.
const searchUserById = async (id) => {
  try {
    console.log("ID from searchUserById function----OrderController", id);

    const sql = `SELECT * FROM user WHERE id=${id} AND status= true`;
    const searchData = await queryExecutor(sql);
    console.log(
      "searchData from searchUserById function----OrderController",
      searchData
    );
    return searchData;
  } catch (err) {
    console.log("Error is here----OrderController", err);
  }
};

//searchProductById checks does this Product given in params exist in database or not.
const searchProductById = async (id) => {
  try {
    // console.log(
    //   "Searching for product by Id using searchProductById function.----OrderController"
    // );

    const sql = `SELECT * FROM products WHERE id=${id} AND status= true`;
    const searchData = await queryExecutor(sql);

    console.log(
      "Here is the product from searchProductById.----OrderController",
      searchData
    );
    return searchData;
  } catch (err) {
    console.log("Error is here----OrderController", err);
  }
};

//searchOrderById checks does this Order given in params exist in database or not.
const searchOrderById = async (id) => {
  try {
    // console.log(
    //   "Searching for order by Id using searchOrderById function.----OrderController"
    // );

    const sql = `SELECT * FROM orders WHERE id=${id}`;
    const searchData = await queryExecutor(sql);

    console.log(
      "Here is the order from searchOrderById.----OrderController",
      searchData
    );
    return searchData;
  } catch (err) {
    console.log("Error is here----OrderController", err);
  }
};

//searchAddressByAddressId checks does this address given exisst in database or not.
const searchAddressByAddressId = async (id) => {
  try {
    console.log(
      "ID from searchAddressByAddressId function----OrderController",
      id
    );

    const sql = `SELECT * FROM addresses WHERE id=${id} AND status= true`;
    const searchData = await queryExecutor(sql);
    console.log(
      "searchData from searchUserById function----OrderController",
      searchData
    );
    return searchData;
  } catch (err) {
    console.log("Error is here----OrderController", err);
  }
};

// ===================================Logics===================================

const orderProduct = async (req, res) => {
  try {
    const userId = req.params.id;
    const productId = req.params.productId;
    const data = req.body;

    if (!userId || !productId) {
      console.log("Enter the userId and productId-----ORDER_CONTROLLER");
      return res.status(400).send({
        message: "Enter the userId and productId",
      });
    }

    const searchId = await searchUserById(userId);

    if (searchId.length == 0) {
      console.log("User not found.-----ORDER_CONTROLLER");
      return res.status(404).send({
        message: "User not found.",
      });
    }

    const searchProduct = await searchProductById(productId);

    if (searchProduct.length == 0) {
      console.log("Product not found.-----ORDER_CONTROLLER");
      return res.status(404).send({
        message: "Product not found.",
      });
    }

    /*
    const sqlRepeat = `SELECT id FROM orders WHERE productId= ${productId} AND status=${1}`;
    const orderRepeat = await queryExecutor(sqlRepeat);

    if (orderRepeat.length > 0) {
      console.log(
        "If you want to increase the number of items of the product, then update your order.-----ORDER_CONTROLLER"
      );
      return res.status(400).send({
        message:
          "If you want to increase the number of items of the product, then update your order.",
      });
    }
    */

    const {
      productQuantity,
      addressId,
      orderCiy,
      orderState,
      orderPinCode,
      orderAddressPhoneNumber,
      orderAddressName,
    } = data;

    const orderDetails = {
      userId: userId,
      productId: productId,
      productType: searchProduct[0].productType,
      productName: searchProduct[0].productName,
      productPrice: searchProduct[0].productPrice,
      productImage: searchProduct[0].productImage,
      productQuantity: productQuantity,
      totalPrice: productQuantity * searchProduct[0].productPrice,
      purchasingPerson: searchId[0].Name,
    };

    if (addressId) {
      console.log(
        "AddresId and its type------ORDER_CONTROLLER",
        addressId,
        typeof addressId
      );
      //   const sql = `SELECT * FROM addresses WHERE id=${addressId} AND status=true`;
      //   const searchAddres = await queryExecutor(sql);

      const searchAddres = await searchAddressByAddressId(addressId);
      console.log(
        "Address from the given addressId------ORDER_CONTROLLER",
        searchAddres
      );
      if (searchAddres.length == 0) {
        console.log("Address not found.------ORDER_CONTROLLER");
        return res.status(404).send({
          message: "Address not found.",
        });
      }
      console.log(
        "userIds------ORDER_CONTROLLER",
        searchAddres[0].userId,
        userId
      );

      if (searchAddres[0].userId !== Number(userId)) {
        console.log(
          "This address does not belongs to this User.------ORDER_CONTROLLER"
        );
        return res.status(400).send({
          message: "This address does not belongs to this User.",
        });
      }
      orderDetails.city = searchAddres[0].city;
      orderDetails.state = searchAddres[0].state;
      orderDetails.pinCode = searchAddres[0].pinCode;
      orderDetails.addressName = searchAddres[0].addressName;
      orderDetails.addressPhoneNumber = searchAddres[0].addressPhoneNumber;
      //   const totalPrice = searchProduct[0].productPrice * productQuantity;

      const sqlOrder = `INSERT INTO orders(userId, productId, productType, productName, productPrice, productImage, productQuantity, totalPrice, orderCity, orderState, orderPinCode, orderAddressPhoneNumber, orderAddressName, purchasingPerson, status, orderDate) VALUES(${
        orderDetails.userId
      }, ${orderDetails.productId}, '${orderDetails.productType}', '${
        orderDetails.productName
      }', '${orderDetails.productPrice}', '${orderDetails.productImage}', ${
        orderDetails.productQuantity
      }, ${orderDetails.totalPrice}, '${orderDetails.city}', '${
        orderDetails.state
      }', '${orderDetails.pinCode}', '${orderDetails.addressPhoneNumber}', '${
        orderDetails.addressName
      }', '${orderDetails.purchasingPerson}', ${1}, now()+1)`;

      await queryExecutor(sqlOrder);

      console.log("Order Placed.------ORDER_CONTROLLER", orderDetails);
      return res.status(201).send({
        message: "Order Placed.",
        orderDetails: orderDetails,
      });
    } else {
      orderDetails.city = orderCiy;
      orderDetails.state = orderState;
      orderDetails.pinCode = orderPinCode;
      orderDetails.addressName = orderAddressName;
      orderDetails.addressPhoneNumber = orderAddressPhoneNumber;

      const sqlOrder = `INSERT INTO orders(userId, productId, productType, productName, productPrice, productImage, productQuantity, totalPrice, orderCity, orderState, orderPinCode, orderAddressPhoneNumber, orderAddressName, purchasingPerson, status, orderDate) VALUES(${
        orderDetails.userId
      }, ${orderDetails.productId}, '${orderDetails.productType}', '${
        orderDetails.productName
      }', '${orderDetails.productPrice}', '${orderDetails.productImage}', ${
        orderDetails.productQuantity
      }, ${orderDetails.totalPrice}, '${orderDetails.city}', '${
        orderDetails.state
      }', '${orderDetails.pinCode}', '${orderDetails.addressPhoneNumber}', '${
        orderDetails.addressName
      }', '${orderDetails.purchasingPerson}', ${1}, now()+1)`;

      await queryExecutor(sqlOrder);

      console.log("Order Placed.------ORDER_CONTROLLER", orderDetails);
      return res.status(201).send({
        message: "Order Placed.",
        orderDetails: orderDetails,
      });
    }
  } catch (err) {
    console.log("Error is here.------ORDER_CONTROLLER", err);
    return res.status(500).send({
      message: "Error",
      Error: err,
    });
  }
};

const getOrderInfo = async (req, res) => {
  try {
    const userId = req.params.id;
    const orderId = req.params.orderId;

    const searchId = await searchUserById(userId);
    if (searchId.length == 0) {
      console.log("User does not exist.------ORDER_CONTROLLER");
      return res.status(404).send({
        message: "User not found.",
      });
    }

    const searchOrder = await searchOrderById(orderId);
    if (searchOrder.length == 0) {
      console.log("Order does not exist.------ORDER_CONTROLLER");
      return res.status(404).send({
        message: "Order not found.",
      });
    }

    if (searchOrder[0].userId !== Number(userId)) {
      console.log("Order does not belongs to this user.------ORDER_CONTROLLER");
      return res.status(400).send({
        message: "Order does not belongs to this user.",
      });
    }

    const url = `SELECT * FROM orders WHERE id=${orderId} AND userId=${userId}`;
    const searchOrderInfo = await queryExecutor(url);

    if (searchOrderInfo[0].status == 1) {
      searchOrderInfo[0].status = "Active";
    } else if (searchOrderInfo[0].status == 2) {
      searchOrderInfo[0].status = "Delivered";
    } else if (searchOrderInfo[0].status == 3) {
      searchOrderInfo[0].status = "Cancelled";
    }

    return res.status(200).send({
      message: "The order is active.",
      orderInfo: searchOrderInfo,
    });
  } catch (err) {
    console.log("Error is here.------ORDER_CONTROLLER");
    return res.status(500).send({
      message: "Error",
      Error: err,
    });
  }
};

const updateOrderDetails = async (req, res) => {
  try {
    const userId = req.params.id;
    const orderId = req.params.orderId;
    const data = req.body;

    const searchId = await searchUserById(userId);
    if (searchId.length == 0) {
      console.log("User does not exist.------ORDER_CONTROLLER");
      return res.status(404).send({
        message: "User not found.",
      });
    }

    const searchOrder = await searchOrderById(orderId);
    if (searchOrder.length == 0) {
      console.log("Order does not exist.------ORDER_CONTROLLER");
      return res.status(404).send({
        message: "Order not found.",
      });
    }

    if (searchOrder[0].userId !== Number(userId)) {
      console.log("Order does not belongs to this user.------ORDER_CONTROLLER");
      return res.status(400).send({
        message: "Order does not belongs to this user.",
      });
    }

    if (searchOrder[0].status != 1) {
      console.log(
        "Order can only be updated when the order is active.------ORDER_CONTROLLER"
      );
      return res.status(400).send({
        message: "Order can only be updated when the order is active.",
      });
    }

    const {
      productQuantity,
      orderCiy,
      orderState,
      orderPinCode,
      orderAddressPhoneNumber,
      orderAddressName,
    } = data;

    const newTotalPrice =
      (productQuantity ? productQuantity : searchOrder[0].productQuantity) *
      searchOrder[0].productPrice;

    const updateOrder = {
      productQuantity: productQuantity
        ? productQuantity
        : searchOrder[0].productQuantity,
      orderCiy: orderCiy ? orderCiy : searchOrder[0].orderCiy,
      orderState: orderState ? orderState : searchOrder[0].orderState,
      orderPinCode: orderPinCode ? orderPinCode : searchOrder[0].orderPinCode,
      orderAddressName: orderAddressName
        ? orderAddressName
        : searchOrder[0].orderAddressName,
      orderAddressPhoneNumber: orderAddressPhoneNumber
        ? orderAddressPhoneNumber
        : searchOrder[0].orderAddressPhoneNumber,
      totalPrice: newTotalPrice,
    };

    const sql = `UPDATE orders SET productQuantity=${updateOrder.productQuantity}, orderCity='${updateOrder.orderCiy}', orderState='${updateOrder.orderState}', orderPinCode='${updateOrder.orderPinCode}', orderAddressName='${updateOrder.orderAddressName}', orderAddressPhoneNumber=${updateOrder.orderAddressPhoneNumber}, totalPrice=${updateOrder.totalPrice}, updated_on= now()+1 WHERE id=${orderId} AND userId=${userId}`;

    await queryExecutor(sql);
    console.log("Order updated successfully------ORDER_CONTROLLER");

    return res.status(200).send({
      message: "Order updated successfully.",
    });

    // if (addressId) {
    //   const searchAddress = await searchAddressByAddressId(addressId);

    //   if (searchAddress.length == 0) {
    //     console.log("Address not found------ORDER_CONTROLLER");
    //     return res.status(404).send({
    //       message: "Address not found.",
    //     });
    //   } else {
    //     updateOrder.city = searchAddress[0].city;
    //     updateOrder.state = searchAddress[0].state;
    //     updateOrder.pinCode = searchAddress[0].pinCode;
    //     updateOrder.addressName = searchAddress[0].addressName;
    //     updateOrder.addressPhoneNumber = searchAddress[0].addressPhoneNumber;
    //     updateOrder.totalPrice = productQuantity * searchOrder[0].productPrice;
    //   }
    // }
  } catch (err) {
    console.log("Error is here.------ORDER_CONTROLLER", err);
    return res.status(500).send({
      message: "Error",
      Error: err,
    });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const userId = req.params.id;
    const orderId = req.params.orderId;

    const searchId = await searchUserById(userId);
    if (searchId.length == 0) {
      console.log("User does not exist.------ORDER_CONTROLLER");
      return res.status(404).send({
        message: "User not found.",
      });
    }

    const searchOrder = await searchOrderById(orderId);
    if (searchOrder.length == 0) {
      console.log("Order does not exist.------ORDER_CONTROLLER");
      return res.status(404).send({
        message: "Order not found.",
      });
    }

    if (searchOrder[0].userId !== Number(userId)) {
      console.log("Order does not belongs to this user.------ORDER_CONTROLLER");
      return res.status(400).send({
        message: "Order does not belongs to this user.",
      });
    }

    if (searchOrder[0].status != 1) {
      console.log(
        "Order can only be cancelled when the order is active.------ORDER_CONTROLLER"
      );
      return res.status(400).send({
        message: "Order can only be cancelled when the order is active.",
      });
    }

    const sql = `UPDATE orders SET status=3 WHERE id=${orderId} AND userId=${userId}`;
    await queryExecutor(sql);
    console.log("Order cancelled.------ORDER_CONTROLLER");
    return res.status(200).send({
      message: "Order Cancelled.",
    });
  } catch (err) {
    console.log("Error is here.------ORDER_CONTROLLER", err);
    return res.status(500).send({
      message: "Error",
      Error: err,
    });
  }
};

const orderDelivered = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    const searchOrder = await searchOrderById(orderId);

    if (searchOrder.length == 0) {
      console.log("Order does not exist------ORDER_CONTROLLER");
      return res.status(404).send({
        message: "Order does not exist.",
      });
    } else if (searchOrder[0].status == 3) {
      console.log("Cancelled order cannot be delivered------ORDER_CONTROLLER");
      return res.status(400).send({
        message: "Cancelled order cannot be delivered.",
      });
    } else if (searchOrder[0].status == 2) {
      console.log("Order has already been delivered------ORDER_CONTROLLER");
      return res.status(400).send({
        message: "Order has already been delivered.",
      });
    } else {
      const sql = `UPDATE orders SET status=2, delieveryDate=now()+1 WHERE id=${orderId}`;
      await queryExecutor(sql);

      console.log("Order Delivered successfully.------ORDER_CONTROLLER");

      return res.status(200).send({
        message: "Order Delivered successfully.",
      });
    }
  } catch (err) {
    console.log("Error is here.------ORDER_CONTROLLER", err);
    return res.status(500).send({
      message: "Error",
      Error: err,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const userId = req.params.id;

    const searchId = await searchUserById(userId);
    if (searchId.length == 0) {
      console.log("User does not exist.------ORDER_CONTROLLER");
      return res.status(404).send({
        message: "User not found.",
      });
    }

    const sql = `SELECT * FROM orders WHERE userId=${userId}`;
    const allOrders = await queryExecutor(sql);

    if (allOrders.length == 0) {
      console.log("No orders to show------ORDER_CONTROLLER");
      return res.status(200).send({
        message: "No order to show.",
      });
    }

    const ordersArr = [];

    allOrders.forEach((order) => {
      let status = "";
      if (order.status == 1) {
        status = "Active";
      } else if (order.status == 2) {
        status = "Delivered";
      } else if (order.status == 3) {
        status = "Cancelled";
      }
      const temp = {
        orderId: order.id,
        productId: order.productId,
        productType: order.productType,
        productName: order.productName,
        productPrice: order.productPrice,
        productImage: order.productImage,
        productQuantity: order.productQuantity,
        totalPrice: order.totalPrice,
        orderCity: order.orderCity,
        orderState: order.orderState,
        orderPinCode: order.orderPinCode,
        orderAddressPhoneNumber: order.orderAddressPhoneNumber,
        orderAddressName: order.orderAddressName,
        orderDate: order.orderDate,
        delieveryDate: order.delieveryDate == null ? "" : order.delieveryDate,
        status: status,
      };
      ordersArr.push(temp);
    });

    console.log("Here are the orders------ORDER_CONTROLLER", ordersArr);
    return res.status(200).send({
      message: "All orders.",
      Orders: ordersArr,
    });
  } catch (err) {
    console.log("Error is here.------ORDER_CONTROLLER", err);
    return res.status(500).send({
      message: "Error",
      Error: err,
    });
  }
};

module.exports = {
  orderProduct,
  getOrderInfo,
  updateOrderDetails,
  cancelOrder,
  orderDelivered,
  getAllOrders,
};
