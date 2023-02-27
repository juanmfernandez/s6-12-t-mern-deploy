exports.updateUserSchema = {
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
    email: {
        exists: { errorMessage: "E-mail is required" },
        isEmail: { errorMessage: "Please provide a valid e-mail" },
    },
    documentId: {
        exists: { errorMessage: "DocumentId is required" },
        isLength: { options: { min: 6, max: 20 }, errorMessage: "DocumentId should be at least 6-20 characters" },
    },
    birthdate: {
        exists: { errorMessage: "Birthdate is required" },
        isDate: { errorMessage: "Please provide a valid date" },
    },
};