import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';

dotenv.config({ path: '.env' });

export const errorHandler: (error: any, _req: Request, res: Response, _next: NextFunction) => Response = (error: any, _req: Request, res: Response, _next: NextFunction): Response => {

    if (error.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json(error);
    }

    if (error.code === 11000) {
        return res.status(400).json(error);
    }

    if (error.stack && process.env.NODE_ENVR === 'development') {
        console.error(error, error.stack);
    }

    if (error.errors) {
        return res.status(400).json({
            errors: error.errors.map((e: { msg: string; }) => e.msg),
            message: 'Invalid request'
        });
    }

    return res.status(error.status || 500).json({
        status: error.status,
        message: error.message || error.name || error
    });
};
