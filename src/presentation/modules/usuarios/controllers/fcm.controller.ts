import { Request, Response } from "express";
import { CustomError, RegisterFcmDto, FcmRepository, UpdateFcmDto } from "../../../../domain/index.js";

interface AuthRequest extends Request {
  payload?: { id_usuario: string, };
}

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

    register= (req:AuthRequest, res:Response):any=>{
        const [error, registerFcmDto ] = RegisterFcmDto.create(req.body);
        if(error){ return res.status(400).json({message:error})};
        const by = req?.payload?.id_usuario;
        this.fcmRepository.register(registerFcmDto!,by!).then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
        });
    };

    findById = (req:AuthRequest, res: Response)=>{
        const by = req?.payload?.id_usuario;
        this.fcmRepository.findById(by!).then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

    find = (req:Request, res: Response)=>{
        this.fcmRepository.findAll().then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

    filter = (req:Request, res: Response)=>{
        const id_usuario = req.query.id_usuario as string;
        const token_fcm = req.query.token_fcm as string;
        const device_id = req.query.device_id as string;
        const query = { id_usuario: id_usuario, token_fcm:token_fcm,device_id:device_id}
        this.fcmRepository.filter(query!).then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

    // update = (req:AuthRequest, res: Response):any=>{
    //     const { id } = req.params;
    //     const [error, updateFcmDto ] = UpdateFcmDto.update(req.body);
    //     if(error){ return res.status(400).json({message:error})};

    //     this.fcmRepository.updateAll(id,updateFcmDto!).then(async data =>{
    //         res.json(data)
    //     }).catch(error => {
    //         this.handleError(error,res)
    //     });
    // }

    updateOne = (req:AuthRequest, res: Response):any=>{
        // const { id } = req.params;
        const [error, updateFcmDto ] = UpdateFcmDto.update(req.body);
        const by = req?.payload?.id_usuario;
        if(error){ return res.status(400).json({message:error})};

        this.fcmRepository.updateOne(by!,updateFcmDto!,by!).then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

    updateActive = (req:AuthRequest, res: Response):any=>{
        // const { id } = req.params;
        const [error, updateFcmDto ] = UpdateFcmDto.update(req.body);
        const by = req?.payload?.id_usuario;
        if(error){ return res.status(400).json({message:error})};

        this.fcmRepository.updateActive(by!,updateFcmDto!,by!).then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }
    
}