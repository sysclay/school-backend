import { Request, Response } from "express";
import { CheckRolUsuarioDto, CustomError, LoginRepository, LoginUsuarioDto } from "../../../../domain/index.js";

export class LoginController {
    constructor (
        private readonly loginRepository:LoginRepository,
    ){}

    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({message:error.message});    
        }
        return res.status(500).json({error:'Internal Server Error'});
    }


    loginUsuario= (req:Request, res:Response):any=>{
        const [error, loginUsuarioDto ] = LoginUsuarioDto.login(req.body);
        if(error){ return res.status(400).json({ message: error})};
        this.loginRepository.login(loginUsuarioDto!).then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
        });
    };

    checkRol=(req:Request, res:Response):any=>{
        const [error, checkRolUsuarioDto ] = CheckRolUsuarioDto.checkRol(req.body);
        
        if(error){ return res.status(400).json({ message: error})};
        this.loginRepository.checkRol(checkRolUsuarioDto!).then(async data=>{
            return res.json(data)
        }).catch( error => {

            return this.handleError(error,res)
        });
    }

    validarToken= (req:Request, res:Response):any=>{
        // const [error, validarTokenDto ] = ValidarTokenDto.validar(req.body);
        // const token = req.headers.authorization?.split(' ')[1];
        const token = req.body.token;
        // if(error){ return res.status(400).json({message:error})};
        this.loginRepository.validar(token!)
        .then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
        });
    };

}