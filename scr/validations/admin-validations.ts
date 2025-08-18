import {body,param} from 'express-validator';

export const create = [
    body('name').isString(),
    body('email').isEmail(),
    body('password').isString(),
    body('securityLvl').isNumeric(),
]

export const find = [
    body('search').optional().isString()
]

export const login = [
    body('name').isString(),
    body('password').isString(),
];

export const editByAdmin = [
    body('name'),
    body('password'),
    body('email'),
    body('imgUrl'),
    body('securityLvl')
]

export const editMe = [
    body('name'),
    body('password'),
    body('email'),
    body('imgUrl'),
]