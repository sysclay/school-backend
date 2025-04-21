import { Request, Response } from "express";
import { CustomError, RegisterGradoDto, GradoRepository } from "../../domain/index.js";

export class GradoController {
    constructor (
        private readonly gradoRepository:GradoRepository,
    ){}

    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({message:error.message});    
        }
        return res.status(500).json({error:'Internal Server Error'});
    }

    registerGrado= (req:Request, res:Response):any=>{
        const [error, registerGradoDto ] = RegisterGradoDto.create(req.body);
        
        if(error){ return res.status(400).json({message:error})};
        this.gradoRepository.register(registerGradoDto!)
        .then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
        });
    };

    //findById = (req:Request, res:Response) =>{
    //    const { id } = req.params;
//
    //    this.GradoRepository.findById(id)
    //    .then( async data =>{
    //        res.json(data)
    //    }).catch(error => {
    //        this.handleError(error,res)
    //    })
    //};

    //findByNameCorto = (req:Request, res:Response) =>{
    //    const nombreCorto = req.query.nom_corto as string;
//
    //    this.GradoRepository.findByNameCorto(nombreCorto)
    //    .then( async data =>{
    //        res.json(data)
    //    }).catch(error => {
    //        this.handleError(error,res)
    //    })
    //};


    findGrado = (req:Request, res: Response)=>{
        this.gradoRepository.findAll()
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }
}