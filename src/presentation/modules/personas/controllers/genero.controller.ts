import { Request, Response } from "express";
import { CustomError, RegisterGeneroDto, GeneroRepository } from "../../../../domain/index.js";

interface AuthRequest extends Request {
  payload?: { id_usuario: string, };
}

export class GeneroController {
    constructor (
        private readonly GeneroRepository:GeneroRepository,
    ){}

    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({message:error.message});    
        }
        return res.status(500).json({error:'Internal Server Error'});
    }

    registerGenero= (req:AuthRequest, res:Response):any=>{
        const [error, registerGeneroDto ] = RegisterGeneroDto.create(req.body);
        if(error){ return res.status(400).json({message:error})};
        const by = req?.payload?.id_usuario;

        this.GeneroRepository.register(registerGeneroDto!,by!)
        .then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
           }
        );
    };
    

    findGeneroById = (req:AuthRequest, res:Response) =>{
        const { id } = req.params;
        const by = req?.payload?.id_usuario;
        this.GeneroRepository.findById(by!).then( async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        })
    };

    findGenero = (req:Request, res: Response)=>{

        this.GeneroRepository.findAll()
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    };

    // filterGenero = (req:Request, res: Response):any=>{
    //     const nro_documento = req.query.nro_documento as string;
    //     const [error, filterGeneroDto ] = FilterGeneroDto.filter({nro_documento});
        
    //     if(error){ return res.status(400).json({message:error})};
    //     this.GeneroRepository.filterAll(filterGeneroDto!).then(async data =>{
    //         res.json(data)
    //     }).catch(error => {
    //         this.handleError(error,res)
    //     });
    // };

    // updateQR = (req:Request, res:Response) =>{
    //     const { id } = req.params;

    //     this.GeneroRepository.updateQR(id).then( async data =>{
    //         res.json(data)
    //     }).catch(error => {
    //         this.handleError(error,res)
    //     })
    // };


    
}