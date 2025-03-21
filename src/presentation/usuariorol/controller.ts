import { Request, Response } from "express";
import { CustomError, RegisterUsuariorolDto, UsuariorolRepository } from "../../domain/index.js";

export class UsuariorolController {
    constructor (
        private readonly usuariorolRepository:UsuariorolRepository,
    ){}

    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error:error.message});    
        }
        return res.status(500).json({error:'Internal Server Error'});
    }

    registerUsuariorol= (req:Request, res:Response):any=>{
        const [error, registerUsuariorolDto ] = RegisterUsuariorolDto.create(req.body);
        
        if(error){ return res.status(400).json({error})};
        this.usuariorolRepository.register(registerUsuariorolDto!)
        .then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
        });
    };

    //findById = (req:Request, res:Response) =>{
    //    const { id } = req.params;
//
    //    this.UsuariorolRepository.findById(id)
    //    .then( async data =>{
    //        res.json(data)
    //    }).catch(error => {
    //        this.handleError(error,res)
    //    })
    //};

    //findByNameCorto = (req:Request, res:Response) =>{
    //    const nombreCorto = req.query.nom_corto as string;
//
    //    this.UsuariorolRepository.findByNameCorto(nombreCorto)
    //    .then( async data =>{
    //        res.json(data)
    //    }).catch(error => {
    //        this.handleError(error,res)
    //    })
    //};


    findUsuariorol = (req:Request, res: Response)=>{
        this.usuariorolRepository.findAll()
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }
}