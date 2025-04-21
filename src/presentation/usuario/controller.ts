import { Request, Response } from "express";
import { CustomError, LoginUsuarioDto, RegisterUsuarioDto, UpdateUsuarioDto, UsuarioRepository } from "../../domain/index.js";

export class UsuarioController {
    constructor (
        private readonly usuarioRepository:UsuarioRepository,
    ){}

    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({message:error.message});    
        }
        return res.status(500).json({error:'Internal Server Error'});
    }

    registerUsuario= (req:Request, res:Response):any=>{
        const [error, registerUsuarioDto ] = RegisterUsuarioDto.create(req.body);
        
        if(error){ return res.status(400).json({message:error})};
        this.usuarioRepository.register(registerUsuarioDto!).then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
        });
    };

    loginUsuario= (req:Request, res:Response):any=>{
        const [error, loginUsuarioDto ] = LoginUsuarioDto.login(req.body);
        
        if(error){ return res.status(400).json({ message: error})};
        this.usuarioRepository.login(loginUsuarioDto!).then(async data=>{
            return res.json(data)
        }).catch( error => {

            return this.handleError(error,res)
        });
    };

    findUsuario = (req:Request, res: Response)=>{
        this.usuarioRepository.findAll().then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

    updateUsuario = (req:Request, res: Response):any=>{
        const { id } = req.params;
        const [error, updateUsuarioDto ] = UpdateUsuarioDto.update(req.body);
        if(error){ return res.status(400).json({message:error})};

        this.usuarioRepository.updateAll(id,updateUsuarioDto!).then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }
}