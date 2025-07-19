import {body,param} from 'express-validator';
import { IsStrongPasswordOptions } from 'express-validator/lib/options';

const passwordOptions : IsStrongPasswordOptions = {
    minLength:5,
    minNumbers:1,
    minUppercase:1
}

const updateBasketOrFavourite = [

]

export const editMe = [
    body('email').isEmail(),
    body('username').isLength({min : 3}),
    body('password').isStrongPassword(passwordOptions),
]

export const edit = [
    body('id').isString(),
    body('email').isEmail(),
    body('username').isLength({min : 3}),
    body('password').isStrongPassword(passwordOptions),
]

export const block = [
    body('id').isString(),
    body('blocked').isBoolean(),
]