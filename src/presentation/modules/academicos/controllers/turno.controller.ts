import { Request, Response } from "express";
import { CustomError,TurnoRepository, RegisterTurnoDto } from "../../../../domain/index.js";

interface AuthRequest extends Request {
  payload?: { 
    id_usuario: string,
    rol:{
        id_rol:string,
    }
 };
}

export class TurnoController {
    constructor (
        private readonly TurnoRepository:TurnoRepository,
    ){}

    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({message:error.message});    
        }
        return res.status(500).json({error:'Internal Server Error'});
    }

    // register= (req:AuthRequest, res:Response):any=>{
    //     const [error, registerRolDto ] = RegisterAsignadoDto.create(req.body);
    //     const by = req?.payload?.id_usuario;
    //     if(error){ return res.status(400).json({message:error})};
    //     this.asignadoRepository.register(registerRolDto!,by!)
    //     .then(async data=>{
    //         return res.json(data)
    //     }).catch( error => {
    //         return this.handleError(error,res)
    //     });
    // };

    findAll = (req:Request, res: Response)=>{

        this.TurnoRepository.findAll()
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

    findAllActive = (req:AuthRequest, res: Response)=>{
        this.TurnoRepository.findAllActive()
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

    findById = (req:AuthRequest, res: Response)=>{
        // const id_rol = req?.payload?.rol.id_rol;
        const { id } = req.params;
        this.TurnoRepository.findById(id!)
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

}