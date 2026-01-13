import { FileDatasource, FileEntityOu, FileRepository, RegisterFileDto, UpdateFileDto } from "../../../../domain/index.js";

export class FileRepositoryImpl implements FileRepository {
    constructor(private readonly FileDatasource: FileDatasource) {}

    register(registerFileDto: RegisterFileDto, by: string): Promise<FileEntityOu> {
        return this.FileDatasource.register(registerFileDto, by);
    }

    findByFilename(filename: string): Promise<FileEntityOu> {
        return this.FileDatasource.findByFilename(filename);
    }

    update(updateFileDto: UpdateFileDto, by: string): Promise<FileEntityOu> {
        return this.FileDatasource.update(updateFileDto, by);
    }

    delete(filename: string, by: string): Promise<FileEntityOu> {
        return this.FileDatasource.delete(filename, by);
    }
}