// console.log("Here is the code");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index.js");
const jwt = require("jsonwebtoken");
const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

// const app = require("../src/index.js");

const Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWFyY2hEYXRhIjp7ImlkIjozLCJOYW1lIjoiTmV3IE5hbWUiLCJFbWFpbCI6Im5ld21haWxAZ21haWwuY29tIiwicGhvbmVOdW1iZXIiOiI4ODk4OTA5ODkxIiwicGFzc3dvcmQiOiIkMmIkMTAkMTRUZ3RnRzdSQWlZYnZWcHQvc3g3dXRRT0xUY29rMkJCcGlkZkhWVENZYlRPaGxvQTI3YkMiLCJjcmVhdGVkX29uIjpudWxsLCJzdGF0dXMiOjF9LCJpYXQiOjE2ODQ5MjgyMjIsImV4cCI6MTY4NDkzMTgyMn0.SScYIXLskCu0cOuiOjjr_vTxKqQBWj96Yix4AU3Piv0`;

let id = 3;

describe.skip("Registration", () => {
  //Successfull case
  it("Test case for unique data", (done) => {
    const data = {
      firstName: "Random",
      lastName: "Person",
      email: "rishabhtest27@gmail.com",
      phoneNumber: "9690346489",
      password: "Test@007",
    };
    chai
      .request(app)
      .post("/registration")
      .send(data)
      .end((error, response) => {
        response.should.have.status(201);
        response.body.should.be.an("object");
        response.body.should.have.keys("message", "data");
        expect(response.body.message).eq("User created successfully.");
        response.body.data.should.be.an("object");
        response.body.data.should.have.keys(
          "firstName",
          "lastName",
          "email",
          "phoneNumber",
          "password",
          "id"
        );
        id = response.body.data.id;
        done();
      });
  });

  //Duplication Email
  it("Test case for Duplication Email", (done) => {
    const data = {
      firstName: "Rishabh",
      lastName: "Saxena",
      email: "rishabhtest00@gmail.com",
      phoneNumber: "9690697297",
      password: "Test@007",
    };
    chai
      .request(app)
      .post("/registration")
      .send(data)
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq("Email already exist.!");
        done();
      });
  });

  //Duplication PhoneNumber
  it("Test case for Duplication PhoneNumber", (done) => {
    const data = {
      firstName: "Rishabh",
      lastName: "Saxena",
      email: "rishabhs@gmail.com",
      phoneNumber: "9690697270",
      password: "Test@007",
    };
    chai
      .request(app)
      .post("/registration")
      .send(data)
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq("PhoneNumber alreadt exist.!");
        done();
      });
  });

  //No First Name
  it("Test case for No First Name", (done) => {
    const data = {
      firstName: "",
      lastName: "Saxena",
      email: "rishabhtest@gmail.com",
      phoneNumber: "9690697279",
      password: "Test@007",
    };
    chai
      .request(app)
      .post("/registration")
      .send(data)
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq("Please enter the First Name.");
        done();
      });
  });

  //No Last Name
  it("Test case for No Last Name", (done) => {
    const data = {
      firstName: "Kumar",
      lastName: "",
      email: "rishabhtest@gmail.com",
      phoneNumber: "9690697279",
      password: "Test@007",
    };
    chai
      .request(app)
      .post("/registration")
      .send(data)
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq("Please enter the Last Name.");
        done();
      });
  });

  //No Email
  it("Test case for No Email", (done) => {
    const data = {
      firstName: "Kumar",
      lastName: "Saxena",
      email: "",
      phoneNumber: "9690697279",
      password: "Test@007",
    };
    chai
      .request(app)
      .post("/registration")
      .send(data)
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq("Please enter the Email.");
        done();
      });
  });

  //Invalid Email
  it("Test case for Invalid Email", (done) => {
    const data = {
      firstName: "Kumar",
      lastName: "Saxena",
      email: "maheshgmail.com",
      phoneNumber: "9690697279",
      password: "Test@007",
    };
    chai
      .request(app)
      .post("/registration")
      .send(data)
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq("Please enter a valid email address.");
        done();
      });
  });

  //No PhoneNumber
  it("Test case for No PhoneNumber", (done) => {
    const data = {
      firstName: "Kumar",
      lastName: "Saxena",
      email: "mahesh1@gmail.com",
      phoneNumber: "",
      password: "Test@007",
    };
    chai
      .request(app)
      .post("/registration")
      .send(data)
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq("Please enter the phoneNumber.");
        done();
      });
  });

  //Invalid PhoneNumber
  it("Test case for Invalid PhoneNumber", (done) => {
    const data = {
      firstName: "Kumar",
      lastName: "Saxena",
      email: "mahesh@gmail.com",
      phoneNumber: "9690679",
      password: "Test@007",
    };
    chai
      .request(app)
      .post("/registration")
      .send(data)
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq("Please enter a valid phoneNumber.");
        done();
      });
  });

  //No Password
  it("Test case for No Password", (done) => {
    const data = {
      firstName: "Kumar",
      lastName: "Saxena",
      email: "mahesh1@gmail.com",
      phoneNumber: "9621054970",
      password: "",
    };
    chai
      .request(app)
      .post("/registration")
      .send(data)
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq("Please enter the password.");
        done();
      });
  });

  //Invalid Password
  it("Test case for Invalid Password", (done) => {
    const data = {
      firstName: "Kumar",
      lastName: "Saxena",
      email: "mahesh@gmail.com",
      phoneNumber: "9090697900",
      password: "1234",
    };
    chai
      .request(app)
      .post("/registration")
      .send(data)
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq(
          "Password must contain 1 Number, 1 special character, 1 lower case character & 1 upper case character with minimum length of 8 and maximum length of 16."
        );
        done();
      });
  });
});

let token = "";
describe.skip("Login", () => {
  // Right case
  it("Test case for right credentials", (done) => {
    const cred = {
      email: "rishabhtest00@gmail.com",
      password: "Test!@007",
    };
    chai
      .request(app)
      .post("/signIn")
      .send(cred)
      .end((error, response) => {
        if (error) {
          console.log("Error is coming from here..", error);
          done(error); // Pass the error to the done function
        }

        response.should.have.status(200);
        response.body.should.be.an("object");
        response.body.should.have.keys("message", "userId", "token");
        expect(response.body.message).to.be.equal("logIn successfull");
        token = response.body.token;
        done(); // Call done when the test case is complete
      });
  });

  // Wrong Email
  it("Test case for Wrong Email", (done) => {
    const cred = {
      email: "rishabhtest9@gmail.com",
      password: "Abc@1234",
    };
    chai
      .request(app)
      .post("/signIn")
      .send(cred)
      .end((error, response) => {
        if (error) console.log("Error is coming from here..", error);

        response.should.have.status(404);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).to.be.equal("Email not found.");
        done();
      });
  });

  // No email address
  it("Test case for No email address", (done) => {
    const cred = {
      email: "",
      password: "Abc@1234",
    };
    chai
      .request(app)
      .post("/signIn")
      .send(cred)
      .end((error, response) => {
        if (error) console.log("Error is coming from here..", error);

        response.should.have.status(400);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).to.be.equal("Please enter the Email.");
        done();
      });
  });

  //Invalid Email
  it("Test case for No email address", (done) => {
    const cred = {
      email: "rishabhtest00@gmailcom",
      password: "Abc@1234",
    };
    chai
      .request(app)
      .post("/signIn")
      .send(cred)
      .end((error, response) => {
        if (error) console.log("Error is coming from here..", error);

        response.should.have.status(400);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).to.be.equal(
          "Please enter a valid email address."
        );
        done();
      });
  });

  // No password
  it("Test case for No email address", (done) => {
    const cred = {
      email: "rishabhtest00@gmail.com",
      password: "",
    };
    chai
      .request(app)
      .post("/signIn")
      .send(cred)
      .end((error, response) => {
        if (error) console.log("Error is coming from here..", error);

        response.should.have.status(400);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).to.be.equal("Please enter the password.");
        done();
      });
  });

  // Wrong password
  it("Test case for No email address", (done) => {
    const cred = {
      email: "rishabhtest00@gmail.com",
      password: "Abc@123",
    };
    chai
      .request(app)
      .post("/signIn")
      .send(cred)
      .end((error, response) => {
        if (error) console.log("Error is coming from here..", error);

        response.should.have.status(400);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).to.be.equal("Incorrect Password.");
        done();
      });
  });
});

// let Authorization = "Bearer " + token;

describe.skip("Update User", () => {
  //Successfull case
  it("Test case for new data", (done) => {
    console.log("Authorization=====", Authorization);
    // const id = 3;
    const data = {
      firstName: "New",
      lastName: "Name",
      email: "newmail@gmail.com",
      phoneNumber: "8898909891",
    };
    chai
      .request(app)
      .put(`/updateUser/${id}`)
      .set({
        Authorization: Authorization,
      })
      .send(data)
      .end((error, response) => {
        if (error) console.log("Error is coming from here..", error);
        response.should.have.status(201);
        response.body.should.be.an("object");
        response.body.should.have.keys("message", "data");
        expect(response.body.message).eq("User updated successfully.");
        response.body.data.should.be.an("object");
        response.body.data.should.have.keys("email", "fullName", "phoneNumber");
        done();
      });
  });

  //Invalid PhoneNumber
  it("Test case for Invalid PhoneNumber", (done) => {
    // const id = 3;
    const data = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "80898909890",
    };
    chai
      .request(app)
      .put(`/updateUser/${id}`)
      .set({
        Authorization: Authorization,
      })
      .send(data)
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq("Please enter a valid phoneNumber.");
        done();
      });
  });

  //Wrong userId
  it("Test case for Invalid PhoneNumber", (done) => {
    const id = 4;
    const data = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "8089809890",
    };
    chai
      .request(app)
      .put(`/updateUser/${id}`)
      .set({
        Authorization: Authorization,
      })
      .send(data)
      .end((error, response) => {
        response.should.have.status(401);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq("UserId does not match.");
        done();
      });
  });

  //Invalid Email
  it("Test case for Invalid Email", (done) => {
    // const id = 3;
    const data = {
      firstName: "",
      lastName: "",
      email: "test@gamilcom",
      phoneNumber: "",
    };
    chai
      .request(app)
      .put(`/updateUser/${id}`)
      .set({
        Authorization: Authorization,
      })
      .send(data)
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq("Please enter a valid email address.");
        done();
      });
  });
});

describe.skip("Change Password", () => {
  //Successfull case
  it("Test case for Successful", (done) => {
    const id = 3;
    const data = {
      email: " newmail@gmail.com",
      phoneNumber: "9988776655",
      password: "Test@007",
      newPassword: "Test@007",
      confirmPassword: "Test@007",
    };
    chai
      .request(app)
      .put(`/changePassword/${id}`)
      .set({
        Authorization: Authorization,
      })
      .send(data)
      .end((error, response) => {
        response.should.have.status(200);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq("Password changed Successfully.");
        done();
      });
  });

  //Wrong Email
  it("Test case for Wrong Email", (done) => {
    const id = 3;
    const data = {
      email: "rishabhtest0@gmail.com",
      phoneNumber: "9988776655",
      password: "Abc@1234",
      newPassword: "Test@007",
      confirmPassword: "Test@007",
    };
    chai
      .request(app)
      .put(`/changePassword/${id}`)
      .set({
        Authorization: Authorization,
      })
      .send(data)
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq("Email not found.");
        done();
      });
  });

  //Wrong PhoneNumber
  it("Test case for Wrong PhoneNumber", (done) => {
    const id = 3;
    const data = {
      email: "newmail@gmail.com",
      phoneNumber: "9988776607",
      password: "Abc@1234",
      newPassword: "Test@007",
      confirmPassword: "Test@007",
    };
    chai
      .request(app)
      .put(`/changePassword/${id}`)
      .set({
        Authorization: Authorization,
      })
      .send(data)
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq("Phone Number not found.");
        done();
      });
  });

  //Wrong Password
  it("Test case for Wrong Password", (done) => {
    const id = 3;
    const data = {
      email: "newmail@gmail.com",
      phoneNumber: "8898909891",
      password: "Test@00",
      newPassword: "Test@007",
      confirmPassword: "Test@007",
    };
    chai
      .request(app)
      .put(`/changePassword/${id}`)
      .set({
        Authorization: Authorization,
      })
      .send(data)
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq("Wrong Password.");
        done();
      });
  });

  //Invalid newPassword
  it("Test case for Invalid newPassword", (done) => {
    const id = 3;
    const data = {
      email: "newmail@gmail.com",
      phoneNumber: "9988776655",
      password: "Test@007",
      newPassword: "Test007",
      confirmPassword: "Test@007",
    };
    chai
      .request(app)
      .put(`/changePassword/${id}`)
      .set({
        Authorization: Authorization,
      })
      .send(data)
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq(
          "Password must contain 1 Number, 1 special character, 1 lower case character & 1 upper case character with minimum length of 8 and maximum length of 16."
        );
        done();
      });
  });

  // Password not match with confirmPassword
  it("Test case for Password not match with confirmPassword", (done) => {
    const id = 3;
    const data = {
      email: "newmail@gmail.com",
      phoneNumber: "9988776655",
      password: "Test@007",
      newPassword: "Test@007",
      confirmPassword: "Tesdt@007",
    };
    chai
      .request(app)
      .put(`/changePassword/${id}`)
      .set({
        Authorization: Authorization,
      })
      .send(data)
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq(
          "newPassword does not match with confirmPassword"
        );
        done();
      });
  });

  // No email
  it("Test case for  No email", (done) => {
    const id = 3;
    const data = {
      email: "",
      phoneNumber: "9988776655",
      password: "Test@007",
      newPassword: "Test@007",
      confirmPassword: "Tesdt@007",
    };
    chai
      .request(app)
      .put(`/changePassword/${id}`)
      .set({
        Authorization: Authorization,
      })
      .send(data)
      .end((error, response) => {
        response.should.have.status(404);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq("Please enter the Email.");
        done();
      });
  });

  // No PhoneNumber
  it("Test case for  No PhoneNumber", (done) => {
    const id = 3;
    const data = {
      email: "newmail@gmail.com",
      phoneNumber: "",
      password: "Test@007",
      newPassword: "Test@007",
      confirmPassword: "Tesdt@007",
    };
    chai
      .request(app)
      .put(`/changePassword/${id}`)
      .set({
        Authorization: Authorization,
      })
      .send(data)
      .end((error, response) => {
        response.should.have.status(404);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq("Please enter the phoneNumber.");
        done();
      });
  });

  // No Password
  it("Test case for  No Password", (done) => {
    const id = 3;
    const data = {
      email: "newmail@gmail.com",
      phoneNumber: "9988776655",
      password: "",
      newPassword: "Test@007",
      confirmPassword: "Tesdt@007",
    };
    chai
      .request(app)
      .put(`/changePassword/${id}`)
      .set({
        Authorization: Authorization,
      })
      .send(data)
      .end((error, response) => {
        response.should.have.status(404);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq("Please enter the password.");
        done();
      });
  });

  //Wrong userId
  it("Test case for Invalid PhoneNumber", (done) => {
    const id = 4;
    const data = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "8089809890",
    };
    chai
      .request(app)
      .put(`/updateUser/${id}`)
      .set({
        Authorization: Authorization,
      })
      .send(data)
      .end((error, response) => {
        response.should.have.status(401);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq("UserId does not match.");
        done();
      });
  });
});

// describe("Forget Password", () => {
//   //Successfull case
//   it("Test case for Successful", (done) => {
//     const data = {
//       email: "newmail@gmail.com",
//     };
//     chai
//       .request(app)
//       .put(`/forgetPassword`)
//       .send(data)
//       .end((error, response) => {
//         response.should.have.status(200);
//         response.body.should.be.an("object");
//         response.body.should.have.keys("message");
//         done();
//       });
//   });

//   // Wrong Email
//   it("Test case for Wrong Email", (done) => {
//     const data = {
//       email: "rish@gmail.com",
//     };
//     chai
//       .request(app)
//       .put(`/forgetPassword`)
//       .send(data)
//       .end((error, response) => {
//         response.should.have.status(404);
//         response.body.should.be.an("object");
//         response.body.should.have.keys("message");
//         expect(response.body.message).eq("Email not found.");
//         done();
//       });
//   });
// });

describe.skip("newPassword", () => {
  //Successfull case
  it("Test case for Successful", (done) => {
    const data = {
      email: "newmail@gmail.com",
      newPassword: "Test!@007",
      confirmPassword: "Test!@007",
    };
    chai
      .request(app)
      .put(`/newPassword`)
      .send(data)
      .end((error, response) => {
        response.should.have.status(200);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq("Password Updated successfully");
        done();
      });
  });

  //Wrong Email
  it("Test case for /Wrong Email", (done) => {
    const data = {
      email: "newmail@gmail.com",
      newPassword: "Test!@007",
      confirmPassword: "Test!@007",
    };
    chai
      .request(app)
      .put(`/newPassword`)
      .send(data)
      .end((error, response) => {
        response.should.have.status(404);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq("Email not found.");
        done();
      });
  });

  //Password not match
  it("Test case for Password not match", (done) => {
    const data = {
      email: "newmail@gmail.com",
      newPassword: "Test!007",
      confirmPassword: "Test!@007",
    };
    chai
      .request(app)
      .put(`/newPassword`)
      .send(data)
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq(
          "newPassword does not match with confirmPassword"
        );
        done();
      });
  });
});

describe.skip("AddAddress", () => {
  //No City
  it("Test case for No City", (done) => {
    // const id = 3;
    const data = {
      city: "",
      state: "random01",
      pinCode: "123457",
      addressName: "Any",
      addressPhoneNumber: "9786756411",
    };
    chai
      .request(app)
      .post(`/addAddress/${id}`)
      .set({
        Authorization: Authorization,
      })
      .send(data)
      .end((error, response) => {
        response.should.have.status(404);
        expect(response.body.message).eq("Please enter the City.");
        done();
      });
  });

  //No State
  it("Test case for No State", (done) => {
    // const id = 3;
    const data = {
      city: "Any01",
      state: "",
      pinCode: "123457",
      addressName: "Any",
      addressPhoneNumber: "9786756411",
    };
    chai
      .request(app)
      .post(`/addAddress/${id}`)
      .set({
        Authorization: Authorization,
      })
      .send(data)
      .end((error, response) => {
        response.should.have.status(404);
        expect(response.body.message).eq("Please enter the state.");
        done();
      });
  });

  //No Pincode
  it("Test case for No Pincode", (done) => {
    // const id = 3;
    const data = {
      city: "Any01",
      state: "random01",
      pinCode: "",
      addressName: "Any",
      addressPhoneNumber: "9786756411",
    };
    chai
      .request(app)
      .post(`/addAddress/${id}`)
      .set({
        Authorization: Authorization,
      })
      .send(data)
      .end((error, response) => {
        response.should.have.status(404);
        expect(response.body.message).eq("Please enter the pinCode.");
        done();
      });
  });

  //No Name
  it("Test case for No Name", (done) => {
    // const id = 3;
    const data = {
      city: "Any01",
      state: "random01",
      pinCode: "123457",
      addressName: "",
      addressPhoneNumber: "9786756411",
    };
    chai
      .request(app)
      .post(`/addAddress/${id}`)
      .set({
        Authorization: Authorization,
      })
      .send(data)
      .end((error, response) => {
        response.should.have.status(404);
        expect(response.body.message).eq(
          "Please enter the Name of the receiving person."
        );
        done();
      });
  });

  //No PhoneNumber
  it("Test case for No PhoneNumber", (done) => {
    // const id = 3;
    const data = {
      city: "Any01",
      state: "random01",
      pinCode: "123457",
      addressName: "Any",
      addressPhoneNumber: "",
    };
    chai
      .request(app)
      .post(`/addAddress/${id}`)
      .set({
        Authorization: Authorization,
      })
      .send(data)
      .end((error, response) => {
        response.should.have.status(404);
        expect(response.body.message).eq("Please enter the phoneNumber.");
        done();
      });
  });

  //Wrong userId
  it("Test case for Invalid PhoneNumber", (done) => {
    const id = 4;
    const data = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "8089809890",
    };
    chai
      .request(app)
      .put(`/updateUser/${id}`)
      .set({
        Authorization: Authorization,
      })
      .send(data)
      .end((error, response) => {
        response.should.have.status(401);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq("UserId does not match.");
        done();
      });
  });
});

describe.skip("getAddresses", () => {
  //Successful case
  it("Test case for Successful", (done) => {
    // const id = 3;
    chai
      .request(app)
      .get(`/getAllAddresses/${id}`)
      .set({
        Authorization: Authorization,
      })
      .end((error, response) => {
        response.should.have.status(200);
        response.body.should.be.an("object");
        response.body.should.have.keys("Address");
        response.body.Address.should.be.an("array");
        response.body.Address[0].should.be.an("object");
        response.body.Address[0].should.have.keys(
          "id",
          "Name",
          "phoneNumber",
          "city",
          "state",
          "pinCode"
        );
        done();
      });
  });

  //Wrong user
  it("Test case for Wrong user", (done) => {
    const id = 4;
    chai
      .request(app)
      .get(`/getAllAddresses/${id}`)
      .set({
        Authorization: Authorization,
      })
      .end((error, response) => {
        response.should.have.status(401);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq("UserId does not match.");
        done();
      });
  });
});

describe.skip("Update Address", () => {
  //Successfull case
  it("Test case for Successful", (done) => {
    // const id = 3;
    const addressId = 11;
    const data = {
      addressPhoneNumber: "9234567890",
    };
    chai
      .request(app)
      .put(`/updateAddress/${id}/${addressId}`)
      .set({
        Authorization: Authorization,
      })
      .send(data)
      .end((error, response) => {
        response.should.have.status(200);
        response.body.should.be.an("object");
        response.body.should.have.keys("message", "newAddress");
        expect(response.body.message).eq("Address updated successfully.");
        response.body.newAddress.should.be.an("object");
        response.body.newAddress.should.have.keys(
          "city",
          "state",
          "pinCode",
          "addressPhoneNumber",
          "addressName"
        );
        done();
      });
  });

  //Invalid PhoneNumber
  it("Test case for Invalid PhoneNumber", (done) => {
    // const id = 3;
    const addressId = 9;
    const data = {
      addressPhoneNumber: "92345678990",
    };
    chai
      .request(app)
      .put(`/updateAddress/${id}/${addressId}`)
      .set({
        Authorization: Authorization,
      })
      .send(data)
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq("Please enter a valid phoneNumber.");
        done();
      });
  });

  //Wrong AddressId
  it("Test case for Wrong AddressId", (done) => {
    // const id = 3;
    const addressId = 6;
    const data = {
      addressPhoneNumber: "9234567890",
    };
    chai
      .request(app)
      .put(`/updateAddress/${id}/${addressId}`)
      .set({
        Authorization: Authorization,
      })
      .send(data)
      .end((error, response) => {
        response.should.have.status(404);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq("Address not found!");
        done();
      });
  });
});

describe.skip("Delete Address", () => {
  //Successfull case
  it("Test case for Successful", (done) => {
    // const id = 3;
    const addressId = 10;
    chai
      .request(app)
      .delete(`/deleteAddress/${id}/${addressId}`)
      .set({
        Authorization: Authorization,
      })
      .end((error, response) => {
        response.should.have.status(200);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq("Address deleted succussfully.");
        done();
      });
  });

  //Wrong Address
  it("Test case for Wrong Address", (done) => {
    // const id = 3;
    const addressId = 9;
    chai
      .request(app)
      .delete(`/deleteAddress/${id}/${addressId}`)
      .set({
        Authorization: Authorization,
      })
      .end((error, response) => {
        response.should.have.status(404);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq("Address not found!");
        done();
      });
  });

  //Wrong UserId
  it("Test case for Wrong UserId", (done) => {
    const id = 4;
    const addressId = 9;
    chai
      .request(app)
      .delete(`/deleteAddress/${id}/${addressId}`)
      .set({
        Authorization: Authorization,
      })
      .end((error, response) => {
        response.should.have.status(401);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq("UserId does not match.");
        done();
      });
  });
});

describe.skip("getAddressByAddressId", () => {
  //Successfull case
  it("Test case for Successful", (done) => {
    // const id = 3;
    const addressId = 11;
    chai
      .request(app)
      .get(`/getAddressByAddressId/${id}/${addressId}`)
      .set({
        Authorization: Authorization,
      })
      .end((error, response) => {
        response.should.have.status(200);
        response.body.should.be.an("object");
        response.body.should.have.keys("message", "Address");
        expect(response.body.message).eq("Address.");
        response.body.Address.should.be.an("array");
        response.body.Address[0].should.have.keys(
          "id",
          "userId",
          "city",
          "state",
          "pinCode",
          "addressName",
          "status",
          "addressPhoneNumber"
        );
        done();
      });
  });

  //Wrong UserId
  it("Test case for Wrong Address", (done) => {
    const id = 4;
    const addressId = 9;
    chai
      .request(app)
      .get(`/getAddressByAddressId/${id}/${addressId}`)
      .set({
        Authorization: Authorization,
      })
      .end((error, response) => {
        response.should.have.status(401);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq("UserId does not match.");
        done();
      });
  });
});

describe.skip("Getproducts", () => {
  //Successfull case
  it("Test case for Successful", (done) => {
    chai
      .request(app)
      .get(`/getAllProducts`)
      .end((error, response) => {
        response.should.have.status(200);
        response.body.should.be.an("object");
        response.body.should.have.keys("message", "Product");
        expect(response.body.message).eq("All products are out.");
        response.body.Product.should.be.an("array");
        response.body.Product[0].should.have.keys(
          "id",
          "productType",
          "productName",
          "productPrice",
          "productDetails",
          "productImage",
          "status"
        );
        done();
      });
  });
});

describe.skip("Wishlist", () => {
  //Successfull case
  it("Test case for Change the status of the product", (done) => {
    // const id = 3;
    const productId = 11;
    chai
      .request(app)
      .put(`/changeProductStatusInWishlist/${id}/${productId}`)
      .set({
        Authorization: Authorization,
      })
      .end((error, response) => {
        response.should.have.status(200);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq("OK");
        done();
      });
  });

  it("Test case for getting all the product", (done) => {
    // const id = 3;
    chai
      .request(app)
      .get(`/getAllAddresses/${id}`)
      .set({
        Authorization: Authorization,
      })
      .end((error, response) => {
        response.should.have.status(200);
        response.body.should.be.an("object");
        response.body.should.have.keys("Address");
        response.body.Address[0].should.be.an("object");
        response.body.Address[0].should.have.keys(
          "id",
          "Name",
          "phoneNumber",
          "city",
          "state",
          "pinCode"
        );
        done();
      });
  });
});

describe.skip("AddToCart", () => {
  //Successfull case
  it("Test case for Add to cart", (done) => {
    // const id = 3;
    const productId = 11;
    chai
      .request(app)
      .post(`/addToCart/${id}/${productId}`)
      .set({
        Authorization: Authorization,
      })
      .end((error, response) => {
        response.should.have.status(201);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq("Product has been added to the cart.");
        done();
      });
  });

  //Duplicate product
  it("Test case for already added to cart", (done) => {
    const id = 3;
    const productId = 10;
    chai
      .request(app)
      .post(`/addToCart/${id}/${productId}`)
      .set({
        Authorization: Authorization,
      })
      .end((error, response) => {
        response.should.have.status(200);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq(
          "This product is already in the cart."
        );
        done();
      });
  });

  //No product
  it("Test case for No product", (done) => {
    // const id = 3;
    const productId = 1;
    chai
      .request(app)
      .post(`/addToCart/${id}/${productId}`)
      .set({
        Authorization: Authorization,
      })
      .end((error, response) => {
        response.should.have.status(404);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq("Product not found.");
        done();
      });
  });
});

describe.skip("getProductsFromCart", () => {
  //Successfull case
  it("Test case for getProductsFromCart", (done) => {
    // const id = 3;
    chai
      .request(app)
      .get(`/getAllProductsFromCart/${id}`)
      .set({
        Authorization: Authorization,
      })
      .end((error, response) => {
        response.should.have.status(200);
        response.body.should.be.an("object");
        response.body.should.have.keys("message", "products");
        expect(response.body.message).eq("Products in cart.");
        response.body.products.should.be.an("array");
        response.body.products[0].should.have.keys(
          "id",
          "productType",
          "productName",
          "productPrice",
          "productDetails",
          "productImage",
          "Quantity"
        );
        done();
      });
  });
});

describe.skip("IncreaseProductQty", () => {
  //Successfull case
  it("Test case for Increase Product QTY", (done) => {
    const id = 3;
    const productId = 10;
    chai
      .request(app)
      .put(`/increaseProductQuantityBy1/${id}/${productId}`)
      .set({
        Authorization: Authorization,
      })
      .end((error, response) => {
        response.should.have.status(200);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq("Qunatity Increased by 1");
        done();
      });
  });

  //When the product is not present in to the cart
  it("Test case for the product is not present in to the cart", (done) => {
    const id = 3;
    const productId = 12;
    chai
      .request(app)
      .put(`/increaseProductQuantityBy1/${id}/${productId}`)
      .set({
        Authorization: Authorization,
      })
      .end((error, response) => {
        response.should.have.status(404);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq(
          "Product is not present in User's cart"
        );
        done();
      });
  });

  //No product
  it("Test case for No product", (done) => {
    const id = 3;
    const productId = 8;
    chai
      .request(app)
      .put(`/increaseProductQuantityBy1/${id}/${productId}`)
      .set({
        Authorization: Authorization,
      })
      .end((error, response) => {
        response.should.have.status(404);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq("Product not found.");
        done();
      });
  });
});

describe.skip("DecreaseProductQty", () => {
  //Successfull case
  it("Test case for Decrease Product QTY", (done) => {
    const id = 3;
    const productId = 10;
    chai
      .request(app)
      .put(`/decreaseProductQuantityBy1/${id}/${productId}`)
      .set({
        Authorization: Authorization,
      })
      .end((error, response) => {
        response.should.have.status(200);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq("Qunatity decreased by 1");
        done();
      });
  });

  //When the product is not present in to the cart
  it("Test case for the product is not present in to the cart", (done) => {
    const id = 3;
    const productId = 17;
    chai
      .request(app)
      .put(`/decreaseProductQuantityBy1/${id}/${productId}`)
      .set({
        Authorization: Authorization,
      })
      .end((error, response) => {
        response.should.have.status(404);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq(
          "Product is not present in User's cart"
        );
        done();
      });
  });

  //No product
  it("Test case for No product", (done) => {
    const id = 3;
    const productId = 8;
    chai
      .request(app)
      .put(`/decreaseProductQuantityBy1/${id}/${productId}`)
      .set({
        Authorization: Authorization,
      })
      .end((error, response) => {
        response.should.have.status(404);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq("Product not found.");
        done();
      });
  });
});

describe.skip("Delete product from cart", () => {
  //Successfull case
  it("Test case for Successful case", (done) => {
    // const id = 3;
    const productId = 10;
    chai
      .request(app)
      .delete(`/deleteProductfromCart/${id}/${productId}`)
      .set({
        Authorization: Authorization,
      })
      .end((error, response) => {
        response.should.have.status(200);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq("Product is deleted from the cart.");
        done();
      });
  });

  //When the product is not present in to the cart
  it("Test case for the product is not present in to the cart", (done) => {
    const id = 3;
    const productId = 10;
    chai
      .request(app)
      .put(`/deleteProductfromCart/${id}/${productId}`)
      .set({
        Authorization: Authorization,
      })
      .end((error, response) => {
        response.should.have.status(404);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq(
          "Product is not present in User's cart"
        );
        done();
      });
  });
});

describe.skip("singleProductById", () => {
  //Succussful case
  it("Test case for singleProductById", (done) => {
    // const id = 3;
    const productId = 11;
    chai
      .request(app)
      .get(`/getSingleProductById/${id}/${productId}`)
      .set({
        Authorization: Authorization,
      })
      .end((error, response) => {
        response.should.have.status(200);
        response.body.should.be.an("object");
        response.body.should.have.keys("message", "info", "bool");
        expect(response.body.message).eq("Product is present.");
        response.body.info.should.be.an("array");
        response.body.info[0].should.have.keys(
          "productId",
          "userId",
          "quantity",
          "productType",
          "productName",
          "productPrice",
          "productDetails",
          "productImage"
        );
        done();
      });
  });

  //No product in cart
  it("Test case for No product in cart", (done) => {
    // const id = 3;
    const productId = 10;
    chai
      .request(app)
      .get(`/getSingleProductById/${id}/${productId}`)
      .set({
        Authorization: Authorization,
      })
      .end((error, response) => {
        response.should.have.status(200);
        response.body.should.be.an("object");
        response.body.should.have.keys("message", "info", "bool");
        expect(response.body.message).eq("Product is not present.");
        response.body.info.should.be.an("array");
        done();
      });
  });
});

describe.skip("Order Product", () => {
  //Succussful case
  it("Test case for Ordering the product", (done) => {
    // const id = 3;
    const productId = 12;
    chai
      .request(app)
      .post(`/orderProduct/${id}/${productId}`)
      .set({
        Authorization: Authorization,
      })
      .end((error, response) => {
        response.should.have.status(201);
        response.body.should.be.an("object");
        response.body.should.have.keys("message", "orderDetails");
        expect(response.body.message).eq("Order Placed.");
        response.body.orderDetails.should.be.an("object");
        response.body.orderDetails.should.have.keys(
          "userId",
          "productId",
          "productType",
          "productName",
          "productPrice",
          "productImage",
          "totalPrice",
          "purchasingPerson",
          "city",
          "state",
          "pinCode",
          "addressName",
          "addressPhoneNumber"
        );
        done();
      });
  });
});

describe.skip("Update the order", () => {
  //No city
  it("Test case for No city", (done) => {
    // const id = 3;
    const orderId = 44;
    const data = {
      productQuantity: 5,
      orderCiy: "",
      orderState: "NewState",
      orderPinCode: "987654",
      orderAddressPhoneNumber: "8352617689",
      orderAddressName: "Oh boy!",
    };
    chai
      .request(app)
      .put(`/updateOrder/${id}/${orderId}`)
      .set({
        Authorization: Authorization,
      })
      .send(data)
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq("Enter the name of the City.");
        done();
      });
  });

  //No State
  it("Test case for No State", (done) => {
    // const id = 3;
    const orderId = 44;
    const data = {
      productQuantity: 5,
      orderCiy: "NewState",
      orderState: "",
      orderPinCode: "987654",
      orderAddressPhoneNumber: "8352617689",
      orderAddressName: "Oh boy!",
    };
    chai
      .request(app)
      .put(`/updateOrder/${id}/${orderId}`)
      .set({
        Authorization: Authorization,
      })
      .send(data)
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq("Enter State.");
        done();
      });
  });

  //No PinCode
  it("Test case for No PinCode", (done) => {
    // const id = 3;
    const orderId = 44;
    const data = {
      productQuantity: 5,
      orderCiy: "NewState",
      orderState: "PinCode",
      orderPinCode: "",
      orderAddressPhoneNumber: "8352617689",
      orderAddressName: "Oh boy!",
    };
    chai
      .request(app)
      .put(`/updateOrder/${id}/${orderId}`)
      .set({
        Authorization: Authorization,
      })
      .send(data)
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq("Enter PinCode.");
        done();
      });
  });

  //No PhoneNumber
  it("Test case for No PhoneNumber", (done) => {
    // const id = 3;
    const orderId = 44;
    const data = {
      productQuantity: 5,
      orderCiy: "newCity",
      orderState: "NewState",
      orderPinCode: "987654",
      orderAddressPhoneNumber: "",
      orderAddressName: "Oh boy!",
    };
    chai
      .request(app)
      .put(`/updateOrder/${id}/${orderId}`)
      .set({
        Authorization: Authorization,
      })
      .send(data)
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq("Enter PhoneNumber of the Receiver.");
        done();
      });
  });

  //No Name
  it("Test case for No Name", (done) => {
    // const id = 3;
    const orderId = 44;
    const data = {
      productQuantity: 5,
      orderCiy: "newCity",
      orderState: "NewState",
      orderPinCode: "987654",
      orderAddressPhoneNumber: "8352617689",
      orderAddressName: "",
    };
    chai
      .request(app)
      .put(`/updateOrder/${id}/${orderId}`)
      .set({
        Authorization: Authorization,
      })
      .send(data)
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq("Enter Name of the Receiver.");
        done();
      });
  });
});

describe.skip("Cancel order", () => {
  //Succussful case
  it("Test case for Succussful case", (done) => {
    // const id = 3;
    const orderId = 59;
    chai
      .request(app)
      .put(`/cancelOrder/${id}/${orderId}`)
      .set({
        Authorization: Authorization,
      })
      .end((error, response) => {
        response.should.have.status(200);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq("Order Cancelled.");
        done();
      });
  });

  //non active order
  it("Test case for non active order", (done) => {
    // const id = 3;
    const orderId = 54;
    chai
      .request(app)
      .put(`/cancelOrder/${id}/${orderId}`)
      .set({
        Authorization: Authorization,
      })
      .end((error, response) => {
        response.should.have.status(400);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq(
          "Order can only be cancelled when the order is active."
        );
        done();
      });
  });

  //non existing order
  it("Test case for non existing order", (done) => {
    // const id = 3;
    const orderId = 40;
    chai
      .request(app)
      .put(`/cancelOrder/${id}/${orderId}`)
      .set({
        Authorization: Authorization,
      })
      .end((error, response) => {
        response.should.have.status(404);
        response.body.should.be.an("object");
        response.body.should.have.keys("message");
        expect(response.body.message).eq("Order not found.");
        done();
      });
  });
});

describe.skip("GetAll orders", () => {
  //Succussful case
  it("Test case for Succussful case", (done) => {
    // const id = 3;
    chai
      .request(app)
      .put(`/getAllOrders/${id}`)
      .set({
        Authorization: Authorization,
      })
      .end((error, response) => {
        response.should.have.status(200);
        response.body.should.be.an("object");
        response.body.should.have.keys("message", "Orders");
        expect(response.body.message).eq("All orders.");
        response.body.Orders.should.be.an("array");
        response.body.Orders[0].should.be.an("object");
        response.body.Orders[0].should.have.keys(
          "orderId",
          "productId",
          "productType",
          "productName",
          "productPrice",
          "productImage",
          "productQuantity",
          "totalPrice",
          "orderCity",
          "orderState",
          "orderPinCode",
          "orderAddressPhoneNumber",
          "orderAddressName",
          "orderDate",
          "delieveryDate",
          "status"
        );
        done();
      });
  });
});
