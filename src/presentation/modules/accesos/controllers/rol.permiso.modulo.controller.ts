import { Request, Response } from "express";
import { CustomError, RegisterRolPermisoModuloDto, RolPermisoModuloRepository } from "../../../../domain/index.js";

interface AuthRequest extends Request {
  payload?: { 
    id_usuario: string,
    RolPermisoModulo:{
        id_RolPermisoModulo:string,
    }
 };
}

export class RolPermisoModuloController {
    constructor (
        private readonly RolPermisoModuloRepository:RolPermisoModuloRepository,
    ){}

    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({message:error.message});    
        }
        return res.status(500).json({error:'Internal Server Error'});
    }

    register= (req:AuthRequest, res:Response):any=>{
        const [error, registerRolPermisoModuloDto ] = RegisterRolPermisoModuloDto.create(req.body);
        const by = req?.payload?.id_usuario;
        if(error){ return res.status(400).json({message:error})};
        this.RolPermisoModuloRepository.register(registerRolPermisoModuloDto!,by!)
        .then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
        });
    };



    findAll= (req:Request, res: Response)=>{
        this.RolPermisoModuloRepository.findAll()
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }


}