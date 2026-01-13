import { Request, Response } from "express";
import { CustomError, PermisoRepository, RegisterPermisoDto, UpdatePermisoDto } from "../../../../domain/index.js";

interface AuthRequest extends Request {
    payload?: { 
      id_usuario: string,
      RolPermisoModulo:{
          id_RolPermisoModulo:string,
      }
   };
  }

export class PermisoController {
    constructor (
        private readonly permisoRepository:PermisoRepository,
    ){}

    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({message:error.message});    
        }
        return res.status(500).json({error:'Internal Server Error'});
    }

    registerPermiso = (req:AuthRequest, res: Response):any=>{
        const [error, registerPermisoDto ] = RegisterPermisoDto.create(req.body);
        if(error) return res.status(400).json({message:error});
        const by = req?.payload?.id_usuario;
        this.permisoRepository.register(registerPermisoDto!,by!).then(async data =>{
            return res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    };

    findAllPermiso = (req:Request, res: Response)=>{
        this.permisoRepository.findAll().then(async data =>{
            return res.json(data)
        }).catch(error => {
            return this.handleError(error,res)
        });
    };

    updatePermiso = (req:AuthRequest, res: Response):any=>{
        const { id } = req.params;
        const [error, updatePermisoDto ] = UpdatePermisoDto.update(req.body);
        if(error) return res.status(400).json({message:error});
        const by = req?.payload?.id_usuario;
        this.permisoRepository.updateAll(id,updatePermisoDto!,by!).then(async data =>{
            return res.json(data)
        }).catch(error => {
            return this.handleError(error,res)
        });
    };

}