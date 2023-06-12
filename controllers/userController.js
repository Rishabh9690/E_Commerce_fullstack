const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { queryExecutor } = require("../utils/common");
const { CONSTANT_VARIABLES } = require("../config/config");
const nodemailer = require("nodemailer");

//searchUserById checks does this ID given in params exist in database or not.
const searchUserById = async (id) => {
  try {
    console.log("ID from searchUserById function----userController", id);

    const sql = `SELECT * FROM user WHERE id=${id} AND status= true`;
    const searchData = await queryExecutor(sql);
    console.log(
      "searchData from searchUserById function----userController",
      searchData
    );
    return searchData;
  } catch (err) {
    console.log("Error is here----userController", err);
  }
};

//searchUserByEmail checks does this EMAIL exist in database or not.
const searchUserByEmail = async (email) => {
  try {
    console.log("EMAIL from searchUserById function----userController", email);
    const sql = `SELECT * FROM user WHERE email='${email}' AND status= true`;
    const searchData = await queryExecutor(sql);
    console.log(
      "searchData from searchUserById function----userController",
      searchData
    );
    return searchData;
  } catch (err) {
    console.log("Error is here----userController", err);
  }
};

//searchUserByPhoneNumber checks does this PHONE NUMBER exist in database or not.
const searchUserByPhoneNumber = async (phoneNumber) => {
  try {
    console.log(
      "PHONE NUMBER from searchUserById function----userController",
      phoneNumber
    );
    const sql = `SELECT * FROM user WHERE phoneNumber='${phoneNumber}' AND status= true`;
    const searchData = await queryExecutor(sql);
    console.log(
      "searchData from searchUserById function----userController",
      searchData
    );
    return searchData;
  } catch (err) {
    console.log("Error is here----userController", err);
  }
};

// ===================================Logics===================================

const createUser = async (req, res) => {
  /*
    {
    "firstName": "Rishabh",
    "lastName": "Saxena",
    "email": "rishabhtest00@gmail.com",
    "phoneNumber": "9690697279",
    "password": "Test@007"
    }
    */
  try {
    const data = req.body;
    const { firstName, lastName, email, phoneNumber, password } = data;

    // const sqlEmail = `SELECT * FROM user WHERE email= '${email}' AND status= true`;
    const isEmailExist = await searchUserByEmail(email);
    // console.log("isEmailExist------UserController", isEmailExist);

    if (isEmailExist.length > 0) {
      console.log("Email already exist.!----userController");
      return res.status(400).send({
        message: "Email already exist.!",
      });
    }

    // const sqlPhoneNumber = `SELECT * FROM user WHERE phoneNumber='${phoneNumber}' AND status= true`;
    const isPhoneNumberExist = await searchUserByPhoneNumber(phoneNumber);
    // console.log("isPhoneNumberExist------UserController", isPhoneNumberExist);

    if (isPhoneNumberExist.length > 0) {
      console.log("PhoneNumber already exist.!----userController");
      return res.status(400).send({
        message: "PhoneNumber alreadt exist.!",
      });
    }

    const fullName = firstName + " " + lastName;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const sqlInsert = `INSERT INTO user(Name, Email, phoneNumber, password, created_on)  VALUES ('${fullName}', '${email}', '${phoneNumber}', '${hashedPassword}', now()+1)`;

    await queryExecutor(sqlInsert);
    const searchUserId = await queryExecutor(
      `SELECT id FROM user WHERE email='${email}' AND phoneNumber='${phoneNumber}'`
    );

    data.id = searchUserId[0].id;

    console.log("User created successfully.----userController", data);
    return res.status(201).send({
      message: "User created successfully.",
      data: data,
    });
  } catch (err) {
    console.log("Error is here----userController", err);
    res.status(500).send({
      message: err,
    });
  }
};

const signIn = async (req, res) => {
  /*
    {
    "email":"rishabhtest00@gmail.com",
    "password":"Test@007"
    }
    */
  try {
    const data = req.body;
    const { email, password } = data;
    const sql = `SELECT * FROM user WHERE email='${email}' AND status= true`;

    const searchEmail = await queryExecutor(sql);
    console.log("searchEmail----userController", searchEmail);
    const searchData = searchEmail[0];

    if (searchEmail.length > 0) {
      bcrypt
        .compare(password, searchData.password)
        .then((result) => {
          //result==> true
          if (result) {
            const token = jwt.sign(
              { searchData },
              CONSTANT_VARIABLES.JWT_SECRET,
              { expiresIn: "1h" }
            );
            console.log("logIn successfull----userController");
            return res.status(200).send({
              message: "logIn successfull",
              userId: searchData.id,
              token: token,
            });
          } else {
            console.log("Incorrect Password.----userController");
            return res.status(400).send({
              message: "Incorrect Password.",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log(
        "Login failed!, Email does not exist in the Database----userController"
      );
      return res.status(404).send({
        message: "Email not found.",
      });
    }
  } catch (err) {
    console.log("Error is here----userController", err);
    res.status(500).send({
      message: err,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("id from getUserById function----userController", id);

    // const sql = `SELECT Name, Email, phoneNumber, status FROM user WHERE id=${id} AND status= true`;
    // const searchData = await queryExecutor(sql);

    const searchData = await searchUserById(id);
    console.log(
      "searchData from getUserById function----userController",
      searchData
    );
    if (searchData.length > 0) {
      const userData = {
        Name: searchData[0].Name,
        Email: searchData[0].Email,
        phoneNumber: searchData[0].phoneNumber,
      };
      console.log("searchData----userController", userData);
      return res.status(200).send({ user: userData });
    } else {
      console.log("Id not found in the database!----userController");
      return res.status(404).send({
        message: "Id not found!",
      });
    }
  } catch (err) {
    console.log("Error is here----userController", err);
    res.status(500).send({
      message: err,
    });
  }
};

const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    console.log("id from updateUserById function----userController", id);

    const searchId = await searchUserById(id);
    console.log(
      "searchId from updateUserById function----userController",
      searchId
    );
    if (searchId.length > 0) {
      const { firstName, lastName, email, phoneNumber } = data;

      const newData = {};
      newData.fullName =
        firstName && lastName
          ? firstName + " " + lastName
          : searchId[0].fullName;

      if (email) {
        //New email should also be unique
        const searchEmail = await searchUserByEmail(email);
        if (searchEmail.length > 0) {
          console.log("This email is already use!----userController");
          return res.status(400).send({
            message: "Email id already in use.",
          });
        } else {
          newData.email = email;
        }
      } else {
        // console.log("email is here===>", searchId[0].Email);
        newData.email = searchId[0].Email;
      }

      if (phoneNumber) {
        //New phoneNumber should also be unique
        const searchPhoneNumber = await searchUserByPhoneNumber(phoneNumber);
        if (searchPhoneNumber.length > 0) {
          console.log("This phoneNumber is already use!----userController");
          return res.status(400).send({
            message: "PhoneNumber is already in use.",
          });
        } else {
          newData.phoneNumber = phoneNumber;
        }
      } else {
        // console.log("PhoneNumber is here===>", searchId[0].phoneNumber);
        newData.phoneNumber = searchId[0].phoneNumber;
      }

      console.log("NewData is here====>", newData);
      //newData is ready to update

      const sql = `UPDATE user SET Name='${newData.fullName}', Email='${newData.email}', phoneNumber='${newData.phoneNumber}' WHERE id=${id}`;
      await queryExecutor(sql);

      console.log("User updated successfully!----userController", newData);
      return res.status(201).send({
        message: "User updated successfully.",
        data: newData,
      });
    } else {
      console.log("Id not found in the database!----userController");
      return res.status(404).send({
        message: "Id not found!",
      });
    }
  } catch (err) {
    console.log("Error is here----userController", err);
    res.status(500).send({
      message: err,
    });
  }
};

const changePasswordById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    console.log("id from changePasswordById function----userController", id);

    const searchId = await searchUserById(id);
    console.log(
      "searchId from updateUserById function----userController",
      searchId
    );
    if (searchId.length > 0) {
      const { email, phoneNumber, password, newPassword } = data;

      const salt = await bcrypt.genSalt(10);
      const hashednewPassword = await bcrypt.hash(newPassword, salt);

      //   console.log("hashedPassword--->", hashedPassword);

      const searchEmail = await searchUserByEmail(email);
      if (searchEmail.length == 0) {
        console.log("Email not found----userController");
        return res.status(400).send({
          message: "Email not found.",
        });
      } else {
        if (searchId[0].id !== searchEmail[0].id) {
          console.log("Id does not match with ID from Email----userController");
          return res.status(401).send({
            message: "Id does not match with ID from the given Email",
          });
        }
        if (searchId[0].Email !== searchEmail[0].Email) {
          console.log(
            "Email does not match with Email from Email----userController"
          );
          return res.status(401).send({
            message: "Email does not match with Email from the given Email",
          });
        }
        if (searchId[0].phoneNumber !== searchEmail[0].phoneNumber) {
          console.log(
            "phoneNumber does not match with phoneNumber from Email----userController"
          );
          return res.status(401).send({
            message:
              "phoneNumber does not match with phoneNumber from the given Email",
          });
        }
      }
      const searchPhoneNumber = await searchUserByPhoneNumber(phoneNumber);
      if (searchPhoneNumber.length == 0) {
        console.log("Phone Number not found----userController");
        return res.status(400).send({
          message: "Phone Number not found.",
        });
      } else {
        if (searchId[0].id !== searchPhoneNumber[0].id) {
          console.log(
            "Id does not match with ID from phoneNumber----userController"
          );
          return res.status(401).send({
            message: "Id does not match with ID from the given phoneNumber",
          });
        }
        if (searchId[0].Email !== searchPhoneNumber[0].Email) {
          console.log(
            "Email does not match with Email from phoneNumber----userController"
          );
          return res.status(401).send({
            message:
              "Email does not match with Email from the given phoneNumber",
          });
        }
        if (searchId[0].phoneNumber !== searchPhoneNumber[0].phoneNumber) {
          console.log(
            "phoneNumber does not match with phoneNumber from phoneNumber----userController"
          );
          return res.status(401).send({
            message:
              "phoneNumber does not match with phoneNumber from the given phoneNumber",
          });
        }
      }

      //Comparision is done, now bcrypt the hashed password to match.
      console.log("searchId[0].password========", searchId[0].password);
      bcrypt
        .compare(password, searchId[0].password)
        .then((result) => {
          if (result == false) {
            console.log("Password is wrong.----userController");
            return res.status(400).send({
              message: "Wrong Password.",
            });
          }
          const sql = `UPDATE user SET password='${hashednewPassword}' WHERE id=${id}`;
          queryExecutor(sql);

          console.log("Password changed Successfully----userController");
          return res.status(200).send({
            message: "Password changed Successfully.",
          });
        })
        .catch((err) => {
          return res.status(400).send({
            message: err,
          });
        });
    } else {
      console.log("Id not found in the database!----userController");
      return res.status(404).send({
        message: "Id not found!",
      });
    }
  } catch (err) {
    console.log("Error is here----userController", err);
    res.status(500).send({
      message: err,
    });
  }
};

const forgetPasswordById = async (req, res) => {
  try {
    const email = req.body.email;

    const searchEmail = await searchUserByEmail(email);
    if (searchEmail.length == 0) {
      console.log(
        "Searchemail from forgetPasswordById function----userController",
        searchEmail
      );
      return res.status(404).send({
        message: "Email not found.",
      });
    }

    /////////////////////////////
    //Till here I have searched for the email and userid, and also compared both of them
    //Now here I need to use nodemailer to mail the otp, to generate the otp and store it to the database and compare it.

    const otp = Math.floor(1000 + Math.random() * 9000);
    console.log("otp-----userController", otp);
    console.log("Email-----userController", searchEmail[0].id);

    const url = `INSERT INTO otp_verification (userId, otp) VALUES (${searchEmail[0].id}, ${otp})`;
    await queryExecutor(url);

    // return res.status(200).send({
    //   otp: otp,
    // });
    //////////////////////////////////////////////////////////////////////////////////////////////

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      auth: {
        user: "hrms@dollarbirdinc.com",
        pass: "HRMS@db2023",
      },
    });
    const options = {
      from: "rishabhtest00@gmail.com",
      to: `"${email}"`,
      subject: "Forget Password Otp",
      text: `Here is your OTP ${otp} for verification.`,
    };
    transporter.sendMail(options, (error, info) => {
      if (error) {
        console.log("Error is here..", error);
        return;
      }
      console.log("Sent the email..", info.response);
      return res.status(200).send({
        message: "An OTP is sent to your email",
      });
    });
  } catch (err) {
    console.log("Error is here----userController", err);
    res.status(500).send({
      message: err,
    });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const email = req.body.email;
    const otp = req.body.otp;

    const url1 = `SELECT id FROM user WHERE email='${email}' AND status=true`;
    const searchId = await queryExecutor(url1);

    if (searchId.length == 0) {
      console.log("User not found.----userController");
      return res.status(404).send({
        message: "User not found.",
      });
    }

    const url2 = `SELECT * FROM otp_verification WHERE userId=${searchId[0].id} AND otp=${otp}`;
    const isOtpVerified = await queryExecutor(url2);

    if (isOtpVerified.length == 0) {
      console.log("Wrong Otp----userController");
      return res.status(400).send({
        message: "Wrong Otp.",
      });
    } else {
      const dltUrl = `DELETE FROM otp_verification WHERE id=${isOtpVerified[0].id} AND userId=${searchId[0].id} AND otp=${otp}`;
      await queryExecutor(dltUrl);
      return res.status(200).send({
        message: "Otp verified.",
      });
    }
  } catch (err) {
    console.log("Error is here----userController", err);
    res.status(500).send({
      message: err,
    });
  }
};

const newPassword = async (req, res) => {
  try {
    const data = req.body;
    const { newPassword, email } = data;

    const emailUrl = `SELECT * FROM user WHERE email='${email}'`;
    const searchEmai = await queryExecutor(emailUrl);
    if (searchEmai.length == 0) {
      return res.status(404).send({
        message: "Email not found.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const url = `UPDATE user SET password='${hashedPassword}' WHERE email='${email}'`;
    await queryExecutor(url);

    return res.status(200).send({
      message: "Password Updated successfully",
    });
  } catch (err) {
    console.log("Error is here----userController", err);
    res.status(500).send({
      message: err,
    });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const searchId = await searchUserById(id);
    if (searchId.length == 0) {
      console.log(
        "searchId from deleteUserById function----userController",
        searchId
      );
      return res.status(404).send({
        message: "Id not found.",
      });
    }

    const { email, password } = data;

    const searchEmail = await searchUserByEmail(email);
    if (searchEmail.length == 0) {
      console.log(
        "Searchemail from forgetPasswordById function----userController",
        searchEmail
      );
      return res.status(404).send({
        message: "Email not found.",
      });
    }

    if (
      searchId[0].id !== searchEmail[0].id ||
      searchId[0].Email !== searchEmail[0].Email ||
      searchId[0].phoneNumber !== searchEmail[0].phoneNumber
    ) {
      console.log("Id and Email are not of same user.----userController");
      return res.status(400).send({
        message: "Id and Email are not of same user.",
      });
    }

    bcrypt
      .compare(password, searchEmail[0].password)
      .then((result) => {
        //result==> true
        if (result) {
          const sql = `UPDATE user SET status= false WHERE id=${id}`;
          queryExecutor(sql);
          console.log("User is deleted.!----userController");
          return res.status(200).send({
            message: "User deleted successfully.",
          });
        } else {
          console.log("Password does not match.!----userController");
          return res.status(400).send({
            message: "Email ID and Password does not match.",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log("Error is here----userController", err);
    res.status(500).send({
      message: err,
    });
  }
};

module.exports = {
  createUser,
  signIn,
  getUserById,
  updateUserById,
  changePasswordById,
  forgetPasswordById,
  verifyOtp,
  newPassword,
  deleteUserById,
};
