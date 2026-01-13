import { Request, Response } from "express";
import { CustomError,ApoderadoRepository, RegisterApoderadoDto, FilterApoderadoDto } from "../../../../domain/index.js";

interface AuthRequest extends Request {
  payload?: { 
    id_usuario: string,
    rol:{
        id_rol:string,
    },
    colegio?:{ id_colegio: string }
 };
}


export class ApoderadoController {
    constructor (
        private readonly apoderadoRepository:ApoderadoRepository,
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

        const [error, registerRolDto ] = RegisterApoderadoDto.create(data);
        const by = req?.payload?.id_usuario;

        if(error){ return res.status(400).json({message:error})};
        this.apoderadoRepository.register(registerRolDto!,by!)
        .then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
        });
    };

    find = (req:Request, res: Response)=>{
        this.apoderadoRepository.findAll()
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

    findColegio = (req:AuthRequest, res: Response)=>{
        const id_colegio_payload = req?.payload?.colegio?.id_colegio;
        const { id_colegio:id_colegio_query, page, limit } = req?.query as { id_colegio?: string, page?:string, limit?:string };

        const id_colegio = id_colegio_payload || id_colegio_query;

        this.apoderadoRepository.findAllColegio(id_colegio!).then(async data =>{
            res.json(data)
        }).catch(error => {
            // console.log(error)
            this.handleError(error,res)
        });
    };

    findById = (req:AuthRequest, res: Response)=>{
        const id_rol = req?.payload?.rol.id_rol;
        this.apoderadoRepository.findById(id_rol!)
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

    filter= (req:Request, res:Response):any=>{
        const nro_documento = req.query.nro_documento as string;
        const year = req.query.year as string;
        const data = { nro_documento,year }
        const [error, filterApoderadoAlumnoDto ] = FilterApoderadoDto.filter(data);
        
        if(error){ return res.status(400).json({message:error})};
        this.apoderadoRepository.filterAll(filterApoderadoAlumnoDto!)
        .then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
            }
        );
    };

}