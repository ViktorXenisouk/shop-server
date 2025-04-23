import {body} from 'express-validator';

export const addProductValidation = [
    body('name').isString(),
    body('imgs').isArray(),
    body('discription').isString(),
    body('path'),
];
