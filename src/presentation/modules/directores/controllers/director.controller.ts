import { Request, Response } from "express";
import { CustomError, RegisterDirectorDto, DirectorRepository } from "../../../../domain/index.js";

interface AuthRequest extends Request {
  payload?: { id_usuario: string };
}

export class DirectorController {
    constructor (
        private readonly DirectorRepository:DirectorRepository,
    ){}

    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({message:error.message});    
        }
        return res.status(500).json({error:'Internal Server Error'});
    }

    register= (req:AuthRequest, res:Response):any=>{
        const [error, registerDirectorDto ] = RegisterDirectorDto.create(req.body);
        
        if(error){ return res.status(400).json({message:error})};
        const by = req?.payload?.id_usuario;

        this.DirectorRepository.register(registerDirectorDto!,by!).then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
        });
    };

    findById = (req:AuthRequest, res: Response)=>{
        // const by = req?.payload?.id_Director;
        const { id } = req.params;
        this.DirectorRepository.findById(id!).then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

    findAll = (req:AuthRequest, res: Response)=>{
        const page = Number.isNaN(Number(req.query.page)) || !req.query.page ? 1 : Number(req.query.page);
        const limit = Number.isNaN(Number(req.query.limit)) || !req.query.limit ? 10 : Number(req.query.limit);
        this.DirectorRepository.findAll(Number(page), Number(limit)).then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

    findByIdColegio = (req:Request, res: Response)=>{
        const { id } = req.params;
        this.DirectorRepository.findByIdColegio(id).then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }
}