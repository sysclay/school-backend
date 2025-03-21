import { Request, Response } from "express";
import { CustomError, RegisterApoderadoDto, ApoderadoRepository } from "../../domain/index.js";

export class ApoderadoController {
    constructor (
        private readonly apoderadoRepository:ApoderadoRepository,
    ){}

    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error:error.message});    
        }
        return res.status(500).json({error:'Internal Server Error'});
    }

    registerApoderado= (req:Request, res:Response):any=>{
        const [error, registerApoderadoDto ] = RegisterApoderadoDto.create(req.body);
        
        if(error){ return res.status(400).json({error})};
        this.apoderadoRepository.register(registerApoderadoDto!)
        .then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
           }
        );
    };

    findById = (req:Request, res:Response) =>{
        const { id } = req.params;

        this.apoderadoRepository.findById(id)
        .then( async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        })
    };

    //findByNameCorto = (req:Request, res:Response) =>{
    //    const nombreCorto = req.query.nom_corto as string;
//
    //    this.ApoderadoRepository.findByNameCorto(nombreCorto)
    //    .then( async data =>{
    //        res.json(data)
    //    }).catch(error => {
    //        this.handleError(error,res)
    //    })
    //};


    findApoderado = (req:Request, res: Response)=>{
        this.apoderadoRepository.findAll()
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }
}