import { body } from "express-validator";

export const login = [
    body('email').isString(),
    body('password').isLength({min : 5}),
];

export const register = [
    body('email').isEmail(),
    body('username').isLength({min : 3}),
    body('password').isLength({min: 4}),
];

export const emailAvailable = [
    body('email').isString()
]