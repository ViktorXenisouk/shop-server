import {body} from 'express-validator';
import { IsStrongPasswordOptions } from 'express-validator/lib/options';

const passwordOptions : IsStrongPasswordOptions = {
    minLength:5,
    minNumbers:1,
    minUppercase:1
}

const login = [
    body('email').isEmail(),
    body('password').isLength({min : 5}),
];

const register = [
    body('email').isEmail(),
    body('username').isLength({min : 3}),
    body('password').isStrongPassword(passwordOptions),
];

const editMe = [
    body('email').isEmail(),
    body('username').isLength({min : 3}),
    body('password').isStrongPassword(passwordOptions),
]

const edit = [
    body('id').isString(),
    body('email').isEmail(),
    body('username').isLength({min : 3}),
    body('password').isStrongPassword(passwordOptions),
]

const block = [
    body('id').isString(),
    body('blocked').isBoolean(),
]

export {login,register,editMe,edit,block}