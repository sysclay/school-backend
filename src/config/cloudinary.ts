import QRCode  from 'qrcode'
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from "url";

import { v2 as cloudinary } from 'cloudinary';

import env from "env-var";
const cloud_name = env.get('CLOUDINARY_CLOUD_NAME').required().asString()
const api_key = env.get('CLOUDINARY_API_KEY').required().asString();
const api_secret = env.get('CLOUDINARY_API_SECRET').required().asString();

interface valueQR {
    texto:string,
    filename:string
}
interface valueFoto {
    buffer:Buffer,
    filename?:string,
}
interface cloudinaryImg {
    public_id:string,
    format:string,
    resource_type:string,
    secure_url:string,
    bytes:number,
    created_at:string,
    original_filename:string,
}
export class CLOUDINARY {
        static async cloudinaryQR({texto,filename}:valueQR):Promise<cloudinaryImg>{
            try {
                // Configuración de Cloudinary
                cloudinary.config({
                    cloud_name: cloud_name,
                    api_key: api_key,
                    api_secret: api_secret,
                });
                // Generar QR y guardarlo en archivo temporal
                const __filename = fileURLToPath(import.meta.url);
                const __dirname = path.dirname(__filename);
                const filePath = path.join(__dirname, `${filename}.png`);

                await QRCode.toFile(filePath, texto);

                // Subir a Cloudinary
                const result = await cloudinary.uploader.upload(filePath, {
                    folder: 'qrcodes', // opcional: carpeta en Cloudinary
                    public_id: filename,
                    overwrite: true,
                    resource_type: 'image',
                });

                // Eliminar archivo temporal
                fs.unlinkSync(filePath);

                return {
                    public_id:result.public_id,
                    format: result.format,
                    secure_url: result.secure_url,
                    resource_type: result.resource_type,
                    bytes: result.bytes,
                    created_at: result.created_at,
                    original_filename: result.original_filename   
                }; 
            } catch (error) {
                throw error;
            }
        }

        static async cloudinaryQRRead(filename:string):Promise<cloudinaryImg | null> {
            try {

                cloudinary.config({
                    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
                    api_key: process.env.CLOUDINARY_API_KEY!,
                    api_secret: process.env.CLOUDINARY_API_SECRET!,
                });

                // Buscar recurso en Cloudinary por public_id
                const result = await cloudinary.api.resource(`qrcodes/${filename}`);

                const data = {
                    original_filename: result.original_filename,
                    secure_url: result.secure_url,          // URL pública
                    format: result.format,          // formato detectado
                    bytes: result.bytes,               // tamaño en bytes
                    public_id: result.public_id,
                    created_at: result.created_at,
                    resource_type: result.resource_type,
                };
                return data

            } catch (error: any) {
                if (error.http_code === 404) return null
                return null
                // if (error instanceof CustomError) throw error;
                // throw CustomError.internalServer();
            }
        }

        static async cloudinaryFOTO({buffer, filename}:valueFoto):Promise<cloudinaryImg> {
            return new Promise((resolve, reject) => {
                cloudinary.config({
                    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
                    api_key: process.env.CLOUDINARY_API_KEY!,
                    api_secret: process.env.CLOUDINARY_API_SECRET!,
                });

                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: 'perfil',
                        public_id: filename,
                        overwrite: true,
                        resource_type: 'image',
                    },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve({
                            public_id: result!.public_id,
                            format: result!.format,
                            secure_url: result!.secure_url,
                            resource_type: result!.resource_type,
                            bytes: result!.bytes,
                            created_at: result!.created_at,
                            original_filename: result!.original_filename,
                        });
                    }
                );

                uploadStream.end(buffer); // envía el buffer directamente
            });
        }

        
        static async cloudinaryFotoRead(filename:string):Promise<cloudinaryImg | null> {
            try {

                cloudinary.config({
                    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
                    api_key: process.env.CLOUDINARY_API_KEY!,
                    api_secret: process.env.CLOUDINARY_API_SECRET!,
                });

                // Buscar recurso en Cloudinary por public_id
                const result = await cloudinary.api.resource(`perfil/${filename}`);

                const data = {
                    original_filename: result.original_filename,
                    secure_url: result.secure_url,          // URL pública
                    format: result.format,          // formato detectado
                    bytes: result.bytes,               // tamaño en bytes
                    public_id: result.public_id,
                    created_at: result.created_at,
                    resource_type: result.resource_type,
                };
                return data

            } catch (error: any) {
                if (error.http_code === 404) return null
                return null
                // if (error instanceof CustomError) throw error;
                // throw CustomError.internalServer();
            }
        }
}
