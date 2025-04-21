import { Request, Response } from "express";
import { CustomError, RegisterDocenteDto, DocenteRepository } from "../../domain/index.js";

export class DocenteController {
    constructor (
        private readonly docenteRepository:DocenteRepository,
    ){}

    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({message:error.message});    
        }
        return res.status(500).json({error:'Internal Server Error'});
    }

    registerDocente= (req:Request, res:Response):any=>{
        const [error, registerDocenteDto ] = RegisterDocenteDto.create(req.body);
        
        if(error){ return res.status(400).json({message:error})};
        this.docenteRepository.register(registerDocenteDto!)
        .then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
           }
        );
    };

    findById = (req:Request, res:Response) =>{
        const { id } = req.params;

        this.docenteRepository.findById(id)
        .then( async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        })
    };

    //findByNameCorto = (req:Request, res:Response) =>{
    //    const nombreCorto = req.query.nom_corto as string;
//
    //    this.DocenteRepository.findByNameCorto(nombreCorto)
    //    .then( async data =>{
    //        res.json(data)
    //    }).catch(error => {
    //        this.handleError(error,res)
    //    })
    //};


    findDocente = (req:Request, res: Response)=>{
        this.docenteRepository.findAll()
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }
}