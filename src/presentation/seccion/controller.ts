import { Request, Response } from "express";
import { CustomError, RegisterSeccionDto, SeccionRepository } from "../../domain/index.js";

export class SeccionController {
    constructor (
        private readonly seccionRepository:SeccionRepository,
    ){}

    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error:error.message});    
        }
        return res.status(500).json({error:'Internal Server Error'});
    }

    registerSeccion= (req:Request, res:Response):any=>{
        const [error, registerSeccionDto ] = RegisterSeccionDto.create(req.body);
        
        if(error){ return res.status(400).json({error})};
        this.seccionRepository.register(registerSeccionDto!)
        .then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
        });
    };

    //findById = (req:Request, res:Response) =>{
    //    const { id } = req.params;
//
    //    this.SeccionRepository.findById(id)
    //    .then( async data =>{
    //        res.json(data)
    //    }).catch(error => {
    //        this.handleError(error,res)
    //    })
    //};

    //findByNameCorto = (req:Request, res:Response) =>{
    //    const nombreCorto = req.query.nom_corto as string;
//
    //    this.SeccionRepository.findByNameCorto(nombreCorto)
    //    .then( async data =>{
    //        res.json(data)
    //    }).catch(error => {
    //        this.handleError(error,res)
    //    })
    //};


    findSeccion = (req:Request, res: Response)=>{
        this.seccionRepository.findAll()
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }
}