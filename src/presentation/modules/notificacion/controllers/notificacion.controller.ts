import { Request, Response } from "express";
import { CustomError, NotificacionRepository, RegisterNotificacionDto } from "../../../../domain/index.js";

export class NotificacionController {
    constructor (
         private readonly notificacionRepository:NotificacionRepository,
    ){}

    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({message:error.message});    
        }
        return res.status(500).json({error:'Internal Server Error'});
    }

    enviarNotificacion= (req:Request, res:Response):any=>{
        const [error, registerNotificacionDto ] = RegisterNotificacionDto.create(req.body);
        
        if(error){ return res.status(400).json({message:error})};
        this.notificacionRepository.register(registerNotificacionDto!)
        .then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
        });
    };

    // obtenerFcmApoderadoAlumno= (req:Request, res:Response):any=>{
    //     const [error, filterAsistenciaNotiDto ] = FilterAsistenciaNotiDto.filter(req.body);
    //     if(error){ return res.status(400).json({message:error})};
    //     this.notificacionRepository.obtenerFcmApoderadoAlumno(filterAsistenciaNotiDto!)
    //     .then(async data=>{
    //         return res.json(data)
    //     }).catch( error => {
    //         return this.handleError(error,res)
    //     });
    // };


}