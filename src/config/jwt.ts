
import { SignJWT, jwtVerify, JWTPayload, importPKCS8, importSPKI, generateSecret, EncryptJWT, jwtDecrypt } from 'jose';  
import { createPublicKey, createPrivateKey } from 'crypto'
import fs from "fs"
import env from "env-var";
// const PRIVATE_KEY = fs.readFileSync("./src/secret/private.pem", "utf8");
// const PUBLIC_KEY = fs.readFileSync("./src/secret/public.pem", "utf8");
const PRIVATE_KEY = env.get('PRIVATE_KEY').required().asString()
const PUBLIC_KEY = env.get('PUBLIC_KEY').required().asString();
const publicKey = createPublicKey(PUBLIC_KEY);
const privateKey = createPrivateKey(PRIVATE_KEY);

export class JwtAdapter {

  // Firmar JWT
  static async generateToken(payload: JWTPayload, expiresIn:string="12h"):Promise<string> {
    return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'RS256' }) // ✅ Algoritmo de firma privada
    .setExpirationTime(expiresIn) // ⏳ Tiempo de expiración
    .setIssuedAt() // 📅 Fecha de emisión automática
    .sign(await importPKCS8(PRIVATE_KEY, "RS256")); // 🔑 Firmar con la clave privada
  }
  // Verificar JWT
  static async verifyToken(token:string):Promise<JWTPayload | null>{
    try {
        // const { payload } = await jwtVerify(token, SECRET_KEY, {algorithms: ["HS256"],});
        const { payload } = await jwtVerify(token, await importSPKI(PUBLIC_KEY, "RS256"));
        return payload; // Devolver el payload si es válido
      } catch (error) {
        return null; // Si el token es inválido, devolver null
      }
  }
  // Refresh JWT
  static async refreshToken(token:string, newExpiresIn: string = "12h"):Promise<string|null> {
    try {
      const { payload } = await jwtVerify(token, await importPKCS8(PUBLIC_KEY,"RS256"));
      if (!payload || (payload.exp && payload.exp < Math.floor(Date.now() / 1000))) return null; // 🚨 Verificar si el token ya ha expirado
      return this.generateToken({ ...payload }, newExpiresIn);  // 🔄 Crear nuevo payload sin alterar manualmente `exp` e `iat`
    } catch (error) {
      return null; // Token inválido
    }   
  }
  // Cifrar JWE
  static async encryptWithRSA(payload:JWTPayload, expiresIn: string = "7d"):Promise<string> {
    const encrypted = await new EncryptJWT(payload as any)
        .setProtectedHeader({ alg: 'RSA-OAEP', enc: 'A256GCM' }) // Cifrado AES-GCM 256
        .setIssuedAt()
        .setExpirationTime(expiresIn)
        .encrypt(publicKey);
    return encrypted;
  }
  // Descifrar JWE
  static async decryptWithRSA(token: string): Promise<JWTPayload | null> {
      try {
          const { payload } = await jwtDecrypt(token, privateKey);
          return payload;
      } catch (error) {
          return null;
      }
  }
 // Refresh JWE
  static async refreshEncryptWithRSA(token:string, newExpiresIn: string = "7d"):Promise<string|null> {
    try {
      const payload  = await this.decryptWithRSA(token);
      if (!payload || (payload.exp && payload.exp < Math.floor(Date.now() / 1000))) return null; // 🚨 Verificar si el token ya ha expirado
      return this.encryptWithRSA({ ...payload }, newExpiresIn);  // 🔄 Crear nuevo payload sin alterar manualmente `exp` e `iat`
    } catch (error) {
      return null; // Token inválido
    }   
  } 
}
