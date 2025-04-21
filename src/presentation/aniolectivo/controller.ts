import { Request, Response } from "express";
import { CustomError, RegisterAniolectivoDto, AniolectivoRepository } from "../../domain/index.js";

export class AniolectivoController {
    constructor (
        private readonly AniolectivoRepository:AniolectivoRepository,
    ){}

    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({message:error.message});    
        }
        return res.status(500).json({error:'Internal Server Error'});
    }

    registerAniolectivo= (req:Request, res:Response):any=>{
        const [error, registerAniolectivoDto ] = RegisterAniolectivoDto.create(req.body);
        
        if(error){ return res.status(400).json({message:error})};
        this.AniolectivoRepository.register(registerAniolectivoDto!)
        .then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
        });
    };

    //findById = (req:Request, res:Response) =>{
    //    const { id } = req.params;
//
    //    this.AniolectivoRepository.findById(id)
    //    .then( async data =>{
    //        res.json(data)
    //    }).catch(error => {
    //        this.handleError(error,res)
    //    })
    //};

    //findByNameCorto = (req:Request, res:Response) =>{
    //    const nombreCorto = req.query.nom_corto as string;
//
    //    this.AniolectivoRepository.findByNameCorto(nombreCorto)
    //    .then( async data =>{
    //        res.json(data)
    //    }).catch(error => {
    //        this.handleError(error,res)
    //    })
    //};


    findAniolectivo = (req:Request, res: Response)=>{
        this.AniolectivoRepository.findAll()
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }
}