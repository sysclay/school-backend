// src/infraestructure/modules/personas/datasources/filesystem/File.datasource.impl.ts

import { CustomError, FileDatasource, FileEntityOu, RegisterFileDto, UpdateFileDto } from "../../../../../domain/index.js";
import { FileMapper } from "../../mappers/file.mapper.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { FOTO } from "../../../../../config/file.foto.js";
import { CLOUDINARY } from "../../../../../config/cloudinary.js";

export class FileDatasourceImpl implements FileDatasource {
    private basePath: string;

    constructor() {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        this.basePath = path.join(__dirname, '../../../../../public/imagen/persona');
    }

    async registerCloudinary(id:string,registerFileDto:RegisterFileDto): Promise<FileEntityOu> {
        try {

            const {filename, mimetype,size,buffer} = registerFileDto;
            const file = {
                filename:`foto-${id}`,
                buffer:buffer,
            }
            const result = await CLOUDINARY.cloudinaryFOTO(file);

            const data = {
                filename: result.original_filename,
                path: result.secure_url,
                mimetype: result.format,
                size: result.bytes,
                public_id: result.public_id,
                created_at: result.created_at
            };

            return FileMapper.FileEntityFromObject({
                ok: true,
                data: data,
                message: 'File guardada correctamente'
            });
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServer();
        }
    }

    async register(registerFileDto: RegisterFileDto): Promise<FileEntityOu> {
        try {
            // console.log(registerFileDto)
            const data = {
                filename: registerFileDto.filename,
                path: path.join(this.basePath, registerFileDto.filename),
                mimetype: registerFileDto.mimetype,
                size: registerFileDto.size
            }
            console.log(data)
            return FileMapper.FileEntityFromObject({
                ok: true,
                data: data,
                message: 'File guardada correctamente'
            });
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServer();
        }
    }

    async findByFilename(filename: string): Promise<FileEntityOu> {
        try {
            const result = await CLOUDINARY.cloudinaryFotoRead(`foto-${filename}`);
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

    async update(updateFileDto: UpdateFileDto): Promise<FileEntityOu> {
        try {
            const oldPath = path.join(this.basePath, updateFileDto.filename);
            const newPath = path.join(this.basePath, updateFileDto.newFilename || updateFileDto.filename);
            if (!fs.existsSync(oldPath)) {
                return FileMapper.FileEntityFromObject({ ok: false, data: null, message: 'Archivo no encontrado' });
            }
            // Si hay buffer, sobreescribe el archivo
            if (updateFileDto.buffer) {
                fs.writeFileSync(newPath, updateFileDto.buffer);
            } else if (updateFileDto.newFilename) {
                fs.renameSync(oldPath, newPath);
            }
            return FileMapper.FileEntityFromObject({
                ok: true,
                data: {
                    filename: updateFileDto.newFilename || updateFileDto.filename,
                    path: newPath,
                    mimetype: '', // Puedes obtener el mimetype si lo guardaste
                    size: fs.statSync(newPath).size
                },
                message: 'File actualizada correctamente'
            });
        } catch (error) {
            console.log(error)
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServer();
        }
    }

    async delete(filename: string): Promise<FileEntityOu> {
        try {
            const filePath = path.join(this.basePath, filename);
            if (!fs.existsSync(filePath)) {
                return FileMapper.FileEntityFromObject({ ok: false, message: 'Archivo no encontrado' });
            }
            fs.unlinkSync(filePath);
            return FileMapper.FileEntityFromObject({
                ok: true,
                message: 'File eliminada correctamente'
            });
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internalServer();
        }
    }
}