// src/infraestructure/modules/personas/datasources/filesystem/File.datasource.impl.ts

import { CustomError, FileEntityOu, QRDatasource, RegisterFileDto, UpdateFileDto } from "../../../../../domain/index.js";
import { FileMapper } from "../../mappers/file.mapper.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { QR } from "../../../../../config/generate.qr.js";
import { CLOUDINARY } from "../../../../../config/cloudinary.js";

export class QRDatasourceImpl implements QRDatasource {
    private basePath: string;

    constructor() {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        this.basePath = path.join(__dirname, '../../../../../public/imagen/alumno');
    }

     async saveFilenameQR(file: string): Promise<FileEntityOu> {
        try {
            const valueQR = {
                texto:file,
                filename:file,
            }
            const {public_id,bytes,original_filename,secure_url,format,resource_type,created_at} = await CLOUDINARY.cloudinaryQR(valueQR);
            return FileMapper.FileEntityFromObject({
                ok: true,
                data: {
                    filename:original_filename,
                    path: secure_url,
                    mimetype: format, // Puedes obtener el mimetype si lo guardaste
                    size: bytes
                },
                message: 'Operación exitosa'
            });

        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServer();
        }
    }   

    async findByFilename(filename: string): Promise<FileEntityOu> {
        try {
            const result = await CLOUDINARY.cloudinaryQRRead(`qr-${filename}`);
            if (!result) {
                return FileMapper.FileEntityFromObject({
                    ok: false,
                    message: 'Archivo no encontrado'
                });
            }
            const data = {
                filename: result.original_filename,
                path: result.secure_url,
                mimetype: result.format,
                size: result.bytes,
                public_id: result.public_id,
                created_at: result.created_at,
                resource_type: result.resource_type
            };
            return FileMapper.FileEntityFromObject({
                ok: true,
                data,
                message: 'Operación exitosa'
            });
            // const filePath = path.join(this.basePath, filename);
            // if (!fs.existsSync(filePath)) {
            //     return FileMapper.FileEntityFromObject({ 
            //         ok: false, 
            //         message: 'Archivo no encontrado' 
            //     });
            // }
            // const stats = fs.statSync(filePath);
            // return FileMapper.FileEntityFromObject({
            //     ok: true,
            //     data: {
            //         filename,
            //         path: filePath,
            //         mimetype: '', // Puedes obtener el mimetype si lo guardaste
            //         size: stats.size
            //     },
            //     message: 'Operación exitosa'
            // });

        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServer();
        }
    }

}