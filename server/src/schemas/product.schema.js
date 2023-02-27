exports.productSchema = {
    name: {
      exists: {
        errorMessage: "Product Name is required",
        options: { checkFalsy: true },
      },
      isLength: {options: { min: 5, max: 64}, errorMessage: "Product Name should be at least 5-64 characters"},
      isString: { errorMessage: "Product Name should be a string" },
    },
    description: {
      exists: {
        errorMessage: "Description is required",
        options: { checkFalsy: true },
      },
      isLength: {options: { min: 8, max: 254}, errorMessage: "Description should be at least 8-254 characters"},
      isString: { errorMessage: "Description should be a string" },
    },
    quantityInStock: {
      exists: {
        errorMessage: "Stock is required",
        options: { checkFalsy: true },
      },
      notEmpty: {
        errorMessage: "Stock is empty",
      },
      isInt: {
        errorMessage: "Stock must be an integer/number",
      },
    },
    price: {
      exists: { errorMessage: "Price is required" },
      isNumeric: { errorMessage: "Price should be a float" },
      notEmpty: {
        errorMessage: "Price not be empty",
      },
    },
  };