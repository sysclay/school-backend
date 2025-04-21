import { Request, Response, NextFunction } from "express";
import { JwtAdapter } from '../../config/index.js';


export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Obtener el token de "Bearer <token>"
        if (!token) {
            res.status(401).json({ message: "No autorizado" });
            return;
        }
        const payload = await JwtAdapter.verifyToken(token);// Verificar el token

        if (!payload) {
            res.status(401).json({ message: "Token inválido o expirado" });
            return;
        }
        //req.user = payload; // Guardar el usuario autenticado en la solicitud

        (req as any).user = payload;

        next();

    } catch (error) {
        next(error);
        // res.status(401).json({ message: "No autorizado" });
        return
        // return res.status(401).json({ message: "No autorizado. Error al validar el token." });
    }
};
