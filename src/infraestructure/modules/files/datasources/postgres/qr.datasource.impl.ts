// src/infraestructure/modules/personas/datasources/filesystem/File.datasource.impl.ts

import { CustomError, FileEntityOu, QRDatasource, RegisterFileDto, UpdateFileDto } from "../../../../../domain/index.js";
import { FileMapper } from "../../mappers/file.mapper.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

export class QRDatasourceImpl implements QRDatasource {
    private basePath: string;

    constructor() {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        this.basePath = path.join(__dirname, '../../../../../public/imagen/alumno');
    }

    async findByFilename(filename: string): Promise<FileEntityOu> {
        try {
            const filePath = path.join(this.basePath, filename);
            if (!fs.existsSync(filePath)) {
                return FileMapper.FileEntityFromObject({ 
                    ok: false, 
                    message: 'Archivo no encontrado' 
                });
            }
            const stats = fs.statSync(filePath);
            return FileMapper.FileEntityFromObject({
                ok: true,
                data: {
                    filename,
                    path: filePath,
                    mimetype: '', // Puedes obtener el mimetype si lo guardaste
                    size: stats.size
                },
                message: 'Operación exitosa'
            });

        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServer();
        }
    }

}