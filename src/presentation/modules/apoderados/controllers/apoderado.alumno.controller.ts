import { Request, Response } from "express";
import { CustomError,ApoderadoAlumnoRepository, RegisterApoderadoAlumnoDto, FilterApoderadoAlumnoDto } from "../../../../domain/index.js";

interface AuthRequest extends Request {
  payload?: { 
    id_usuario: string,
    rol:{
        id_rol:string,
    },
    colegio?:{ id_colegio: string }
 };
}


export class ApoderadoAlumnoController {
    constructor (
        private readonly apoderadoalumnoRepository:ApoderadoAlumnoRepository,
    ){}

    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({message:error.message});    
        }
        return res.status(500).json({error:'Internal Server Error'});
    }


    register= (req:AuthRequest, res:Response):any=>{

        const [error, registerRolDto ] = RegisterApoderadoAlumnoDto.create(req.body);
        const by = req?.payload?.id_usuario;

        if(error){ return res.status(400).json({message:error})};
        this.apoderadoalumnoRepository.register(registerRolDto!,by!)
        .then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
        });
    };

    findApoderado = (req:AuthRequest, res: Response)=>{
        const { id_apoderado } = req?.query as { id_apoderado?: string };

        this.apoderadoalumnoRepository.findAllApoderado(id_apoderado!).then(async data =>{
            res.json(data)
        }).catch(error => {
            console.log(error)
            this.handleError(error,res)
        });
    };

    filter= (req:Request, res:Response):any=>{
        const id_persona = req.query.id_persona as string;
        const data = { id_persona }
        const [error, filterApoderadoAlumnoDto ] = FilterApoderadoAlumnoDto.filter(data);
        
        if(error){ return res.status(400).json({message:error})};
        this.apoderadoalumnoRepository.filterAll(filterApoderadoAlumnoDto!)
        .then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
            }
        );
    };

}