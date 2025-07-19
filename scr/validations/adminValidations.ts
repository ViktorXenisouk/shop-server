import {body,param} from 'express-validator';

const create = [
    body('name').isString(),
    body('email').isEmail(),
    body('password').isString(),
    body('securityLvl').isNumeric(),
]

const login = [
    body('name').isString(),
    body('password').isString(),
];

const edit = [
    body('name'),
    body('password'),
    body('email'),
    body('imgUrl'),
]

export {create,login,edit}