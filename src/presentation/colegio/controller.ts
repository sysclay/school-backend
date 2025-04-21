import { Request, Response } from "express";
import { CustomError, RegisterColegioDto, ColegioRepository } from "../../domain/index.js";

export class ColegioController {
    constructor (
        private readonly colegioRepository:ColegioRepository,
    ){}

    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({message:error.message});    
        }
        return res.status(500).json({error:'Internal Server Error'});
    }

    registerColegio= (req:Request, res:Response):any=>{
        const [error, registerColegioDto ] = RegisterColegioDto.create(req.body);
        
        if(error){ return res.status(400).json({message:error})};
        this.colegioRepository.register(registerColegioDto!)
        .then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
        });
    };

    //findById = (req:Request, res:Response) =>{
    //    const { id } = req.params;
//
    //    this.ColegioRepository.findById(id)
    //    .then( async data =>{
    //        res.json(data)
    //    }).catch(error => {
    //        this.handleError(error,res)
    //    })
    //};

    //findByNameCorto = (req:Request, res:Response) =>{
    //    const nombreCorto = req.query.nom_corto as string;
//
    //    this.ColegioRepository.findByNameCorto(nombreCorto)
    //    .then( async data =>{
    //        res.json(data)
    //    }).catch(error => {
    //        this.handleError(error,res)
    //    })
    //};


    findColegio = (req:Request, res: Response)=>{
        this.colegioRepository.findAll()
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }
}