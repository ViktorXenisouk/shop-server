import { validationResult } from 'express-validator';
import { RequestHandler } from 'express';

const validateRequest : RequestHandler = (req, res, next) : any => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export {validateRequest}