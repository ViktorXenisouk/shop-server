import { body, param, query } from "express-validator";

export const createOrUpdate = [
    body('name').isString(),
    body('type').optional().isString(),
    body('icon').optional().isString(),
    body('url').optional().isString(),
]

export const remove = [
    body('name').optional().isString(),
    body('type').optional().isString(),
    body('isAutoCreated').optional().isBoolean()
]

export const find = [
    param('search').optional().isString()
]

export const auxiliaryQueries = [
    query('search').optional().isString()
]