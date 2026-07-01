import { FileEntityOu, QRDatasource, QRRepository, RegisterFileDto, UpdateFileDto } from "../../../../domain/index.js";

export class QRRepositoryImpl implements QRRepository {
    constructor(private readonly QRDatasource: QRDatasource) {}



    saveFilenameQR(filename: string): Promise<FileEntityOu> {
        return this.QRDatasource.saveFilenameQR(filename);
    }

    findByFilename(filename: string): Promise<FileEntityOu> {
        return this.QRDatasource.findByFilename(filename);
    }

    // update(updateFileDto: UpdateFileDto, by: string): Promise<FileEntityOu> {
    //     return this.QRDatasource.update(updateFileDto, by);
    // }

    // delete(filename: string, by: string): Promise<FileEntityOu> {
    //     return this.QRDatasource.delete(filename, by);
    // }
}