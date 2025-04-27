import {body} from 'express-validator';

export const addValidation = [
    body('name').isString(),
    body('tags').isArray(),
    body('discription').isString(),
    body('path').isString(),
];

const opt = {checkFalsy: true, nullable: true}

export const updateValidation = [
    body('name').optional(opt).isString(),
    body('tags').optional(opt).isArray(),
    body('discription').optional(opt).isString(),
    body('path').optional(opt).isString(),]

