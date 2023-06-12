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

// ===================================Logics===================================

const createProductValidation = (req, res, next) => {
  try {
    const data = req.body;

    if (isBodyEmpty(data)) {
      console.log("Please enter some data.----MIDDLEWARE PRODUCT_VALIDATION");
      return res.status(400).send({
        message: "Please enter the data.",
      });
    }

    const {
      productName,
      productType,
      productPrice,
      productDetails,
      productImage,
    } = data;

    //productName
    if (!isEmpty(productName)) {
      console.log(
        "Enter the Name of the product----MIDDLEWARE PRODUCT_VALIDATION"
      );
      return res.status(400).send({
        message: "Enter the Name of the product.",
      });
    }
    if (!isValidType(productName)) {
      console.log(
        "Enter the Name of the product in right format----MIDDLEWARE PRODUCT_VALIDATION"
      );
      return res.status(400).send({
        message: "Enter the Name of the product in right format.",
      });
    }

    //productType
    if (!isEmpty(productType)) {
      console.log(
        "Enter the Type of the product----MIDDLEWARE PRODUCT_VALIDATION"
      );
      return res.status(400).send({
        message: "Enter the Type of the product.",
      });
    }
    if (!isValidType(productType)) {
      console.log(
        "Enter the Type of the product in right format----MIDDLEWARE PRODUCT_VALIDATION"
      );
      return res.status(400).send({
        message: "Enter the type of the product in right format.",
      });
    }

    //productPrice
    if (!isEmpty(productPrice)) {
      console.log(
        "Enter the Price of the product----MIDDLEWARE PRODUCT_VALIDATION"
      );
      return res.status(400).send({
        message: "Enter the Price of the product.",
      });
    }
    if (!isValidType(productPrice)) {
      console.log(
        "Enter the Price of the product in right format----MIDDLEWARE PRODUCT_VALIDATION"
      );
      return res.status(400).send({
        message: "Enter the Price of the product in right format.",
      });
    }

    //productDetails
    if (!isEmpty(productDetails)) {
      console.log(
        "Enter the Details of the product----MIDDLEWARE PRODUCT_VALIDATION"
      );
      return res.status(400).send({
        message: "Enter the Details of the product.",
      });
    }
    if (!isValidType(productDetails)) {
      console.log(
        "Enter the Details of the product in right format----MIDDLEWARE PRODUCT_VALIDATION"
      );
      return res.status(400).send({
        message: "Enter the Details of the product in right format.",
      });
    }

    //productImage
    if (productImage) {
      if (!isEmpty(productImage)) {
        console.log(
          "Enter the Images of the product----MIDDLEWARE PRODUCT_VALIDATION"
        );
        return res.status(400).send({
          message: "Enter the Images of the product.",
        });
      }
      if (!isValidType(productImage)) {
        console.log(
          "Enter the Images of the product in right format----MIDDLEWARE PRODUCT_VALIDATION"
        );
        return res.status(400).send({
          message: "Enter the Images of the product in right format.",
        });
      }
    }
    next();
  } catch (err) {
    console.log("Error is from here.----MIDDLEWARE PRODUCT_VALIDATION");
    return res.status(500).send({
      message: "Error is here.",
      error: err,
    });
  }
};

const updateProductValidation = (req, res, next) => {
  try {
    const data = req.body;

    if (isBodyEmpty(data)) {
      console.log("Please enter some data.----MIDDLEWARE PRODUCT_VALIDATION");
      return res.status(400).send({
        message: "Please enter the data.",
      });
    }

    const {
      productName,
      productType,
      productPrice,
      productDetails,
      productImage,
    } = data;

    //productName
    if (productName) {
      if (!isEmpty(productName)) {
        console.log(
          "Enter the Name of the product----MIDDLEWARE PRODUCT_VALIDATION"
        );
        return res.status(400).send({
          message: "Enter the Name of the product.",
        });
      }
      if (!isValidType(productName)) {
        console.log(
          "Enter the Name of the product in right format----MIDDLEWARE PRODUCT_VALIDATION"
        );
        return res.status(400).send({
          message: "Enter the Name of the product in right format.",
        });
      }
    }

    //productType
    if (productType) {
      if (!isEmpty(productType)) {
        console.log(
          "Enter the Type of the product----MIDDLEWARE PRODUCT_VALIDATION"
        );
        return res.status(400).send({
          message: "Enter the Type of the product.",
        });
      }
      if (!isValidType(productType)) {
        console.log(
          "Enter the Type of the product in right format----MIDDLEWARE PRODUCT_VALIDATION"
        );
        return res.status(400).send({
          message: "Enter the type of the product in right format.",
        });
      }
    }

    //productPrice
    if (productPrice) {
      if (!isEmpty(productPrice)) {
        console.log(
          "Enter the Price of the product----MIDDLEWARE PRODUCT_VALIDATION"
        );
        return res.status(400).send({
          message: "Enter the Price of the product.",
        });
      }
      if (!isValidType(productPrice)) {
        console.log(
          "Enter the Price of the product in right format----MIDDLEWARE PRODUCT_VALIDATION"
        );
        return res.status(400).send({
          message: "Enter the Price of the product in right format.",
        });
      }
    }

    //productDetails
    if (productDetails) {
      if (!isEmpty(productDetails)) {
        console.log(
          "Enter the Details of the product----MIDDLEWARE PRODUCT_VALIDATION"
        );
        return res.status(400).send({
          message: "Enter the Details of the product.",
        });
      }
      if (!isValidType(productDetails)) {
        console.log(
          "Enter the Details of the product in right format----MIDDLEWARE PRODUCT_VALIDATION"
        );
        return res.status(400).send({
          message: "Enter the Details of the product in right format.",
        });
      }
    }

    //productImage
    if (productImage) {
      if (!isEmpty(productImage)) {
        console.log(
          "Enter the Images of the product----MIDDLEWARE PRODUCT_VALIDATION"
        );
        return res.status(400).send({
          message: "Enter the Images of the product.",
        });
      }
      if (!isValidType(productImage)) {
        console.log(
          "Enter the Images of the product in right format----MIDDLEWARE PRODUCT_VALIDATION"
        );
        return res.status(400).send({
          message: "Enter the Images of the product in right format.",
        });
      }
    }
    next();
  } catch (err) {
    console.log("Error is from here.----MIDDLEWARE PRODUCT_VALIDATION");
    return res.status(500).send({
      message: "Error is here.",
      error: err,
    });
  }
};

module.exports = {
  createProductValidation,
  updateProductValidation,
};
