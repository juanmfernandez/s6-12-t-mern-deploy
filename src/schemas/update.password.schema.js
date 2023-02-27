exports.updatePasswordSchema = {
    email: {
        exists: { errorMessage: "E-mail is required" },
        isEmail: { errorMessage: "Please provide a valid e-mail" },
    },
    password: {
        exists: { errorMessage: "Password is required" },
        isStrongPassword: {
          errorMessage:
            "Password should be at least 8 characters and contain uppercase letters, lowercase letters, numbers and special characters",
        },
    },
    newPassword: {
        exists: { errorMessage: "New password is required" },
        isStrongPassword: {
          errorMessage:
            "New password should be at least 8 characters and contain uppercase letters, lowercase letters, numbers and special characters",
        },
    },
};