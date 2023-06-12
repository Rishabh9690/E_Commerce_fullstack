const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { queryExecutor } = require("../utils/common");
const { CONSTANT_VARIABLES } = require("../config/config");

//searchUserById checks does this ID given in params exist in database or not.
const searchUserById = async (id) => {
  try {
    console.log("ID from searchUserById function----CartController", id);

    const sql = `SELECT * FROM user WHERE id=${id} AND status= true`;
    const searchData = await queryExecutor(sql);
    console.log(
      "searchData from searchUserById function----CartController",
      searchData
    );
    return searchData;
  } catch (err) {
    console.log("Error is here----CartController", err);
  }
};

//searchProductById checks does this Product given in params exist in database or not.
const searchProductById = async (id) => {
  try {
    // console.log(
    //   "Searching for product by Id using searchProductById function.----CartController"
    // );

    const sql = `SELECT * FROM products WHERE id=${id} AND status= true`;
    const searchData = await queryExecutor(sql);

    console.log(
      "Here is the product from searchProductById.----CartController",
      searchData
    );
    return searchData;
  } catch (err) {
    console.log("Error is here----CartController", err);
  }
};

// ===================================Logics===================================

const addToCart = async (req, res) => {
  try {
    const userId = req.params.id;
    const productId = req.params.productId;

    const searchId = await searchUserById(userId);

    if (searchId.length == 0) {
      console.log("User not found.-----CART_CONTROLLER");
      return res.status(404).send({
        message: "User not found.",
      });
    }

    const searchProduct = await searchProductById(productId);

    if (searchProduct.length == 0) {
      console.log("Product not found.-----CART_CONTROLLER");
      return res.status(404).send({
        message: "Product not found.",
      });
    }

    const sql = `SELECT id,quantity FROM cart WHERE userId=${userId} AND productId=${productId}`;
    const productExist = await queryExecutor(sql);

    if (productExist.length > 0) {
      //When the product is already added in the cart, then it will show the optionto see all products in the cart. It will not change the qunatity of the product.
      console.log("This product is already in the cart.----CART_CONTROLLER");
      return res.status(200).send({
        message: "This product is already in the cart.",
      });
    }

    const sql1 = `INSERT INTO cart (userId, productId, created_on) VALUES(${userId}, ${productId}, now()+1)`;
    await queryExecutor(sql1);
    console.log("Product added to the cart.----CART_CONTROLLER");
    return res.status(201).send({
      message: "Product has been added to the cart.",
    });
  } catch (err) {
    console.log("The error is here----CART_CONTROLLER", err);
    return res.status(500).send({
      message: "Error.",
      Error: err,
    });
  }
};

const getAllProductsFromCart = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      console.log("Enter the userId-----CART_CONTROLLER");
      return res.status(400).send({
        message: "Enter the userId",
      });
    }

    const searchId = await searchUserById(userId);

    if (searchId.length == 0) {
      console.log("User not found.-----CART_CONTROLLER");
      return res.status(404).send({
        message: "User not found.",
      });
    }

    const sql = `SELECT productId, quantity FROM cart WHERE userId=${userId}`;
    const allProducts = await queryExecutor(sql);

    const productArr = [];

    if (allProducts.length > 0) {
      for (const val of allProducts) {
        const sqlProduct = `SELECT id, productType, productName, productPrice, productDetails, productImage FROM products WHERE id=${val.productId}`;
        const product = await queryExecutor(sqlProduct);
        const temp = { ...product[0], Quantity: val.quantity };
        productArr.push(temp);
      }

      console.log("All products are----CART_CONTROLLER", productArr);
      return res.status(200).send({
        message: "Products in cart.",
        products: productArr,
      });
    }
  } catch (err) {
    console.log("The error is here----CART_CONTROLLER", err);
    return res.status(500).send({
      message: "Error.",
      Error: err,
    });
  }
};

// const getAllProductsFromCart = async (req, res) => {
//   try {
//     const userId = req.params.id;
//     if (!userId) {
//       console.log("Enter the userId-----CART_CONTROLLER");
//       return res.status(400).send({
//         message: "Enter the userId",
//       });
//     }

//     const searchId = await searchUserById(userId);

//     if (searchId.length == 0) {
//       console.log("User not found.-----CART_CONTROLLER");
//       return res.status(404).send({
//         message: "User not found.",
//       });
//     }

//     const sql = `SELECT productId, quantity FROM cart WHERE userId=${userId}`;
//     const allProducts = await queryExecutor(sql);

//     const productArr = [];

//     if (allProducts.length > 0) {
//       const len = allProducts.length;
//       new Promise((resolve, reject) => {
//         allProducts.forEach(async (val, i) => {
//           const sqlProduct = `SELECT id, productType, productName, productPrice, productDetails, productImage FROM products WHERE id=${val.productId}`;
//           const product = await queryExecutor(sqlProduct);
//           const temp = { ...product[0], Quantity: val.quantity };
//           //   productArr.push(product[0]);
//           productArr.push(temp);

//           if (i == len - 1) {
//             resolve();
//           }
//         });
//       }).then(() => {
//         console.log("All products are----CART_CONTROLLER", productArr);
//         return res.status(200).send({
//           message: "Products in cart.",
//           products: productArr,
//         });
//       });
//     }
//   } catch (err) {
//     console.log("The error is here----CART_CONTROLLER", err);
//     return res.status(500).send({
//       message: "Error.",
//       Error: err,
//     });
//   }
// };

const getSingleProductFromCart = async (req, res) => {
  try {
    const userId = req.params.id;
    const productId = req.params.productId;
    let bool = false;

    if (!userId) {
      console.log("Enter the userId-----CART_CONTROLLER");
      return res.status(400).send({
        message: "Enter the userId",
      });
    }

    const searchId = await searchUserById(userId);

    if (searchId.length == 0) {
      console.log("User not found.-----CART_CONTROLLER");
      return res.status(404).send({
        message: "User not found.",
      });
    }

    if (!productId) {
      console.log("Enter the productId-----CART_CONTROLLER");
      return res.status(400).send({
        message: "Enter the productId",
      });
    }

    const searchProduct = await searchProductById(productId);

    if (searchProduct.length == 0) {
      console.log("Product not found.-----CART_CONTROLLER");
      return res.status(404).send({
        message: "Product not found.",
      });
    }

    // const url = `SELECT id, quantity FROM cart WHERE userId=${userId} AND productId=${productId}`;
    const url = `select cart.productId, cart.userId, cart.quantity, products.productType, products.productName, products.productPrice, products.productDetails, products.productImage from cart, products where cart.productId= products.id and cart.userId=${userId} and cart.productId=${productId};`;
    const searchWishProd = await queryExecutor(url);

    console.log("Here.-----CART_CONTROLLER", searchWishProd);

    if (searchWishProd.length > 0) {
      bool = true;
      return res.status(200).send({
        message: "Product is present.",
        info: searchWishProd,
        bool: bool,
      });
    } else {
      return res.status(200).send({
        message: "Product is not present.",
        info: searchWishProd,
        bool: bool,
      });
    }
  } catch (err) {
    console.log("The error is here----CART_CONTROLLER", err);
    return res.status(500).send({
      message: "Error.",
      Error: err,
    });
  }
};

const increaseQuantityOfProductIncartBy1 = async (req, res) => {
  try {
    const userId = req.params.id;
    const productId = req.params.productId;
    if (!userId || !productId) {
      console.log("Enter the userId and productId-----CASTCART_CONTROLLER");
      return res.status(400).send({
        message: "Enter the userId and productId",
      });
    }

    const searchId = await searchUserById(userId);

    if (searchId.length == 0) {
      console.log("User not found.-----CASTCART_CONTROLLER");
      return res.status(404).send({
        message: "User not found.",
      });
    }

    const searchProduct = await searchProductById(productId);

    if (searchProduct.length == 0) {
      console.log("Product not found.-----CASTCART_CONTROLLER");
      return res.status(404).send({
        message: "Product not found.",
      });
    }

    const sql = `SELECT quantity FROM cart WHERE userId=${userId} AND productId=${productId}`;
    let productQty = await queryExecutor(sql);
    console.log("Product----CART_CONTROLLER", productQty);

    if (productQty.length > 0) {
      productQty = Number(productQty[0].quantity);

      const sqlUpdate = `UPDATE cart SET quantity= ${
        productQty + 1
      }, updated_on= now()+1 WHERE userId=${userId} AND productId=${productId}`;
      await queryExecutor(sqlUpdate);

      console.log("Qunatity Increased by 1----CART_CONTROLLER");
      return res.status(200).send({
        message: "Qunatity Increased by 1",
      });
    } else {
      console.log("Product is not present in User's cart----CART_CONTROLLER");
      return res.status(404).send({
        message: "Product is not present in User's cart",
      });
    }
  } catch (err) {
    console.log("The error is here----CART_CONTROLLER", err);
    return res.status(500).send({
      message: "Error.",
      Error: err,
    });
  }
};

const decreaseQuantityOfProductIncartBy1 = async (req, res) => {
  try {
    const userId = req.params.id;
    const productId = req.params.productId;
    if (!userId || !productId) {
      console.log("Enter the userId and productId-----CART_CONTROLLER");
      return res.status(400).send({
        message: "Enter the userId and productId",
      });
    }

    const searchId = await searchUserById(userId);

    if (searchId.length == 0) {
      console.log("User not found.-----CART_CONTROLLER");
      return res.status(404).send({
        message: "User not found.",
      });
    }

    const searchProduct = await searchProductById(productId);

    if (searchProduct.length == 0) {
      console.log("Product not found.-----CART_CONTROLLER");
      return res.status(404).send({
        message: "Product not found.",
      });
    }

    const sql = `SELECT quantity FROM cart WHERE userId=${userId} AND productId=${productId}`;
    let productQty = await queryExecutor(sql);
    console.log("Product----CART_CONTROLLER", productQty);

    if (productQty.length > 0) {
      productQty = Number(productQty[0].quantity);
      if (productQty > 1) {
        const sqlUpdate = `UPDATE cart SET quantity= ${
          productQty - 1
        }, updated_on= now()+1 WHERE userId=${userId} AND productId=${productId}`;
        await queryExecutor(sqlUpdate);

        console.log("Qunatity Decreased by 1----CART_CONTROLLER");
        return res.status(200).send({
          message: "Qunatity decreased by 1",
        });
      } else {
        const sqlUpdate = `DELETE FROM cart WHERE userId=${userId} AND productId=${productId}`;
        await queryExecutor(sqlUpdate);

        console.log(
          "Product had been removed from the cart----CART_CONTROLLER"
        );
        return res.status(200).send({
          message: "Product had been removed from the cart.",
        });
      }
    } else {
      console.log("Product is not present in User's cart----CART_CONTROLLER");
      return res.status(404).send({
        message: "Product is not present in User's cart",
      });
    }
  } catch (err) {
    console.log("The error is here----CART_CONTROLLER", err);
    return res.status(500).send({
      message: "Error.",
      Error: err,
    });
  }
};

const deleteProductFromCart = async (req, res) => {
  try {
    const userId = req.params.id;
    const productId = req.params.productId;
    if (!userId || !productId) {
      console.log("Enter the userId and productId-----CART_CONTROLLER");
      return res.status(400).send({
        message: "Enter the userId and productId",
      });
    }

    const searchId = await searchUserById(userId);

    if (searchId.length == 0) {
      console.log("User not found.-----CART_CONTROLLER");
      return res.status(404).send({
        message: "User not found.",
      });
    }

    const searchProduct = await searchProductById(productId);

    if (searchProduct.length == 0) {
      console.log("Product not found.-----CART_CONTROLLER");
      return res.status(404).send({
        message: "Product not found.",
      });
    }

    const sqlSearch = `SELECT id FROM cart WHERE userId=${userId} AND productId=${productId}`;
    const searchCart = await queryExecutor(sqlSearch);

    if (searchCart.length > 0) {
      const sql = `DELETE FROM cart WHERE id=${searchCart[0].id}`;
      await queryExecutor(sql);

      console.log("Product is deleted from the cart----CART_CONTROLLER");
      return res.status(200).send({
        message: "Product is deleted from the cart.",
      });
    } else {
      console.log(
        "Product is not present in the user's cart.----CART_CONTROLLER"
      );
      return res.status(404).send({
        message: "Product is not present in the user's cart.",
      });
    }
  } catch (err) {
    console.log("The error is here----CART_CONTROLLER", err);
    return res.status(500).send({
      message: "Error.",
      Error: err,
    });
  }
};

module.exports = {
  addToCart,
  getAllProductsFromCart,
  getSingleProductFromCart,
  increaseQuantityOfProductIncartBy1,
  decreaseQuantityOfProductIncartBy1,
  deleteProductFromCart,
};
