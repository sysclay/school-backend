import { Request, Response } from "express";
import { CustomError, RegisterAsistenciaDto, AsistenciaRepository, UpdateEntradaAsistenciaDto, UpdateSalidaAsistenciaDto } from "../../domain/index.js";

export class AsistenciaController {
    constructor (
        private readonly asistenciaRepository:AsistenciaRepository,
    ){}

    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error:error.message});    
        }
        return res.status(500).json({error:'Internal Server Error'});
    }

    registerAsistencia= (req:Request, res:Response):any=>{
        const [error, registerAsistenciaDto ] = RegisterAsistenciaDto.create(req.body);
        if(error){ return res.status(400).json({error})};
        this.asistenciaRepository.register(registerAsistenciaDto!)
        .then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
           }
        );
    };

    registerEntradaAsistencia= (req:Request, res:Response):any=>{
        const [error, updateEntradaAsistenciaDto ] = UpdateEntradaAsistenciaDto.create(req.body);
        const { id } = req.params; 
        if(error){ return res.status(400).json({error})};
        this.asistenciaRepository.registerEntrada(id,updateEntradaAsistenciaDto!)
        .then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
           }
        );
    };


    registerSalidaAsistencia= (req:Request, res:Response):any=>{
        const [error, updateSalidaAsistenciaDto ] = UpdateSalidaAsistenciaDto.create(req.body);
        const { id } = req.params; 
        if(error){ return res.status(400).json({error})};
        this.asistenciaRepository.registerSalida(id,updateSalidaAsistenciaDto!)
        .then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
           }
        );
    };

    findById = (req:Request, res:Response) =>{
        const { id } = req.params;

        this.asistenciaRepository.findById(id)
        .then( async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        })
    };

    //findByNameCorto = (req:Request, res:Response) =>{
    //    const nombreCorto = req.query.nom_corto as string;
//
    //    this.AsistenciaRepository.findByNameCorto(nombreCorto)
    //    .then( async data =>{
    //        res.json(data)
    //    }).catch(error => {
    //        this.handleError(error,res)
    //    })
    //};


    findAsistencia = (req:Request, res: Response)=>{
        this.asistenciaRepository.findAll()
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }
}