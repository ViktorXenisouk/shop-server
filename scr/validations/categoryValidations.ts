import {body} from 'express-validator';

const create = [
    body('name').isString(),
    body('path').isString(),
    body('discription').isString(),
    body('imgUrl').optional().isURL()
];

const edit = [
    body('path').isString(),
    body('name').optional().isString(),
    body('discription').optional().isString(),
    body('imgUrl').optional().isString(),
]

export {create,edit}