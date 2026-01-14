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

    // async register(registerQRDto: RegisterQRDto): Promise<FileEntityOu> {
    //     try {
    //         return FileMapper.FileEntityFromObject({
    //             ok: true,
    //             data: {
    //                 filename: registerQRDto.filename,
    //                 path: path.join(this.basePath, registerFileDto.filename),
    //                 mimetype: registerFileDto.mimetype,
    //                 size: registerFileDto.size
    //             },
    //             message: 'File guardada correctamente'
    //         });
    //     } catch (error) {
    //         if (error instanceof CustomError) throw error;
    //         throw CustomError.internalServer();
    //     }
    // }

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

    // async update(updateFileDto: UpdateFileDto): Promise<FileEntityOu> {
    //     try {
    //         const oldPath = path.join(this.basePath, updateFileDto.filename);
    //         const newPath = path.join(this.basePath, updateFileDto.newFilename || updateFileDto.filename);
    //         if (!fs.existsSync(oldPath)) {
    //             return FileMapper.FileEntityFromObject({ ok: false, data: null, message: 'Archivo no encontrado' });
    //         }
    //         // Si hay buffer, sobreescribe el archivo
    //         if (updateFileDto.buffer) {
    //             fs.writeFileSync(newPath, updateFileDto.buffer);
    //         } else if (updateFileDto.newFilename) {
    //             fs.renameSync(oldPath, newPath);
    //         }
    //         return FileMapper.FileEntityFromObject({
    //             ok: true,
    //             data: {
    //                 filename: updateFileDto.newFilename || updateFileDto.filename,
    //                 path: newPath,
    //                 mimetype: '', // Puedes obtener el mimetype si lo guardaste
    //                 size: fs.statSync(newPath).size
    //             },
    //             message: 'File actualizada correctamente'
    //         });
    //     } catch (error) {
    //         if (error instanceof CustomError) throw error;
    //         throw CustomError.internalServer();
    //     }
    // }

    // async delete(filename: string): Promise<FileEntityOu> {
    //     try {
    //         const filePath = path.join(this.basePath, filename);
    //         if (!fs.existsSync(filePath)) {
    //             return FileMapper.FileEntityFromObject({ ok: false, message: 'Archivo no encontrado' });
    //         }
    //         fs.unlinkSync(filePath);
    //         return FileMapper.FileEntityFromObject({
    //             ok: true,
    //             message: 'File eliminada correctamente'
    //         });
    //     } catch (error) {
    //         if (error instanceof CustomError) throw error;
    //         throw CustomError.internalServer();
    //     }
    // }
}