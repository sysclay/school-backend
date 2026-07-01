import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { CustomError } from '../../domain/index.js'; // ajusta la ruta si es distinta

export const errorHandler:ErrorRequestHandler = (err:any, req: Request, res: Response, next: NextFunction):void => {
    const statusCode = err.statusCode || 500;

    // Si es una instancia de CustomError, usar toJSON
    if (err instanceof CustomError) {
         res.status(statusCode).json({
            ok: false,
            message: err.message, // 👈 aquí usamos "message" y no "error"
            errors: err.errors || [],
        });
    }

    // Si no es un CustomError
     res.status(statusCode).json({
        ok: false,
        message: 'Internal Server Error',
    });
};