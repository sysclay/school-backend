import { Request, Response } from "express";
import { CustomError, RegisterNivelDto, NivelRepository, UpdateNivelDto } from "../../../../domain/index.js";

interface AuthRequest extends Request {
    payload?: { id_usuario: string, };
}

export class NivelController {
    constructor (
        private readonly nivelRepository:NivelRepository,
    ){}

    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({message:error.message});    
        }
        return res.status(500).json({error:'Internal Server Error'});
    }

    register= (req:AuthRequest, res:Response):any=>{
        const [error, registerNivelDto ] = RegisterNivelDto.create(req.body);
        const by = req?.payload?.id_usuario;

        if(error){ return res.status(400).json({message:error})};
        this.nivelRepository.register(registerNivelDto!,by!)
        .then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
        });
    };

    findById = (req:Request, res:Response) =>{
       const { id } = req.params;
       this.nivelRepository.findById(id)
       .then( async data =>{
           res.json(data)
       }).catch(error => {
           this.handleError(error,res)
       })
    };

    find = (req:Request, res: Response)=>{
        this.nivelRepository.findAll()
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

    findActive = (req:Request, res: Response)=>{
        this.nivelRepository.findAllActive()
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

    updateAll = (req:AuthRequest, res:Response):any =>{
        const { id } = req.params;
        const [error,updateNivelDto ] = UpdateNivelDto.update(req.body);
        if(error){ return res.status(400).json({message:error})};
        const by = req?.payload?.id_usuario;
        
        this.nivelRepository.updateAll(id,updateNivelDto!,by!).then( async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        })
    };
}