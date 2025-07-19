import { RequestHandler } from "express";

const checkPathAndLimit: RequestHandler = (req: & any, res, next) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;

    req.page = page
    req.limit = limit

    next()
}

export {checkPathAndLimit}