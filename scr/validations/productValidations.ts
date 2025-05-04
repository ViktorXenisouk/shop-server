import {body,param} from 'express-validator';

const opt = {checkFalsy: true, nullable: true}

const create = [
    body('name').isString(),
    body('tags').isArray(),
    body('discription').isString(),
    body('path').isString(),
    body('imgs').optional().isArray(),
];

const edit = [
    body('name').optional(opt).isString(),
    body('tags').optional(opt).isArray(),
    body('discription').optional(opt).isString(),
    body('path').optional(opt).isString(),
    body('imgs').optional(opt).isArray()
];

const search = [
    param('tags').optional().isString(),
    param('category').optional().isString(),
]

export {create,edit,search}