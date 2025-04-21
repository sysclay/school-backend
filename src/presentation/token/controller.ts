import { Request, Response } from "express";
import { CustomError, ValidarTokenDto, TokenRepository } from "../../domain/index.js";

export class TokenController {
    constructor (
        private readonly tokenRepository:TokenRepository,
    ){}

    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({message:error.message});    
        }
        return res.status(500).json({error:'Internal Server Error'});
    }

    validarToken= (req:Request, res:Response):any=>{
        const [error, validarTokenDto ] = ValidarTokenDto.validar(req.body);
        
        if(error){ return res.status(400).json({message:error})};
        this.tokenRepository.validar(validarTokenDto!)
        .then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
        });
    };

}