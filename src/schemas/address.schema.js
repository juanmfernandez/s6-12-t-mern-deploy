exports.addressSchema = {
  street: {
    exists: {
      errorMessage: "Street Name is required",
      options: { checkFalsy: true },
    },
    isLength: { options: { min: 1, max: 32 }, errorMessage: "Street Name should be at least 1-32 characters" },
    isString: { errorMessage: "Street Name should be a string" },
  },
  number: {
    exists: {
      errorMessage: "Street number is required",
      options: { checkFalsy: true },
    },
    notEmpty: {
      errorMessage: "Street number not be empty",
    },
    isInt: {
      errorMessage: "Street number must be an integer/number",
    },
  },
  city: {
    exists: {
      errorMessage: "City is required",
      options: { checkFalsy: true },
    },
    isLength: { options: { min: 5, max: 32 }, errorMessage: "City should be at least 5-32 characters" },
    isString: { errorMessage: "City should be a string" },
  },
  state: {
    exists: {
      errorMessage: "State/province is required",
      options: { checkFalsy: true },
    },
    isLength: { options: { min: 5, max: 32 }, errorMessage: "State/province should be at least 1-32 characters" },
    isString: { errorMessage: "State/province should be a string" },
  },
  zipCode: {
    exists: {
      errorMessage: "ZipCode number is required",
      options: { checkFalsy: true },
    },
    notEmpty: {
      errorMessage: "ZipCode number not be empty",
    },
    isInt: {
      errorMessage: "ZipCode number must be an integer/number",
    },
  },
  country: {
    exists: {
      errorMessage: "Country is required",
      options: { checkFalsy: true },
    },
    isLength: { options: { min: 5, max: 32 }, errorMessage: "Country should be at least 1-32 characters" },
    isString: { errorMessage: "Country should be a string" },
  },
};