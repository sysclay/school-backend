import { Request, Response } from "express";
import { CustomError, RegisterFcmDto, FcmRepository } from "../../domain/index.js";

export class FcmController {
    constructor (
        private readonly fcmRepository:FcmRepository,
    ){}

    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error:error.message});    
        }
        return res.status(500).json({error:'Internal Server Error'});
    }

    registerFcm= (req:Request, res:Response):any=>{
        const [error, registerFcmDto ] = RegisterFcmDto.create(req.body);
        if(error){ return res.status(400).json({error})};
        this.fcmRepository.register(registerFcmDto!)
        .then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
        });
    };

    findFcm = (req:Request, res: Response)=>{
        this.fcmRepository.findAll()
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }
}