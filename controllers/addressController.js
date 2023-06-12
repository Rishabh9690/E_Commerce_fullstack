const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { queryExecutor } = require("../utils/common");
const { CONSTANT_VARIABLES } = require("../config/config");

//searchUserById checks does this ID given in params exist in database or not.
const searchUserById = async (id) => {
  try {
    console.log("ID from searchUserById function----addressController", id);

    const sql = `SELECT * FROM user WHERE id=${id} AND status= true`;
    const searchData = await queryExecutor(sql);
    console.log(
      "searchData from searchUserById function----addressController",
      searchData
    );
    return searchData;
  } catch (err) {
    console.log("Error is here----addressController", err);
  }
};

const searchAddressByAddressId = async (id) => {
  try {
    console.log(
      "ID from searchAddressByAddressId function----addressController",
      id
    );

    const sql = `SELECT * FROM addresses WHERE id=${id} AND status= true`;
    const searchData = await queryExecutor(sql);
    console.log(
      "searchData from searchUserById function----addressController",
      searchData
    );
    return searchData;
  } catch (err) {
    console.log("Error is here----addressController", err);
  }
};

// ===================================Logics===================================

const addAddress = async (req, res) => {
  try {
    const data = req.body;
    const userId = req.params.id;

    const searchData = await searchUserById(userId);
    console.log(
      "searchData from getUserById function----addressController",
      searchData
    );

    if (searchData.length == 0) {
      console.log("Id not found in the database!----addressController");
      return res.status(404).send({
        message: "User not found!",
      });
    }

    const { city, state, pinCode, addressName, addressPhoneNumber } = data;

    const sql = `INSERT INTO addresses(city, state, pinCode, addressName, addressPhoneNumber, userId) VALUES('${city}', '${state}', '${pinCode}', '${addressName}', '${addressPhoneNumber}', ${userId})`;
    await queryExecutor(sql);

    console.log("Address addes successfully.----addressController");
    return res.status(201).send({
      message: "Address added successfully.",
      Address: data,
    });
  } catch (err) {
    console.log("Error is here----addressController", err);
    res.status(500).send({
      message: err,
    });
  }
};

const getAllAddressesById = async (req, res) => {
  try {
    const userId = req.params.id;

    const searchData = await searchUserById(userId);
    console.log(
      "searchUser from getAllAddressesById function----addressController",
      searchData
    );

    if (searchData.length == 0) {
      console.log("Id not found in the database!----addressController");
      return res.status(404).send({
        message: "User not found!",
      });
    }
    const allData = [];
    const sql = `SELECT * FROM addresses WHERE userId=${userId} AND status= true`;
    const allAddresses = await queryExecutor(sql);

    if (allAddresses.length == 0) {
      console.log("No addresses to show.----addressController");
      return res.status(200).send({
        message: "No address to show.",
      });
    }

    allAddresses.forEach((add) => {
      let temp = {
        id: add.id,
        Name: add.addressName,
        phoneNumber: add.addressPhoneNumber,
        city: add.city,
        state: add.state,
        pinCode: add.pinCode,
      };
      allData.push(temp);
    });

    console.log("allAddresses----addressController", allData);
    return res.status(200).send({
      Address: allData,
    });
  } catch (err) {
    console.log("Error is here----addressController", err);
    res.status(500).send({
      message: err,
    });
  }
};

const getAddressByAddressId = async (req, res) => {
  try {
    const userId = req.params.id;
    const addressId = req.params.addressId;
    console.log("==========", userId, addressId);

    const searchUser = await searchUserById(userId);
    console.log(
      "searchUser from getAllAddressesById function----addressController",
      searchUser
    );

    if (searchUser.length == 0) {
      console.log("Id not found in the database!----addressController");
      return res.status(404).send({
        message: "User not found!",
      });
    }

    const searchAddress = await searchAddressByAddressId(addressId);
    console.log(
      "searchAddress from getAllAddressesById function----addressController",
      searchAddress
    );

    if (searchAddress.length == 0) {
      console.log("Id not found in the database!----addressController");
      return res.status(404).send({
        message: "Address not found!",
      });
    }

    const url = `SELECT * FROM addresses WHERE userId=${userId} AND id=${addressId}`;
    console.log("Here is the url----addressController", url);
    const searchData = await queryExecutor(url);
    if (searchData.length == 0) {
      return res.status(404).send({
        message: "Address not found",
      });
    } else {
      return res.status(200).send({
        message: "Address.",
        Address: searchData,
      });
    }
  } catch (err) {
    console.log("Error is here----addressController", err);
    res.status(500).send({
      message: err,
    });
  }
};

const updateAddressById = async (req, res) => {
  try {
    const addressId = req.params.addressId;
    const userId = req.params.id;
    const data = req.body;

    const searchId = await searchUserById(userId);
    console.log(
      "searchId from updateAddressById function----addressController",
      searchId
    );
    if (searchId.length == 0) {
      console.log("Id not found in the database!----addressController");
      return res.status(404).send({
        message: "User not found!",
      });
    }

    const searchAddressId = await searchAddressByAddressId(addressId);
    console.log(
      "searchAddressId from updateAddressById function----addressController",
      searchAddressId
    );
    if (searchAddressId.length == 0) {
      console.log("Address not found in the database!----addressController");
      return res.status(404).send({
        message: "Address not found!",
      });
    }

    if (searchId[0].id !== searchAddressId[0].userId) {
      console.log(
        "User and the Address are not of same person.----addressController"
      );
      return res.status(400).send({
        message: "User and the Address are not of same person.",
      });
    }

    const { city, state, pinCode, addressPhoneNumber, addressName } = data;

    const updateData = {};
    updateData.city = city ? city : searchAddressId[0].city;
    updateData.state = state ? state : searchAddressId[0].state;
    updateData.pinCode = pinCode ? pinCode : searchAddressId[0].pinCode;
    updateData.addressPhoneNumber = addressPhoneNumber
      ? addressPhoneNumber
      : searchAddressId[0].addressPhoneNumber;
    updateData.addressName = addressName
      ? addressName
      : searchAddressId[0].addressName;

    console.log("newAddress----addressController", updateData);
    const sql = `UPDATE addresses SET city='${updateData.city}', state='${updateData.state}', pinCode='${updateData.pinCode}', addressPhoneNumber='${updateData.addressPhoneNumber}', addressName='${updateData.addressName}' WHERE id=${addressId}`;

    await queryExecutor(sql);
    console.log("updateData----addressController", updateData);
    return res.status(200).send({
      message: "Address updated successfully.",
      newAddress: updateData,
    });
  } catch (err) {
    console.log("Error is here----addressController", err);
    res.status(500).send({
      message: err,
    });
  }
};

const deleteAddressById = async (req, res) => {
  try {
    const addressId = req.params.addressId;
    const userId = req.params.id;

    const searchId = await searchUserById(userId);
    console.log(
      "searchId from updateAddressById function----addressController",
      searchId
    );
    if (searchId.length == 0) {
      console.log("Id not found in the database!----addressController");
      return res.status(404).send({
        message: "User not found!",
      });
    }

    const searchAddressId = await searchAddressByAddressId(addressId);
    console.log(
      "searchAddressId from updateAddressById function----addressController",
      searchAddressId
    );
    if (searchAddressId.length == 0) {
      console.log("Address not found in the database!----addressController");
      return res.status(404).send({
        message: "Address not found!",
      });
    }

    if (searchId[0].id !== searchAddressId[0].userId) {
      console.log(
        "User and the Address are not of same person.----addressController"
      );
      return res.status(400).send({
        message: "User and the Address are not of same person.",
      });
    }

    const sql = `UPDATE addresses SET status=false WHERE id=${addressId}`;
    await queryExecutor(sql);

    console.log("Address deleted succussfully.----addressController");
    return res.status(200).send({
      message: "Address deleted succussfully.",
    });
  } catch (err) {
    console.log("Error is here----addressController", err);
    res.status(500).send({
      message: err,
    });
  }
};

module.exports = {
  addAddress,
  getAllAddressesById,
  getAddressByAddressId,
  updateAddressById,
  deleteAddressById,
};
