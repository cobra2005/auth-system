import { body } from "express-validator";

export const loginValidation = [
    body('username')
        .notEmpty()
        .withMessage('username must not be empty!')
        .isString()
        .withMessage('username must be a string!'),
    body('password')
        .notEmpty()
        .withMessage('password must not be empty!')
        .isString()
        .withMessage('password must be a string!')
        .isLength({ min: 4, max: 15 })
        .withMessage('password can only be 4-15 characters!'),
];

export const registerValidation = [
    body('username')
        .notEmpty()
        .withMessage('username must not be empty!')
        .isString()
        .withMessage('username must be a string!')
        .isLength({ min: 4, max: 15 })
        .withMessage('username can only be 4-15 characters!'),
    body('email')
        .notEmpty()
        .withMessage('email must not be empty!')
        .isEmail()
        .withMessage('email must be a string!'),
    body('role')
        .notEmpty()
        .withMessage('role must not be empty!')
        .isString()
        .withMessage('role must be a string!')
        .isIn(['user', 'admin'])
        .withMessage('role must be either "user" or "admin"!'),
    body('password')
        .notEmpty()
        .withMessage('password must not be empty!')
        .isString()
        .withMessage('password must be a string!')
        .isLength({ min: 4, max: 15 })
        .withMessage('password can only be 4-15 characters!'),
];
