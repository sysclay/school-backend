import { Request, Response } from "express";
import { CustomError,ParentescoRepository, RegisterParentescoDto } from "../../../../domain/index.js";

interface AuthRequest extends Request {
  payload?: { 
    id_usuario: string,
    rol:{
        id_rol:string,
    },
    colegio?:{ id_colegio: string }
 };
}


export class ParentescoController {
    constructor (
        private readonly parentescoRepository:ParentescoRepository,
    ){}

    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({message:error.message});    
        }
        return res.status(500).json({error:'Internal Server Error'});
    }


    register= (req:AuthRequest, res:Response):any=>{

        const id_colegio = req?.payload?.colegio?.id_colegio;
        const valid_id_colegio = (id_colegio !== undefined && id_colegio !== null && id_colegio !== '') ? id_colegio : undefined;
        let data = { ...req.body };
        if (!data.id_colegio || data.id_colegio === '' || data.id_colegio === null || data.id_colegio === undefined) {
            data.id_colegio = valid_id_colegio;
        }

        const [error, registerRolDto ] = RegisterParentescoDto.create(data);
        const by = req?.payload?.id_usuario;

        if(error){ return res.status(400).json({message:error})};
        this.parentescoRepository.register(registerRolDto!,by!)
        .then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
        });
    };

    find = (req:Request, res: Response)=>{
        this.parentescoRepository.findAll()
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

    findActive = (req:Request, res: Response)=>{
        this.parentescoRepository.findAllActive()
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

}