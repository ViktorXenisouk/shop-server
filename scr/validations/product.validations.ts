import { body, param,query } from 'express-validator';

const opt = { checkFalsy: true, nullable: true }

export const create = [
    body('name').isString(),
    body('discription').isString(),
    body('category').isString(),
    body('tags').optional().isArray(),
    body('imgs').optional().isArray(),
    body('blocks').optional().isArray()
];

export const edit = [
    body('name').optional().isString(),
    body('discription').optional().isString(),
    body('category').optional().isString(),
    body('tags').optional().isArray(),
    body('imgs').optional().isArray(),
    body('blocks').optional().isArray()
];

export const search = [
    param('category').optional().isString(),
    query('tags').optional().isString(),
    query('search').optional().isString(),
]