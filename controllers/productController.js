const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { queryExecutor } = require("../utils/common");
const { CONSTANT_VARIABLES } = require("../config/config");

//This function will search for exact same product name.
const searchProductByName = async (value) => {
  try {
    console.log(
      "Searching the Product by searchProductByName function-----PRODUCT_CONTROLLER",
      value
    );

    const sql = `SELECT * FROM products WHERE productName='${value}' AND status=true`;
    const searchProduct = await queryExecutor(sql);

    console.log("Product is here..-----PRODUCT_CONTROLLER", searchProduct);
    return searchProduct;
  } catch (err) {
    console.log("Error is here----PRODUCT_CONTROLLER", err);
  }
};

//This function will seach for exact same product type.
const searchProductByType = async (value) => {
  try {
    console.log(
      "Searching the Product by searchProductByType function-----PRODUCT_CONTROLLER",
      value
    );

    const sql = `SELECT * FROM products WHERE productType='${value}' AND status=true`;
    const searchProduct = await queryExecutor(sql);

    console.log("Product is here..-----PRODUCT_CONTROLLER", searchProduct);
    return searchProduct;
  } catch (err) {
    console.log("Error is here----PRODUCT_CONTROLLER", err);
  }
};

const searchProductById = async (id) => {
  try {
    console.log(
      "Searching for product by Id using searchProductById function.----PRODUCT_CONTROLLER"
    );

    const sql = `SELECT * FROM products WHERE id=${id} AND status= true`;
    const searchData = await queryExecutor(sql);

    console.log("Here is the product.----PRODUCT_CONTROLLER", searchData);
    return searchData;
  } catch (err) {
    console.log("Error is here----PRODUCT_CONTROLLER", err);
  }
};

// ===================================Logics===================================

const createProduct = async (req, res) => {
  try {
    const data = req.body;

    const productImage = data.productImage ? data.productImage : null;
    const { productName, productType, productPrice, productDetails } = data;

    const searchName = await searchProductByName(productName);
    if (searchName.length > 0) {
      console.log(
        "Product with this Name is here.-----PRODUCT_CONTROLLER",
        searchName
      );
      return res.status(400).send({
        message: "Product with this Name already exist.",
      });
    }

    // const searchType = await searchProductByType(productType);
    // if (searchType.length > 0) {
    //   console.log(
    //     "Product with this Type is here.-----PRODUCT_CONTROLLER",
    //     searchType
    //   );
    //   return res.status(400).send({
    //     message: "Product with this Type already exist.",
    //     Product: searchType,
    //   });
    // }

    const sql = `INSERT INTO products (productType, productName, productPrice, productDetails, productImage) VALUES ('${productType}','${productName}', '${productPrice}', '${productDetails}', '${productImage}')`;

    await queryExecutor(sql);
    console.log("Product created successfully.-----PRODUCT_CONTROLLER", data);
    return res.status(201).send({
      message: "Product Created successfully.",
      Product: data,
    });
  } catch (err) {
    console.log("Error is here.-----PRODUCT_CONTROLLER", err);
    return res.status(500).send({
      message: "Error.",
      error: err,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const sql = `SELECT * FROM products WHERE status= true`;
    const allProducts = await queryExecutor(sql);

    console.log("All products are out!!-----PRODUCT_CONTROLLER", allProducts);
    return res.status(200).send({
      message: "All products are out.",
      Product: allProducts,
    });
  } catch (err) {
    console.log("Error is here.-----PRODUCT_CONTROLLER", err);
    return res.status(500).send({
      message: "Error.",
      error: err,
    });
  }
};

const getProductsByName = async (req, res) => {
  try {
    const name = req.body.productName;
    if (name === null || name === undefined || name.length < 1) {
      console.log("Enter the Name of the product-----PRODUCT_CONTROLLER");
      return res.status(400).send({
        message: "Enter the Name of the product.",
      });
    }
    const sql = `SELECT * FROM products WHERE productName LIKE '%${name}%' AND status=true`;

    const searchName = await queryExecutor(sql);

    if (searchName.length > 0) {
      console.log("Here is the product-----PRODUCT_CONTROLLER", searchName);
      return res.status(200).send({
        message: "Here is the product.",
        Product: searchName,
      });
    } else {
      console.log("Sorry no product found with this Name.");
      return res.status(404).send({
        message: "Sorry no product found!",
      });
    }
  } catch (err) {
    console.log("Error is here.-----PRODUCT_CONTROLLER", err);
    return res.status(500).send({
      message: "Error.",
      error: err,
    });
  }
};

//Type => Categories
const getProductsByType = async (req, res) => {
  try {
    const type = req.body.productType;
    if (type === null || type === undefined || type.length < 1) {
      console.log("Enter the Type of the product-----PRODUCT_CONTROLLER");
      return res.status(400).send({
        message: "Enter the Type of the product.",
      });
    }
    const sql = `SELECT * FROM products WHERE productType LIKE '%${type}%' AND status=true`;

    const searchType = await queryExecutor(sql);

    if (searchType.length > 0) {
      console.log("Here is the product-----PRODUCT_CONTROLLER", searchType);
      return res.status(200).send({
        message: "Here are the products.",
        Product: searchType,
      });
    } else {
      console.log("Sorry no product found with this Type.");
      return res.status(404).send({
        message: "Sorry no product found!",
      });
    }
  } catch (err) {
    console.log("Error is here.-----PRODUCT_CONTROLLER", err);
    return res.status(500).send({
      message: "Error.",
      error: err,
    });
  }
};

const getProductsByNameorType = async (req, res) => {
  try {
    const name = req.params.productName;
    if (name === null || name === undefined || name.length < 1) {
      console.log("Enter the Name of the product-----PRODUCT_CONTROLLER");
      return res.status(400).send({
        message: "Enter the Name of the product.",
      });
    }
    const sql = `SELECT * FROM products WHERE productName LIKE '%${name}%' or productType LIKE '%${name}%'AND status=true`;

    const searchProd = await queryExecutor(sql);

    if (searchProd.length > 0) {
      console.log("Here is the product-----PRODUCT_CONTROLLER", searchProd);
      return res.status(200).send({
        message: "Here is the product.",
        Product: searchProd,
      });
    } else {
      console.log("Sorry no product found with this Name.");
      return res.status(404).send({
        message: "Sorry no product found!",
      });
    }
  } catch (err) {
    console.log("Error is here.-----PRODUCT_CONTROLLER", err);
    return res.status(500).send({
      message: "Error.",
      error: err,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.productId;

    const searchId = await searchProductById(productId);

    if (searchId.length == 0) {
      console.log("No product found.-----PRODUCT_CONTROLLER");
      return res.status(404).send({
        message: "No product found.",
      });
    }
    console.log("HEre is the product-----PRODUCT_CONTROLLER", searchId);

    // const productToShow = {
    //   productType: searchId[0].productType,
    //   productName: searchId[0].productName,
    //   productPrice: searchId[0].productPrice,
    //   productDetails: searchId[0].productDetails,
    //   productImage: searchId[0].productImage,
    // };
    // console.log("Here is the product", productToShow);
    return res.status(200).send({
      message: "Product",
      product: searchId,
    });
  } catch (err) {
    console.log("Error is here.-----PRODUCT_CONTROLLER", err);
    return res.status(500).send({
      message: "Error.",
      error: err,
    });
  }
};

const updateProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const data = req.body;

    const searchId = await searchProductById(productId);

    if (searchId.length == 0) {
      console.log("No product found.-----PRODUCT_CONTROLLER");
      return res.status(404).send({
        message: "No product found.",
      });
    }

    const {
      productName,
      productType,
      productPrice,
      productDetails,
      productImage,
    } = data;

    const updateData = {
      productName: productName ? productName : searchId[0].productName,
      productType: productType ? productType : searchId[0].productType,
      productPrice: productPrice ? productPrice : searchId[0].productPrice,
      productDetails: productDetails
        ? productDetails
        : searchId[0].productDetails,
      productImage: productImage ? productImage : searchId[0].productImage,
    };

    const sql = `UPDATE products SET productName='${updateData.productName}', productType='${updateData.productType}', productPrice='${updateData.productPrice}', productDetails='${updateData.productDetails}', productImage='${updateData.productImage}' WHERE id=${productId}`;
    await queryExecutor(sql);

    console.log("Product updated successfully.-----PRODUCT_CONTROLLER");
    return res.status(200).send({
      message: "Product updated successfully.",
      Product: updateData,
    });
  } catch (err) {
    console.log("Error is here.-----PRODUCT_CONTROLLER", err);
    return res.status(500).send({
      message: "Error.",
      error: err,
    });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const productId = req.params.productId;

    const searchId = await searchProductById(productId);

    if (searchId.length == 0) {
      console.log("No product found.-----PRODUCT_CONTROLLER");
      return res.status(404).send({
        message: "No product found.",
      });
    }

    const sql = `UPDATE products SET status= false WHERE id=${productId}`;
    await queryExecutor(sql);

    console.log("Product deleted successfully.----PRODUCT_CONTROLLER");
    return res.status(200).send({
      message: "Product deleted successfully.",
    });
  } catch (err) {
    console.log("Error is here.-----PRODUCT_CONTROLLER", err);
    return res.status(500).send({
      message: "Error.",
      error: err,
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductsByName,
  getProductsByType,
  getProductsByNameorType,
  getProductById,
  updateProductById,
  deleteProductById,
};
