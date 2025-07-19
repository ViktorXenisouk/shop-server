import {body, param } from 'express-validator';

const idValidation = [
    param('id').isMongoId(),
]

export {idValidation}