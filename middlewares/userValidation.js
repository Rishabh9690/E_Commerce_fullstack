// isValidType checks the type of input
const isValidType = (value) => {
  if (typeof value !== "string") {
    return false;
  }
  return true;
};

// isEmpty checks the length of the value (should be greater than 1)
const isEmpty = (value) => {
  if (value === null || value === undefined || value.length < 1) {
    return false;
  }
  return true;
};

// isEmailValid checks the email id is valid or not.
const isEmailValid = (value) => {
  return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/.test(value);
};

// isphoneNumbervalid checks the phone Number id is valid or not.
const isphoneNumbervalid = (value) => {
  //   if (value.length !== 10) {
  //     return false;
  //   }

  return /^[6-9]{1}[0-9]{9}$/.test(value);
};

// isPasswordValid checks the password id is valid or not.
const isPasswordValid = (value) => {
  return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/.test(value);
};

//isBodyEmpty checks the req.bosy should not be empty.
const isBodyEmpty = (value) => {
  if (Object.keys(value).length === 0) {
    return true;
  } else return false;
};

// ===================================Logics===================================

const userValidation = (req, res, next) => {
  try {
    const data = req.body;

    if (isBodyEmpty(data)) {
      return res.status(400).send({
        message: "Please enter the values.",
      });
    }

    const { firstName, lastName, email, phoneNumber, password } = data;

    //FirstName
    if (!isEmpty(firstName)) {
      console.log("Please enter the First Name----MIDDLEWARE USER_VALIDATION");
      return res.status(400).send({
        message: "Please enter the First Name.",
      });
    }
    if (!isValidType(firstName)) {
      console.log(
        "firstName should be in string format.----MIDDLEWARE USER_VALIDATION"
      );
      return res.status(400).send({
        message: "Please enter the First Name in right format.",
      });
    }

    //lastName
    if (!isEmpty(lastName)) {
      console.log("Please enter the Last Name----MIDDLEWARE USER_VALIDATION");
      return res.status(400).send({
        message: "Please enter the Last Name.",
      });
    }
    if (!isValidType(lastName)) {
      console.log(
        "lastName should be in string format.----MIDDLEWARE USER_VALIDATION"
      );
      return res.status(400).send({
        message: "Please enter the Last Name in right format.",
      });
    }

    //Email
    if (!isEmpty(email)) {
      console.log("Please enter the email----MIDDLEWARE USER_VALIDATION");
      return res.status(400).send({
        message: "Please enter the Email.",
      });
    }
    if (!isValidType(email)) {
      console.log(
        "Email should be in string format.----MIDDLEWARE USER_VALIDATION"
      );
      return res.status(400).send({
        message: "Please enter the email in right format.",
      });
    }
    if (!isEmailValid(email)) {
      console.log("Email is not valid.----MIDDLEWARE USER_VALIDATION");
      return res.status(400).send({
        message: "Please enter a valid email address.",
      });
    }

    //PhoneNumber
    if (!isEmpty(phoneNumber)) {
      console.log("Please enter the phoneNumber----MIDDLEWARE USER_VALIDATION");
      return res.status(400).send({
        message: "Please enter the phoneNumber.",
      });
    }
    if (!isValidType(phoneNumber)) {
      console.log(
        "phoneNumber should be in string format.----MIDDLEWARE USER_VALIDATION"
      );
      return res.status(400).send({
        message: "Please enter the phoneNumber in right format.",
      });
    }
    if (!isphoneNumbervalid(phoneNumber)) {
      console.log(
        "Please enter a valid phone Number.----MIDDLEWARE USER_VALIDATION"
      );
      return res.status(400).send({
        message: "Please enter a valid phoneNumber.",
      });
    }

    //Password
    if (!isEmpty(password)) {
      console.log("Please enter the password----MIDDLEWARE USER_VALIDATION");
      return res.status(400).send({
        message: "Please enter the password.",
      });
    }
    if (!isValidType(password)) {
      console.log(
        "password should be in string formate.----MIDDLEWARE USER_VALIDATION"
      );
      return res.status(400).send({
        message: "Please enter the password in right format.",
      });
    }
    if (!isPasswordValid(password)) {
      console.log(
        "Password must contain 1 Number, 1 special character, 1 lower case character & 1 upper case character with minimum length of 8 and maximum length of 16.----MIDDLEWARE USER_VALIDATION"
      );
      return res.status(400).send({
        message:
          "Password must contain 1 Number, 1 special character, 1 lower case character & 1 upper case character with minimum length of 8 and maximum length of 16.",
      });
    }

    next();
  } catch (err) {
    console.log("Error is here.----MIDDLEWARE USER_VALIDATION", err);
    res.status(500).send({
      message: err,
    });
  }
};

const signInValidation = (req, res, next) => {
  try {
    const data = req.body;

    if (isBodyEmpty(data)) {
      return res.status(400).send({
        message: "Please enter the values.",
      });
    }

    // if (Object.keys(data).length === 0) {
    //   console.log("Body is empty..!! ----MIDDLEWARE USER_VALIDATION");
    //   return res.status(400).send({
    //     message: "Please enter the values.",
    //   });
    // }
    const { email, password } = data;

    //Email
    if (!isEmpty(email)) {
      console.log("Please enter the email----MIDDLEWARE USER_VALIDATION");
      return res.status(400).send({
        message: "Please enter the Email.",
      });
    }
    if (!isValidType(email)) {
      console.log(
        "Email should be in string format.----MIDDLEWARE USER_VALIDATION"
      );
      return res.status(400).send({
        message: "Please enter the email in right format.",
      });
    }
    if (!isEmailValid(email)) {
      console.log("Email is not valid.----MIDDLEWARE USER_VALIDATION");
      return res.status(400).send({
        message: "Please enter a valid email address.",
      });
    }

    //Password
    if (!isEmpty(password)) {
      console.log("Please enter the password----MIDDLEWARE USER_VALIDATION");
      return res.status(400).send({
        message: "Please enter the password.",
      });
    }
    if (!isValidType(password)) {
      console.log(
        "password should be in string formate.----MIDDLEWARE USER_VALIDATION"
      );
      return res.status(400).send({
        message: "Please enter the password in right format.",
      });
    }

    next();
  } catch (err) {
    console.log("Error is here.----MIDDLEWARE USER_VALIDATION", err);
    res.status(500).send({
      message: err,
    });
  }
};

const updateUserValidation = (req, res, next) => {
  try {
    const data = req.body;
    if (isBodyEmpty(data)) {
      return res.status(400).send({
        message: "Please enter the values.",
      });
    }

    const { firstName, lastName, email, phoneNumber } = data;

    if (firstName || lastName) {
      //FirstName
      if (!isEmpty(firstName)) {
        console.log(
          "Please enter the First Name----MIDDLEWARE USER_VALIDATION"
        );
        return res.status(404).send({
          message: "Please enter the First Name.",
        });
      }
      if (!isValidType(firstName)) {
        console.log(
          "firstName should be in string format.----MIDDLEWARE USER_VALIDATION"
        );
        return res.status(400).send({
          message: "Please enter the First Name in right format.",
        });
      }

      //lastName
      if (!isEmpty(lastName)) {
        console.log("Please enter the Last Name----MIDDLEWARE USER_VALIDATION");
        return res.status(404).send({
          message: "Please enter the Last Name.",
        });
      }
      if (!isValidType(lastName)) {
        console.log(
          "lastName should be in string format.----MIDDLEWARE USER_VALIDATION"
        );
        return res.status(400).send({
          message: "Please enter the Last Name in right format.",
        });
      }
    }

    if (email) {
      //Email
      if (!isEmpty(email)) {
        console.log("Please enter the email----MIDDLEWARE USER_VALIDATION");
        return res.status(404).send({
          message: "Please enter the Email.",
        });
      }
      if (!isValidType(email)) {
        console.log(
          "Email should be in string format.----MIDDLEWARE USER_VALIDATION"
        );
        return res.status(400).send({
          message: "Please enter the email in right format.",
        });
      }
      if (!isEmailValid(email)) {
        console.log("Email is not valid.----MIDDLEWARE USER_VALIDATION");
        return res.status(400).send({
          message: "Please enter a valid email address.",
        });
      }
    }

    if (phoneNumber) {
      //PhoneNumber
      if (!isEmpty(phoneNumber)) {
        console.log(
          "Please enter the phoneNumber----MIDDLEWARE USER_VALIDATION"
        );
        return res.status(404).send({
          message: "Please enter the phoneNumber.",
        });
      }
      if (!isValidType(phoneNumber)) {
        console.log(
          "phoneNumber should be in string format.----MIDDLEWARE USER_VALIDATION"
        );
        return res.status(400).send({
          message: "Please enter the phoneNumber in right format.",
        });
      }
      if (!isphoneNumbervalid(phoneNumber)) {
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
    console.log("Error is here.----MIDDLEWARE USER_VALIDATION", err);
    res.status(500).send({
      message: err,
    });
  }
};

const changePasswordValidation = (req, res, next) => {
  try {
    const data = req.body;
    if (isBodyEmpty(data)) {
      return res.status(400).send({
        message: "Please enter the values.",
      });
    }
    const { email, phoneNumber, password, newPassword, confirmPassword } = data;

    //Email
    if (!isEmpty(email)) {
      console.log("Please enter the email----MIDDLEWARE USER_VALIDATION");
      return res.status(404).send({
        message: "Please enter the Email.",
      });
    }
    if (!isValidType(email)) {
      console.log(
        "Email should be in string format.----MIDDLEWARE USER_VALIDATION"
      );
      return res.status(400).send({
        message: "Please enter the email in right format.",
      });
    }
    if (!isEmailValid(email)) {
      console.log("Email is not valid.----MIDDLEWARE USER_VALIDATION");
      return res.status(400).send({
        message: "Please enter a valid email address.",
      });
    }

    //PhoneNumber
    if (!isEmpty(phoneNumber)) {
      console.log("Please enter the phoneNumber----MIDDLEWARE USER_VALIDATION");
      return res.status(404).send({
        message: "Please enter the phoneNumber.",
      });
    }
    if (!isValidType(phoneNumber)) {
      console.log(
        "phoneNumber should be in string format.----MIDDLEWARE USER_VALIDATION"
      );
      return res.status(400).send({
        message: "Please enter the phoneNumber in right format.",
      });
    }
    if (!isphoneNumbervalid(phoneNumber)) {
      console.log(
        "Please enter a valid phone Number.----MIDDLEWARE USER_VALIDATION"
      );
      return res.status(400).send({
        message: "Please enter a valid phoneNumber.",
      });
    }

    //Password
    if (!isEmpty(password)) {
      console.log("Please enter the password----MIDDLEWARE USER_VALIDATION");
      return res.status(404).send({
        message: "Please enter the password.",
      });
    }
    if (!isValidType(password)) {
      console.log(
        "password should be in string formate.----MIDDLEWARE USER_VALIDATION"
      );
      return res.status(400).send({
        message: "Please enter the password in right format.",
      });
    }
    if (!isPasswordValid(newPassword)) {
      console.log(
        "Password must contain 1 Number, 1 special character, 1 lower case character & 1 upper case character with minimum length of 8 and maximum length of 16.----MIDDLEWARE USER_VALIDATION"
      );
      return res.status(400).send({
        message:
          "Password must contain 1 Number, 1 special character, 1 lower case character & 1 upper case character with minimum length of 8 and maximum length of 16.",
      });
    }

    //NewPassword
    if (!isEmpty(newPassword)) {
      console.log("Please enter the password----MIDDLEWARE USER_VALIDATION");
      return res.status(404).send({
        message: "Please enter the password.",
      });
    }
    if (!isValidType(newPassword)) {
      console.log(
        "password should be in string formate.----MIDDLEWARE USER_VALIDATION"
      );
      return res.status(400).send({
        message: "Please enter the password in right format.",
      });
    }
    if (!isPasswordValid(newPassword)) {
      console.log(
        "Password must contain 1 Number, 1 special character, 1 lower case character & 1 upper case character with minimum length of 8 and maximum length of 16.----MIDDLEWARE USER_VALIDATION"
      );
      return res.status(400).send({
        message:
          "Password must contain 1 Number, 1 special character, 1 lower case character & 1 upper case character with minimum length of 8 and maximum length of 16.",
      });
    }

    //confirmPassword
    if (!isEmpty(confirmPassword)) {
      console.log("Please enter the password----MIDDLEWARE USER_VALIDATION");
      return res.status(404).send({
        message: "Please enter the confirmPassword.",
      });
    }
    if (!isValidType(confirmPassword)) {
      console.log(
        "password should be in string formate.----MIDDLEWARE USER_VALIDATION"
      );
      return res.status(400).send({
        message: "Please enter the password in right format.",
      });
    }
    if (newPassword !== confirmPassword) {
      console.log(
        "newPassword does not match with confirmPassword.----MIDDLEWARE USER_VALIDATION"
      );
      return res.status(400).send({
        message: "newPassword does not match with confirmPassword",
      });
    }
    next();
  } catch (err) {
    console.log("Error is here.----MIDDLEWARE USER_VALIDATION", err);
    res.status(500).send({
      message: err,
    });
  }
};

const newPasswordValidation = (req, res, next) => {
  try {
    const data = req.body;
    if (isBodyEmpty(data)) {
      return res.status(400).send({
        message: "Please enter the values.",
      });
    }
    const { newPassword, confirmPassword } = data;

    //NewPassword
    if (!isEmpty(newPassword)) {
      console.log("Please enter the password----MIDDLEWARE USER_VALIDATION");
      return res.status(404).send({
        message: "Please enter the password.",
      });
    }
    if (!isValidType(newPassword)) {
      console.log(
        "password should be in string formate.----MIDDLEWARE USER_VALIDATION"
      );
      return res.status(400).send({
        message: "Please enter the password in right format.",
      });
    }
    if (!isPasswordValid(newPassword)) {
      console.log(
        "Password must contain 1 Number, 1 special character, 1 lower case character & 1 upper case character with minimum length of 8 and maximum length of 16.----MIDDLEWARE USER_VALIDATION"
      );
      return res.status(400).send({
        message:
          "Password must contain 1 Number, 1 special character, 1 lower case character & 1 upper case character with minimum length of 8 and maximum length of 16.",
      });
    }

    //confirmPassword
    if (!isEmpty(confirmPassword)) {
      console.log("Please enter the password----MIDDLEWARE USER_VALIDATION");
      return res.status(404).send({
        message: "Please enter the confirmPassword.",
      });
    }
    if (!isValidType(confirmPassword)) {
      console.log(
        "password should be in string formate.----MIDDLEWARE USER_VALIDATION"
      );
      return res.status(400).send({
        message: "Please enter the password in right format.",
      });
    }
    if (newPassword !== confirmPassword) {
      console.log(
        "newPassword does not match with confirmPassword.----MIDDLEWARE USER_VALIDATION"
      );
      return res.status(400).send({
        message: "newPassword does not match with confirmPassword",
      });
    }
    next();
  } catch (err) {
    console.log("Error is here.----MIDDLEWARE USER_VALIDATION", err);
    res.status(500).send({
      message: err,
    });
  }
};

const deleteUserValidation = (req, res, next) => {
  try {
    const data = req.body;
    if (isBodyEmpty(data)) {
      return res.status(400).send({
        message: "Please enter the values.",
      });
    }

    const { email, password } = data;

    //Email
    if (!isEmpty(email)) {
      console.log("Please enter the email----MIDDLEWARE USER_VALIDATION");
      return res.status(404).send({
        message: "Please enter the Email.",
      });
    }
    if (!isValidType(email)) {
      console.log(
        "Email should be in string format.----MIDDLEWARE USER_VALIDATION"
      );
      return res.status(400).send({
        message: "Please enter the email in right format.",
      });
    }
    if (!isEmailValid(email)) {
      console.log("Email is not valid.----MIDDLEWARE USER_VALIDATION");
      return res.status(400).send({
        message: "Please enter a valid email address.",
      });
    }

    //Password
    if (!isEmpty(password)) {
      console.log("Please enter the password----MIDDLEWARE USER_VALIDATION");
      return res.status(404).send({
        message: "Please enter the password.",
      });
    }
    if (!isValidType(password)) {
      console.log(
        "password should be in string formate.----MIDDLEWARE USER_VALIDATION"
      );
      return res.status(400).send({
        message: "Please enter the password in right format.",
      });
    }
    if (!isPasswordValid(password)) {
      console.log(
        "Password must contain 1 Number, 1 special character, 1 lower case character & 1 upper case character with minimum length of 8 and maximum length of 16.----MIDDLEWARE USER_VALIDATION"
      );
      return res.status(400).send({
        message:
          "Password must contain 1 Number, 1 special character, 1 lower case character & 1 upper case character with minimum length of 8 and maximum length of 16.",
      });
    }
    next();
  } catch (err) {
    console.log("Error is here.----MIDDLEWARE USER_VALIDATION", err);
    res.status(500).send({
      message: err,
    });
  }
};
module.exports = {
  userValidation,
  signInValidation,
  updateUserValidation,
  changePasswordValidation,
  newPasswordValidation,
  deleteUserValidation,
};
