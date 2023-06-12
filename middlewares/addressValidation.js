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

// isphoneNumbervalid checks the phone Number id is valid or not.
const isphoneNumbervalid = (value) => {
  return /^[6-9]{1}[0-9]{9}$/.test(value);
};

//isBodyEmpty checks the req.bosy should not be empty.
const isBodyEmpty = (value) => {
  if (Object.keys(value).length === 0) {
    return true;
  } else return false;
};

// ===================================Logics===================================

const addAddressValidation = (req, res, next) => {
  try {
    const data = req.body;

    if (isBodyEmpty(data)) {
      return res.status(400).send({
        message: "Please enter the values.",
      });
    }

    const { city, state, pinCode, addressName, addressPhoneNumber } = data;

    //city
    if (!isEmpty(city)) {
      console.log("Please enter the City----MIDDLEWARE ADDRESS_VALIDATION");
      return res.status(404).send({
        message: "Please enter the City.",
      });
    }
    if (!isValidType(city)) {
      console.log(
        "City should be in string format.----MIDDLEWARE ADDRESS_VALIDATION"
      );
      return res.status(400).send({
        message: "Please enter the City in right format.",
      });
    }

    //state
    if (!isEmpty(state)) {
      console.log("Please enter the state----MIDDLEWARE ADDRESS_VALIDATION");
      return res.status(404).send({
        message: "Please enter the state.",
      });
    }
    if (!isValidType(state)) {
      console.log(
        "state should be in string format.----MIDDLEWARE ADDRESS_VALIDATION"
      );
      return res.status(400).send({
        message: "Please enter the state in right format.",
      });
    }

    //pinCode
    if (!isEmpty(pinCode)) {
      console.log("Please enter the pinCode----MIDDLEWARE ADDRESS_VALIDATION");
      return res.status(404).send({
        message: "Please enter the pinCode.",
      });
    }
    if (!isValidType(pinCode)) {
      console.log(
        "pinCode should be in string format.----MIDDLEWARE ADDRESS_VALIDATION"
      );
      return res.status(400).send({
        message: "Please enter the pinCode in right format.",
      });
    }

    //addressName
    if (!isEmpty(addressName)) {
      console.log(
        "Please enter the Name of the receiving person----MIDDLEWARE ADDRESS_VALIDATION"
      );
      return res.status(404).send({
        message: "Please enter the Name of the receiving person.",
      });
    }
    if (!isValidType(addressName)) {
      console.log(
        "Name of the receiving person should be in string format.----MIDDLEWARE ADDRESS_VALIDATION"
      );
      return res.status(400).send({
        message:
          "Please enter the Name of the receiving person in right format.",
      });
    }

    //addressPhoneNumber
    if (!isEmpty(addressPhoneNumber)) {
      console.log("Please enter the phoneNumber----MIDDLEWARE USER_VALIDATION");
      return res.status(404).send({
        message: "Please enter the phoneNumber.",
      });
    }
    if (!isValidType(addressPhoneNumber)) {
      console.log(
        "phoneNumber should be in string format.----MIDDLEWARE USER_VALIDATION"
      );
      return res.status(400).send({
        message: "Please enter the phoneNumber in right format.",
      });
    }
    if (!isphoneNumbervalid(addressPhoneNumber)) {
      console.log(
        "Please enter a valid phone Number.----MIDDLEWARE USER_VALIDATION"
      );
      return res.status(400).send({
        message: "Please enter a valid phoneNumber.",
      });
    }

    next();
  } catch (err) {
    console.log("Error is here.----MIDDLEWARE ADDRESS_VALIDATION", err);
    res.status(500).send({
      message: err,
    });
  }
};

const updateAddressValidation = (req, res, next) => {
  try {
    const data = req.body;

    if (isBodyEmpty(data)) {
      return res.status(400).send({
        message: "Please enter the values.",
      });
    }

    const { city, state, pinCode, addressPhoneNumber, addressName } = data;

    if (city) {
      //city
      if (!isEmpty(city)) {
        console.log("Please enter the City----MIDDLEWARE ADDRESS_VALIDATION");
        return res.status(404).send({
          message: "Please enter the City.",
        });
      }
      if (!isValidType(city)) {
        console.log(
          "City should be in string format.----MIDDLEWARE ADDRESS_VALIDATION"
        );
        return res.status(400).send({
          message: "Please enter the City in right format.",
        });
      }
    }

    if (pinCode) {
      //pinCode
      if (!isEmpty(pinCode)) {
        console.log(
          "Please enter the pinCode----MIDDLEWARE ADDRESS_VALIDATION"
        );
        return res.status(404).send({
          message: "Please enter the pinCode.",
        });
      }
      if (!isValidType(pinCode)) {
        console.log(
          "pinCode should be in string format.----MIDDLEWARE ADDRESS_VALIDATION"
        );
        return res.status(400).send({
          message: "Please enter the pinCode in right format.",
        });
      }
    }

    if (state) {
      //state
      if (!isEmpty(state)) {
        console.log("Please enter the state----MIDDLEWARE ADDRESS_VALIDATION");
        return res.status(404).send({
          message: "Please enter the state.",
        });
      }
      if (!isValidType(state)) {
        console.log(
          "state should be in string format.----MIDDLEWARE ADDRESS_VALIDATION"
        );
        return res.status(400).send({
          message: "Please enter the state in right format.",
        });
      }
    }

    if (addressName) {
      //addressName
      if (!isEmpty(addressName)) {
        console.log(
          "Please enter the Name of the receiving person----MIDDLEWARE ADDRESS_VALIDATION"
        );
        return res.status(404).send({
          message: "Please enter the Name of the receiving person.",
        });
      }
      if (!isValidType(addressName)) {
        console.log(
          "Name of the receiving person should be in string format.----MIDDLEWARE ADDRESS_VALIDATION"
        );
        return res.status(400).send({
          message:
            "Please enter the Name of the receiving person in right format.",
        });
      }
    }

    if (addressPhoneNumber) {
      //addressPhoneNumber
      if (!isEmpty(addressPhoneNumber)) {
        console.log(
          "Please enter the phoneNumber----MIDDLEWARE USER_VALIDATION"
        );
        return res.status(404).send({
          message: "Please enter the phoneNumber.",
        });
      }
      if (!isValidType(addressPhoneNumber)) {
        console.log(
          "phoneNumber should be in string format.----MIDDLEWARE USER_VALIDATION"
        );
        return res.status(400).send({
          message: "Please enter the phoneNumber in right format.",
        });
      }
      if (!isphoneNumbervalid(addressPhoneNumber)) {
        console.log(
          "Please enter a valid phone Number.----MIDDLEWARE USER_VALIDATION"
        );
        return res.status(400).send({
          message: "Please enter a valid phoneNumber.",
        });
      }
    }
    next();
  } catch (err) {
    console.log("Error is here.----MIDDLEWARE ADDRESS_VALIDATION", err);
    res.status(500).send({
      message: err,
    });
  }
};

const deleteAddressValidation = (req, res, next) => {
  try {
    next();
  } catch (err) {
    console.log("Error is here.----MIDDLEWARE ADDRESS_VALIDATION", err);
    res.status(500).send({
      message: err,
    });
  }
};

module.exports = {
  addAddressValidation,
  updateAddressValidation,
  deleteAddressValidation,
};
