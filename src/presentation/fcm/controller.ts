import { Request, Response } from "express";
import { CustomError, RegisterFcmDto, FcmRepository, FilterFcmDto, UpdateFcmDto } from "../../domain/index.js";

export class FcmController {
    constructor (
        private readonly fcmRepository:FcmRepository,
    ){}

    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({message:error.message});    
        }
        return res.status(500).json({error:'Internal Server Error'});
    }

    registerFcm= (req:Request, res:Response):any=>{
        const [error, registerFcmDto ] = RegisterFcmDto.create(req.body);
        if(error){ return res.status(400).json({message:error})};
        this.fcmRepository.register(registerFcmDto!).then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
        });
    };

    findFcm = (req:Request, res: Response)=>{
        this.fcmRepository.findAll().then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

    filterFcm = (req:Request, res: Response):any=>{
        const token_fcm = req.query.token_fcm as string;
        const device_id = req.query.device_id as string;
        const usuario_id = req.query.usuario_id as string;
        const data = { token_fcm,device_id,usuario_id }
        const [error, filterFcmDto ] = FilterFcmDto.filter(data);
        if(error){ return res.status(400).json({message:error})};

        this.fcmRepository.filterAll(filterFcmDto!).then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

    updateFcm = (req:Request, res: Response):any=>{
        const { id } = req.params;
        const [error, updateFcmDto ] = UpdateFcmDto.update(req.body);
        if(error){ return res.status(400).json({message:error})};

        this.fcmRepository.updateAll(id,updateFcmDto!).then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }
}