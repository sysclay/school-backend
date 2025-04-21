import { Request, Response } from "express";
import { CustomError, RegisterTipoDocumentoDto, TipoDocumentoRepository } from "../../domain/index.js";

export class TipoDocumentoController {
    constructor (
        private readonly tipoDocumentoRepository:TipoDocumentoRepository,
    ){}

    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({message:error.message});    
        }
        return res.status(500).json({error:'Internal Server Error'});
    }

    registerTipoDocumento= (req:Request, res:Response):any=>{
        const [error, registerTipoDocumentoDto ] = RegisterTipoDocumentoDto.create(req.body);

        if(error){ return res.status(400).json({message:error})};
        this.tipoDocumentoRepository.register(registerTipoDocumentoDto!)
        .then(async data=>{
            return res.json({data:'Mis datos'})
        }).catch( error => {
            return this.handleError(error,res)
           }
        );
    };

    findById = (req:Request, res:Response) =>{
        const { id } = req.params;

        this.tipoDocumentoRepository.findById(id)
        .then( async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        })
    };

    findByNameCorto = (req:Request, res:Response) =>{
        const nombreCorto = req.query.nom_corto as string;

        this.tipoDocumentoRepository.findByNameCorto(nombreCorto)
        .then( async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        })
    };


    findTipoDocumento = (req:Request, res: Response)=>{
        const { user } = req as any;
        this.tipoDocumentoRepository.findAll()
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }
}