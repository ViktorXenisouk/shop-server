import { body } from "express-validator";

export const checkFolder = [
    body('folder').optional().isString()
]