const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { queryExecutor } = require("../utils/common");
const { CONSTANT_VARIABLES } = require("../config/config");
const { all } = require("../routes/Routes");

//searchUserById checks does this ID given in params exist in database or not.
const searchUserById = async (id) => {
  try {
    // console.log("ID from searchUserById function----WishListController", id);

    const sql = `SELECT * FROM user WHERE id=${id} AND status= true`;
    const searchData = await queryExecutor(sql);
    // console.log(
    //   "searchData from searchUserById function----WishListController",
    //   searchData
    // );
    return searchData;
  } catch (err) {
    console.log("Error is here----WishListController", err);
  }
};

//searchProductById checks does this Product given in params exist in database or not.
const searchProductById = async (id) => {
  try {
    console.log(
      "Searching for product by Id using searchProductById function.----WISHLIST_CONTROLLER"
    );

    const sql = `SELECT * FROM products WHERE id=${id} AND status= true`;
    const searchData = await queryExecutor(sql);

    console.log(
      "Here is the product from searchProductById.----WISHLIST_CONTROLLER",
      searchData
    );
    return searchData;
  } catch (err) {
    console.log("Error is here----WISHLIST_CONTROLLER", err);
  }
};

// ===================================Logics===================================

const changeStatusOfProductInWishlist = async (req, res) => {
  try {
    const userId = req.params.id;
    const productId = req.params.productId;

    const searchId = await searchUserById(userId);

    if (searchId.length == 0) {
      console.log("User not found.-----WISHLIST_CONTROLLER");
      return res.status(404).send({
        message: "User not found.",
      });
    }

    const searchProduct = await searchProductById(productId);

    if (searchProduct.length == 0) {
      console.log("Product not found.-----WISHLIST_CONTROLLER");
      return res.status(404).send({
        message: "Product not found.",
      });
    }

    const sql = `SELECT id FROM wishlist WHERE userId=${userId} AND productId=${productId}`;
    let isProductExist = await queryExecutor(sql);
    console.log("Here is the Id-----WISHLIST_CONTROLLER", isProductExist);

    if (isProductExist.length > 0) {
      isProductExist = isProductExist[0].id;
      const sql1 = `DELETE FROM  wishlist WHERE id=${isProductExist}`;
      await queryExecutor(sql1);
      console.log(
        "Product is been removed from the wishList.-----WISHLIST_CONTROLLER"
      );
    } else {
      const sql1 = `INSERT INTO wishlist (userId, productId, created_on) VALUES(${userId}, ${productId}, now()+1)`;
      await queryExecutor(sql1);
      console.log("Product added in the wishList.-----WISHLIST_CONTROLLER");
    }

    return res.status(200).send({
      message: "OK",
    });
  } catch (err) {
    console.log("Error is here-----WISHLIST_CONTROLLER", err);
    return res.status(500).send({
      message: "Error.",
      Error: err,
    });
  }
};

const getAllProductsOfuserFromWishList = async (req, res) => {
  try {
    const userId = req.params.id;

    const searchId = await searchUserById(userId);

    if (searchId.length == 0) {
      console.log("User not found.-----WISHLIST_CONTROLLER");
      return res.status(404).send({
        message: "User not found.",
      });
    }

    const sql = `SELECT * FROM wishlist WHERE userId=${userId}`;
    const allProducts = await queryExecutor(sql);

    const productArr = [];
    // if (allProducts.length > 0) {
    //   const len = allProducts.length;
    //   new Promise((resolve, reject) => {
    //     allProducts.forEach(async (val, i) => {
    //       const sqlProduct = `SELECT id, productType, productName, productPrice, productDetails, productImage FROM products WHERE id=${val.productId}`;
    //       const product = await queryExecutor(sqlProduct);
    //       console.log(
    //         "Product from newPromise-----WISHLIST_CONTROLLER",
    //         product,
    //         i
    //       );
    //       productArr.push(product[0]);
    //       if (i == len - 1) {
    //         resolve();
    //       }
    //     });
    //   }).then(() => {
    //     console.log(
    //       "Here is the final product-----WISHLIST_CONTROLLER",
    //       productArr
    //     );
    //     return res.status(200).send({
    //       message: "Products you wished for.",
    //       products: productArr,
    //     });
    //   });

    //   //   console.log(
    //   //     "Here is the final product-----WISHLIST_CONTROLLER",
    //   //     productArr
    //   //   );
    //   //   return res.status(200).send({
    //   //     message: "Products you wished for.",
    //   //     products: productArr,
    //   //   });
    // }
    if (allProducts.length > 0) {
      for (const val of allProducts) {
        const sqlProduct = `SELECT id, productType, productName, productPrice, productDetails, productImage FROM products WHERE id=${val.productId}`;
        const product = await queryExecutor(sqlProduct);
        console.log("Product from newPromise-----WISHLIST_CONTROLLER", product);
        productArr.push(product[0]);
      }
      console.log(
        "Here are the products which you added in your wishlist.-----WISHLIST_CONTROLLER"
      );
      return res.status(200).send({
        message: "Products you wished for.",
        products: productArr,
      });
    } else {
      console.log(
        "Sorry no products are in the wishlist.-----WISHLIST_CONTROLLER"
      );
      return res.status(200).send({
        message: "Sorry no products are in the wishlist.",
        products: productArr,
      });
    }
  } catch (err) {
    console.log("Error is here-----WISHLIST_CONTROLLER", err);
    return res.status(500).send({
      message: "Error.",
      Error: err,
    });
  }
};

module.exports = {
  changeStatusOfProductInWishlist,
  getAllProductsOfuserFromWishList,
};
