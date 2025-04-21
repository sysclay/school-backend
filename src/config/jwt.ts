import { SignJWT, jwtVerify, JWTPayload } from 'jose';

import { envspg } from '../config/postgres/config.js';

const SECRET_KEY = new TextEncoder().encode(envspg.SECRET_JWT);

export class JwtAdapter {
    static async generateToken(payload: JWTPayload, expiresIn:string="12h"):Promise<string> {
        return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' }) // Algoritmo de firma
        .setExpirationTime(expiresIn) // Tiempo de expiración
        .setIssuedAt() // Fecha de emisión
        .sign(SECRET_KEY); // Firmar con la clave secreta
    }

    static async refreshToken(token:string, newExpiresIn: string = "12h"):Promise<string|null> {
        const payload = await this.verifyToken(token);
        if (!payload) return null; // Si el token es inválido, retornar null
        delete payload.exp; // Eliminar expiración anterior
        delete payload.iat; // Eliminar fecha de emisión anterior
        const newPayload = { ...payload, iat: Math.floor(Date.now() / 1000) };
        return this.generateToken(newPayload, newExpiresIn); // Generar nuevo token
    }

    static async verifyToken(token:string):Promise<JWTPayload | null>{
        try {
            const { payload } = await jwtVerify(token, SECRET_KEY, {
              algorithms: ["HS256"],
            });
            return payload; // Devolver el payload si es válido
          } catch (error) {
            return null; // Si el token es inválido, devolver null
          }
    }

}
