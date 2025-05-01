import {body, param } from 'express-validator';

const editIdArray = [
    param('id').isMongoId(),
    body('array').isArray(),
]

const idValidation = [
    param('id').isMongoId(),
]

export {editIdArray,idValidation}