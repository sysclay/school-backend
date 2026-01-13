import { Request, Response } from "express";
import { CustomError,AcademicoRepository, RegisterAcademicoDto } from "../../../../domain/index.js";

interface AuthRequest extends Request {
  payload?: { 
    id_usuario: string,
    rol:{
        id_rol:string,
    }
 };
}

export class AcademicoController {
    constructor (
        private readonly academicoRepository:AcademicoRepository,
    ){}

    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({message:error.message});    
        }
        return res.status(500).json({error:'Internal Server Error'});
    }

    register= (req:AuthRequest, res:Response):any=>{
        const [error, registerAcademicoDto ] = RegisterAcademicoDto.create(req.body);
        const by = req?.payload?.id_usuario;
        if(error){ return res.status(400).json({message:error})};
        this.academicoRepository.register(registerAcademicoDto!,by!)
        .then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
        });
    };

    findAll = (req:Request, res: Response)=>{

        this.academicoRepository.findAll()
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

    findAllActive = (req:AuthRequest, res: Response)=>{
        this.academicoRepository.findAllActive()
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

    findAllActiveActual = (req:AuthRequest, res: Response)=>{
        this.academicoRepository.findAllActiveActual()
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

    // findById = (req:AuthRequest, res: Response)=>{
    //     const id_rol = req?.payload?.rol.id_rol;
    //     this.asignadoRepository.findById(id_rol!)
    //     .then(async data =>{
    //         res.json(data)
    //     }).catch(error => {
    //         this.handleError(error,res)
    //     });
    // }

}