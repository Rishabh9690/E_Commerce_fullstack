// isValidType checks the type of input
const isValidType = (value) => {
  if (typeof value !== "string") {
    return false;
  }
  return true;
};

// isEmpty checks the length of the value (should be greater than 1)
const isEmpty = (value) => {
  if (value === null || value === undefined || value.length < 2) {
    return false;
  }
  return true;
};

//isBodyEmpty checks the req.bosy should not be empty.
const isBodyEmpty = (value) => {
  if (Object.keys(value).length === 0) {
    return true;
  } else return false;
};

// isphoneNumbervalid checks the phone Number id is valid or not.
const isphoneNumbervalid = (value) => {
  return /^[6-9]{1}[0-9]{9}$/.test(value);
};

// ===================================Logics===================================

const orderProductValidation = (req, res, next) => {
  try {
    const data = req.body;
    if (isBodyEmpty(data)) {
      console.log("Body is empty-----ORDER_MIDDLEWARE");
      return res.status(400).send({
        message: "Please enter the data.",
      });
    }

    const {
      productQuantity,
      addressId,
      orderCiy,
      orderState,
      orderPinCode,
      orderAddressPhoneNumber,
      orderAddressName,
    } = data;

    if (productQuantity < 1) {
      console.log(
        "Minimun number of orders that can be ordered is 1-----ORDER_MIDDLEWARE"
      );
      return res.status(400).send({
        message: "Minimun number of orders that can be ordered is 1.",
      });
    }

    if (!addressId) {
      //orderCity
      if (!isEmpty(orderCiy)) {
        console.log("Enter the Name of the City-----ORDER_MIDDLEWARE");
        return res.status(400).send({
          message: "Enter the name of the City.",
        });
      }
      if (!isValidType(orderCiy)) {
        console.log(
          "Enter the Name of the City in a valid form-----ORDER_MIDDLEWARE"
        );
        return res.status(400).send({
          message: "Enter the name of the City in a valid form.",
        });
      }

      //orderState
      if (!isEmpty(orderState)) {
        console.log("Enter State-----ORDER_MIDDLEWARE");
        return res.status(400).send({
          message: "Enter State.",
        });
      }
      if (!isValidType(orderState)) {
        console.log("Enter State in a valid form-----ORDER_MIDDLEWARE");
        return res.status(400).send({
          message: "Enter State in a valid form.",
        });
      }

      //orderPinCode
      if (!isEmpty(orderPinCode)) {
        console.log("Enter PinCode-----ORDER_MIDDLEWARE");
        return res.status(400).send({
          message: "Enter PinCode.",
        });
      }
      if (!isValidType(orderPinCode)) {
        console.log("Enter PinCode in a valid form-----ORDER_MIDDLEWARE");
        return res.status(400).send({
          message: "Enter PinCode in a valid form.",
        });
      }

      //orderAddressPhoneNumber
      if (!isEmpty(orderAddressPhoneNumber)) {
        console.log("Enter PhoneNumber of the Receiver-----ORDER_MIDDLEWARE");
        return res.status(400).send({
          message: "Enter PhoneNumber of the Receiver.",
        });
      }
      if (!isValidType(orderAddressPhoneNumber)) {
        console.log(
          "Enter PhoneNumber of the Receiver in a valid form-----ORDER_MIDDLEWARE"
        );
        return res.status(400).send({
          message: "Enter PhoneNumber of the Receiver in a valid form.",
        });
      }
      if (!isphoneNumbervalid(orderAddressPhoneNumber)) {
        console.log(
          "Please enter a valid phone Number.----MIDDLEWARE USER_VALIDATION"
        );
        return res.status(400).send({
          message: "Please enter a valid phoneNumber.",
        });
      }

      //orderAddressName
      if (!isEmpty(orderAddressName)) {
        console.log("Enter Name of the Receiver-----ORDER_MIDDLEWARE");
        return res.status(400).send({
          message: "Enter Name of the Receiver.",
        });
      }
      if (!isValidType(orderAddressName)) {
        console.log(
          "Enter Name of the Receiver in a valid form-----ORDER_MIDDLEWARE"
        );
        return res.status(400).send({
          message: "Enter Name of the Receiver in a valid form.",
        });
      }
    }

    next();
  } catch (err) {
    console.log("Error is here-----ORDER_MIDDLEWARE", err);
    return res.status(500).send({
      message: "Error",
      Error: err,
    });
  }
};

const updateOrderValidation = (req, res, next) => {
  try {
    const data = req.body;
    if (isBodyEmpty(data)) {
      console.log("Body is empty-----ORDER_MIDDLEWARE");
      return res.status(400).send({
        message: "Please enter the data.",
      });
    }

    const {
      productQuantity,
      addressId,
      orderCiy,
      orderState,
      orderPinCode,
      orderAddressPhoneNumber,
      orderAddressName,
    } = data;

    if (productQuantity < 1) {
      console.log(
        "Minimun number of orders that can be ordered is 1-----ORDER_MIDDLEWARE"
      );
      return res.status(400).send({
        message: "Minimun number of orders that can be ordered is 1.",
      });
    }

    if (!addressId) {
      //orderCity
      if (!isEmpty(orderCiy)) {
        console.log("Enter the Name of the City-----ORDER_MIDDLEWARE");
        return res.status(400).send({
          message: "Enter the name of the City.",
        });
      }
      if (!isValidType(orderCiy)) {
        console.log(
          "Enter the Name of the City in a valid form-----ORDER_MIDDLEWARE"
        );
        return res.status(400).send({
          message: "Enter the name of the City in a valid form.",
        });
      }

      //orderState
      if (!isEmpty(orderState)) {
        console.log("Enter State-----ORDER_MIDDLEWARE");
        return res.status(400).send({
          message: "Enter State.",
        });
      }
      if (!isValidType(orderState)) {
        console.log("Enter State in a valid form-----ORDER_MIDDLEWARE");
        return res.status(400).send({
          message: "Enter State in a valid form.",
        });
      }

      //orderPinCode
      if (!isEmpty(orderPinCode)) {
        console.log("Enter PinCode-----ORDER_MIDDLEWARE");
        return res.status(400).send({
          message: "Enter PinCode.",
        });
      }
      if (!isValidType(orderPinCode)) {
        console.log("Enter PinCode in a valid form-----ORDER_MIDDLEWARE");
        return res.status(400).send({
          message: "Enter PinCode in a valid form.",
        });
      }

      //orderAddressPhoneNumber
      if (!isEmpty(orderAddressPhoneNumber)) {
        console.log("Enter PhoneNumber of the Receiver-----ORDER_MIDDLEWARE");
        return res.status(400).send({
          message: "Enter PhoneNumber of the Receiver.",
        });
      }
      if (!isValidType(orderAddressPhoneNumber)) {
        console.log(
          "Enter PhoneNumber of the Receiver in a valid form-----ORDER_MIDDLEWARE"
        );
        return res.status(400).send({
          message: "Enter PhoneNumber of the Receiver in a valid form.",
        });
      }
      if (!isphoneNumbervalid(orderAddressPhoneNumber)) {
        console.log(
          "Please enter a valid phone Number.----MIDDLEWARE USER_VALIDATION"
        );
        return res.status(400).send({
          message: "Please enter a valid phoneNumber.",
        });
      }

      //orderAddressName
      if (!isEmpty(orderAddressName)) {
        console.log("Enter Name of the Receiver-----ORDER_MIDDLEWARE");
        return res.status(400).send({
          message: "Enter Name of the Receiver.",
        });
      }
      if (!isValidType(orderAddressName)) {
        console.log(
          "Enter Name of the Receiver in a valid form-----ORDER_MIDDLEWARE"
        );
        return res.status(400).send({
          message: "Enter Name of the Receiver in a valid form.",
        });
      }
    }

    next();
  } catch (err) {
    console.log("Error is here-----ORDER_MIDDLEWARE", err);
    return res.status(500).send({
      message: "Error",
      Error: err,
    });
  }
};

module.exports = {
  orderProductValidation,
  updateOrderValidation,
};
