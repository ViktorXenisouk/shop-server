import { body, param } from 'express-validator';

export const deleteCategory = [
    param('path').optional().isString()
]

export const find = [
    body('parentPath').optional().isString(),
    body('name').optional().isString(),
    body('tags').optional().isString(),
]

export const getTags = [
    body('path').optional().isString()
]

export const create = [
    body('name').isString(),
    body('path').isString(),
    body('parentPath').isString(),
    body('tags').isObject(),
    body('discription').isString(),
    //body('imgUrl').optional().isURL()
];

export const getCategoryBySubPath = [
    param('subPath').optional().isString()
]

export const edit = [
    body('path').isString(),
    body('name').optional().isString(),
    body('discription').optional().isString(),
    body('imgUrl').optional().isString(),
]