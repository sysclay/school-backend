// src/presentation/modules/personas/controllers/File.controller.ts
import { Request, Response } from "express";
import { CustomError, RegisterFileDto, UpdateFileDto, FileRepository } from "../../../../domain/index.js";

interface AuthRequest extends Request {
  payload?: { id_usuario: string, };
}

export class FileController {
    constructor(
        private readonly FileRepository: FileRepository,
    ) {}

    private handleError(error: unknown, res: Response) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    registerFile = (req: AuthRequest, res: Response):any => {
        const [error, registerFileDto] = RegisterFileDto.create({
            filename: req.file?.filename,
            mimetype: req.file?.mimetype,
            size: req.file?.size,
            buffer: req.file?.buffer, // si lo necesitas
        });
        if (error) return res.status(400).json({ message: error });
        const by = req?.payload?.id_usuario;

        this.FileRepository.register(registerFileDto!, by!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    };

    findFileByFilename = (req: AuthRequest, res: Response) => {
        const { filename } = req.params;
        this.FileRepository.findByFilename(filename)
        .then(data => {
                if (!data.ok || !data.data) {
                    return res.json(data)
                }
                // Envía el archivo como respuesta binaria
                res.sendFile(data.data.path);
            }
        )
        .catch(error => this.handleError(error, res));
    };

    updateFile = (req: AuthRequest, res: Response):any=> {
        const [error, updateFileDto] = UpdateFileDto.update({
            filename: req.params.filename,
            newFilename: req.body.newFilename,
            buffer: req.file?.buffer,
        });
        if (error) return res.status(400).json({ message: error });
        const by = req?.payload?.id_usuario;

        this.FileRepository.update(updateFileDto!, by!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    };

    deleteFile = (req: AuthRequest, res: Response) => {
        const { filename } = req.params;
        const by = req?.payload?.id_usuario;
        this.FileRepository.delete(filename, by!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    };
}