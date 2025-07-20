export const registerValidationSchema = {
    username: {
        notEmpty: {
            errorMessage: 'username must not be empty!'
        },
        isString: {
            errorMessage: 'username must be a string!'
        },
        isLength: {
            options: {
                min: 4,
                max: 15,
            },
            errorMessage: 'username can only be 4-15 characters!'
        }
    },
    email: {
        notEmpty: {
            errorMessage: 'email must not be empty!',
        },
        isEmail: {
            errorMessage: 'email is not in correct format!',
        },
    },
    role: {
        notEmpty: {
            errorMessage: 'role must not be empty!'
        },
        isString: {
            errorMessage: 'role must be a string!'
        },
        isIn: {
            options: [['user', 'admin']],
            errorMessage: 'role must be either "user" or "admin"!'
        }
    },
    password: {
        notEmpty: {
            errorMessage: 'password must not be empty!'
        },
        isString: {
            errorMessage: 'password must be a string!'
        },
        isLength: {
            options: {
                min: 4,
                max: 15,
            },
            errorMessage: 'password can only be 4-15 characters!'
        }
    }
}

export const loginValidationSchema = {
    email: {
        notEmpty: {
            errorMessage: 'email must not be empty!',
        },
        isEmail: {
            errorMessage: 'email is not in correct format!',
        },
    },
    role: {
        notEmpty: {
            errorMessage: 'role must not be empty!'
        },
        isString: {
            errorMessage: 'role must be a string!'
        },
        isIn: {
            options: [['user', 'admin']],
            errorMessage: 'role must be either "user" or "admin"!'
        }
    },
    password: {
        notEmpty: {
            errorMessage: 'password must not be empty!'
        },
        isString: {
            errorMessage: 'password must be a string!'
        },
        isLength: {
            options: {
                min: 4,
                max: 15,
            },
            errorMessage: 'password can only be 4-15 characters!'
        }
    }
}