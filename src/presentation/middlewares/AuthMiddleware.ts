import { Request, Response, NextFunction } from "express";
import { JwtAdapter } from '../../config/index.js';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; 
        if (!token) {
            res.status(401).json({ message: "No autorizado" });
            return;
        }
        // const payload = await JwtAdapter.verifyToken(token);
        const payload = await JwtAdapter.decryptWithRSA(token);

<<<<<<< HEAD
        // console.log('TOKEN::', token, payload)
=======
>>>>>>> 3fcd7a4ca64f408e78613fcb12a85c97c5065df9
        if (!payload) {
            res.status(401).json({ message: "Token inválido o expirado" });
            return;
        }
        (req as any).payload = payload;
        next();

    } catch (error) {
        next(error);
        // res.status(401).json({ message: "No autorizado" });
        return
        // return res.status(401).json({ message: "No autorizado. Error al validar el token." });
    }
};
