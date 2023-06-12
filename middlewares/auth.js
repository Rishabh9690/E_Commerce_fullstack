const jwt = require("jsonwebtoken");
const { CONSTANT_VARIABLES } = require("../config/config");

const auth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      console.log("Enter the token----MIDDLEWARE AUTH_VALIDATION");
      return res.status(401).send({
        message: "Insert the token.",
      });
    }
    const token = req.headers.authorization.split(" ")[1];
    //token==> 'Bearer token'-> split(" ") and take index1 as our token

    const id = Number(req.params.id);
    if (!id || typeof id == NaN) {
      console.log("UserId is not present----MIDDLEWARE AUTH_VALIDATION");
      return res.status(400).send({
        message: "UserId is not present.",
      });
    }

    console.log("id----MIDDLEWARE AUTH_VALIDATION", id);
    const decode = jwt.verify(token, CONSTANT_VARIABLES.JWT_SECRET);
    console.log("Decode token.----MIDDLEWARE AUTH_VALIDATION", decode);
    const userId = decode.searchData.id;
    console.log("UserId----MIDDLEWARE AUTH_VALIDATION", userId);

    if (!id || !userId || id !== userId) {
      console.log("UserId does not match.----MIDDLEWARE AUTH_VALIDATION");
      return res.status(401).send({
        message: "UserId does not match.",
      });
    }

    next();
  } catch (err) {
    console.log("Error is here.----MIDDLEWARE AUTH_VALIDATION", err);
    res.status(500).send({
      message: err,
    });
  }
};
module.exports = {
  auth,
};
