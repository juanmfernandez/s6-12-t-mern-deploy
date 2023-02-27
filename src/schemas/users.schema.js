exports.user = {
    name: {
        exists: { errorMessage: "Name is required" },
        isLength: { options: { min: 3, max: 20 }, errorMessage: "First Name should be at least 3-20 characters" },
        isString: { errorMessage: "First Name should be a string" },
    },
    lastName: {
        exists: { errorMessage: "Last Name is required" },
        isLength: { options: { min: 3, max: 20 }, errorMessage: "Last Name should be at least 3-20 characters" },
        isString: { errorMessage: "Last name should be a string" },
    },
    password: {
        exists: { errorMessage: "Password is required" },
        isStrongPassword: {
            errorMessage:
                "Password should be at least 8 characters and contain uppercase letters, lowercase letters, numbers and special characters",
        },
    },
    email: {
        exists: { errorMessage: "E-mail is required" },
        isEmail: { errorMessage: "Please provide a valid e-mail" },
    },
};