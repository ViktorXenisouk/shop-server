import {body} from 'express-validator';
import { IsStrongPasswordOptions } from 'express-validator/lib/options';

export const loginValidation = [
    body('email').isEmail(),
    body('password').isLength({min : 5}),
];

const options : IsStrongPasswordOptions = {
    minLength:5,
    minNumbers:1,
    minUppercase:1
}

export const registerValidation = [
    body('email').isEmail(),
    body('password').isStrongPassword(options),
    body('username').isLength({min : 3})
];