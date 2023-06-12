const express = require("express");
const router = express.Router();
const { CONSTANT_VARIABLES } = require("../config/config");

//---------------------------MiddleWares------------------------
const {
  userValidation,
  signInValidation,
  updateUserValidation,
  changePasswordValidation,
  newPasswordValidation,
  deleteUserValidation,
} = require("../middlewares/userValidation");

const {
  addAddressValidation,
  updateAddressValidation,
  deleteAddressValidation,
} = require("../middlewares/addressValidation");

const {
  createProductValidation,
  updateProductValidation,
} = require("../middlewares/productValidation");

const {
  orderProductValidation,
  updateOrderValidation,
} = require("../middlewares/orderValidation");

const { auth } = require("../middlewares/auth");

//---------------------Controllers----------------------------------

const {
  createUser,
  signIn,
  getUserById,
  updateUserById,
  changePasswordById,
  forgetPasswordById,
  verifyOtp,
  newPassword,
  deleteUserById,
} = require("../controllers/userController");

const {
  addAddress,
  getAllAddressesById,
  getAddressByAddressId,
  updateAddressById,
  deleteAddressById,
} = require("../controllers/addressController");

const {
  createProduct,
  getAllProducts,
  getProductsByName,
  getProductsByType,
  getProductsByNameorType,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../controllers/productController");

const {
  changeStatusOfProductInWishlist,
  getAllProductsOfuserFromWishList,
} = require("../controllers/wishListController");

const {
  addToCart,
  getAllProductsFromCart,
  getSingleProductFromCart,
  increaseQuantityOfProductIncartBy1,
  decreaseQuantityOfProductIncartBy1,
  deleteProductFromCart,
} = require("../controllers/cartController");

const {
  orderProduct,
  getOrderInfo,
  updateOrderDetails,
  cancelOrder,
  orderDelivered,
  getAllOrders,
} = require("../controllers/orderConroller");

//-----------------------------Routes-----------------------------

//User
router.post("/registration", userValidation, createUser);
router.post("/signIn", signInValidation, signIn);
router.get("/getUser/:id", auth, getUserById);
router.put("/updateUser/:id", auth, updateUserValidation, updateUserById);
router.put(
  "/changePassword/:id",
  auth,
  changePasswordValidation,
  changePasswordById
);
router.post("/forgetPassword", forgetPasswordById);
router.delete("/verifyOtp", verifyOtp);
router.put("/newPassword", newPasswordValidation, newPassword);
router.delete("/deleteUser/:id", deleteUserValidation, deleteUserById);

//Addresses (id==>userId)
router.post("/addAddress/:id", auth, addAddressValidation, addAddress);
router.get("/getAllAddresses/:id", auth, getAllAddressesById);
router.get(
  "/getAddressByAddressId/:id/:addressId",
  auth,
  getAddressByAddressId
);
router.put(
  "/updateAddress/:id/:addressId",
  auth,
  updateAddressValidation,
  updateAddressById
);
router.delete(
  "/deleteAddress/:id/:addressId",
  auth,
  deleteAddressValidation,
  deleteAddressById
);

//Products
router.post("/createProduct", createProductValidation, createProduct);
router.get("/getAllProducts", getAllProducts);
router.get("/getProductByName", getProductsByName);
router.get("/getProductByType", getProductsByType);
router.get("/getProductByNameorType/:productName", getProductsByNameorType);
router.get("/getProductById/:productId", getProductById);
router.put(
  "/updateProduct/:productId",
  updateProductValidation,
  updateProductById
);
router.delete("/deleteProductbyId/:productId", deleteProductById);

//WishList(id=>userId)
router.put(
  "/changeProductStatusInWishlist/:id/:productId",
  changeStatusOfProductInWishlist
);

router.get(
  "/getAllProductsOfuserFromWishList/:id",
  auth,
  getAllProductsOfuserFromWishList
);

//Cart(id=>userId)
router.post("/addToCart/:id/:productId", addToCart);
router.get("/getAllProductsFromCart/:id", auth, getAllProductsFromCart);
router.get("/getSingleProductById/:id/:productId", getSingleProductFromCart);
router.put(
  "/increaseProductQuantityBy1/:id/:productId",
  increaseQuantityOfProductIncartBy1
);
router.put(
  "/decreaseProductQuantityBy1/:id/:productId",
  decreaseQuantityOfProductIncartBy1
);
router.delete(
  "/deleteProductfromCart/:id/:productId",
  auth,
  deleteProductFromCart
);

//Orders(id=>userId)
router.post(
  "/orderProduct/:id/:productId",
  auth,
  orderProductValidation,
  orderProduct
);
router.get("/getOrderStatus/:id/:orderId", auth, getOrderInfo);
router.put(
  "/updateOrder/:id/:orderId",
  auth,
  updateOrderValidation,
  updateOrderDetails
);
router.put("/cancelOrder/:id/:orderId", cancelOrder);
router.put("/orderDelivered/:orderId", orderDelivered);
router.get("/getAllOrders/:id", auth, getAllOrders);

module.exports = router;
