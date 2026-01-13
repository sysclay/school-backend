import { Request, Response } from "express";
import { CustomError, RegisterSeccionDto, SeccionRepository, UpdateSeccionDto } from "../../../../domain/index.js";

interface AuthRequest extends Request {
    payload?: { id_usuario: string, };
}

export class SeccionController {
    constructor (
        private readonly seccionRepository:SeccionRepository,
    ){}

    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({message:error.message});    
        }
        return res.status(500).json({error:'Internal Server Error'});
    }

    register= (req:AuthRequest, res:Response):any=>{
        const [error, registerSeccionDto ] = RegisterSeccionDto.create(req.body);
        const by = req?.payload?.id_usuario;
        if(error){ return res.status(400).json({message:error})};
        this.seccionRepository.register(registerSeccionDto!,by!)
        .then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
        });
    };

    find = (req:Request, res: Response)=>{
        this.seccionRepository.findAll()
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

    updateAll = (req:AuthRequest, res:Response):any =>{
        const { id } = req.params;
        const [error,updateSeccionDto ] = UpdateSeccionDto.update(req.body);
        if(error){ return res.status(400).json({message:error})};
        const by = req?.payload?.id_usuario;
        this.seccionRepository.updateAll(id,updateSeccionDto!,by!).then( async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        })
    };
}