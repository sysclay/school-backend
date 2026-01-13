import { RegisterFileDto } from "../dtos/register.file.dto.js";
import { UpdateFileDto } from "../dtos/update.file.dto.js";
import { FileEntityOu } from "../entities/ou/file.entity.js";

export abstract class QRRepository {
    // abstract register(registerFileDto: RegisterFileDto, by: string): Promise<FileEntityOu>;
    abstract findByFilename(filename: string): Promise<FileEntityOu>;
    // abstract update(updateFileDto: UpdateFileDto, by: string): Promise<FileEntityOu>;
    // abstract delete(filename: string, by: string): Promise<FileEntityOu>;
}