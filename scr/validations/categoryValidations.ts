import {body} from 'express-validator';

export const addCategoryValidation = [
    body('name').isString(),
    body('path').isString,
    body('discription').isString(),
];
