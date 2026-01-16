// src/presentation/modules/personas/controllers/File.controller.ts
import { Request, Response } from "express";
import { CustomError, RegisterFileDto, UpdateFileDto, QRRepository } from "../../../../domain/index.js";

interface AuthRequest extends Request {
  payload?: { id_usuario: string, };
}

export class QRController {
    constructor(
        private readonly QRRepository: QRRepository,
    ) {}

    private handleError(error: unknown, res: Response) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    saveFilenameQR = (req: AuthRequest, res: Response) => {
        const { filename } = req.params;
        this.QRRepository.saveFilenameQR(filename).then(data => {
            // if (!data.ok || !data.data) {
                return res.json(data)
            // }
            // Envía el archivo como respuesta binaria
            // res.sendFile(data.data.path);
            // res.json(data);
            }
        )
        .catch(error => {
            this.handleError(error, res)
        });
    };

    findFileByFilename = (req: AuthRequest, res: Response) => {
        const { filename } = req.params;
        this.QRRepository.findByFilename(filename)
        .then(data => {
                // if (!data.ok || !data.data) {
                    return res.json(data)
                // }
                // Envía el archivo como respuesta binaria
                // res.sendFile(data.data.path);
            }
        )
        .catch(error => this.handleError(error, res));
    };
    //     const [error, updateFileDto] = UpdateFileDto.update({
    //         filename: req.params.filename,
    //         newFilename: req.body.newFilename,
    //         buffer: req.file?.buffer,
    //     });
    //     if (error) return res.status(400).json({ message: error });
    //     const by = req?.payload?.id_usuario;

    //     this.FileRepository.update(updateFileDto!, by!)
    //         .then(data => res.json(data))
    //         .catch(error => this.handleError(error, res));
    // };

    // deleteFile = (req: AuthRequest, res: Response) => {
    //     const { filename } = req.params;
    //     const by = req?.payload?.id_usuario;
    //     this.FileRepository.delete(filename, by!)
    //         .then(data => res.json(data))
    //         .catch(error => this.handleError(error, res));
    // };
}