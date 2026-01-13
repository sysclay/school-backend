import { Request, Response } from "express";
import { CustomError, LoginUsuarioDto, RegisterUsuarioDto, UpdateUsuarioDto, UsuarioRepository } from "../../../../domain/index.js";

interface AuthRequest extends Request {
  payload?: { id_usuario: string, };
}

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

    register= (req:AuthRequest, res:Response):any=>{
        const [error, registerUsuarioDto ] = RegisterUsuarioDto.create(req.body);
        
        if(error){ return res.status(400).json({message:error})};
        const by = req?.payload?.id_usuario;

        this.usuarioRepository.register(registerUsuarioDto!,by!).then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
        });
    };

    findById = (req:AuthRequest, res: Response)=>{
        const by = req?.payload?.id_usuario;
        this.usuarioRepository.findById(by!).then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

    find = (req:Request, res: Response)=>{
        this.usuarioRepository.findAll().then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

    update = (req:AuthRequest, res: Response):any=>{
        const { id } = req.params;
        const [error, updateUsuarioDto ] = UpdateUsuarioDto.update(req.body);
        if(error){ return res.status(400).json({message:error})};

        this.usuarioRepository.updateAll(id,updateUsuarioDto!).then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

    updateOne = (req:AuthRequest, res: Response):any=>{
        const [error, updateUsuarioDto ] = UpdateUsuarioDto.update(req.body);
        const by = req?.payload?.id_usuario;

        if(error){ return res.status(400).json({message:error})};

        const newf = '489e4a35302e4824a3e9d6b42470c33b5009e3fe'
        this.usuarioRepository.updateOne(by!,updateUsuarioDto!,by!).then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }
}