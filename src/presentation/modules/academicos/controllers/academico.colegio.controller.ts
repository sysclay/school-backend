import { Request, Response } from "express";
import { CustomError, RegisterAcademicoColegioDto, AcademicoColegioRepository, FilterAcademicoColegioDto } from "../../../../domain/index.js";

interface AuthRequest extends Request {
  payload?: { 
    id_usuario: string,
    rol:{
        id_rol:string,
    },
    colegio:{
        id_colegio:string,
    }
 };
}

export class AcademicoColegioController {
    constructor (
        private readonly academicoColegioRepository:AcademicoColegioRepository,
    ){}

    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({message:error.message});    
        }
        return res.status(500).json({error:'Internal Server Error'});
    }

    register= (req:AuthRequest, res:Response):any=>{
        const [error, registerAcademicoColegioDto ] = RegisterAcademicoColegioDto.create(req.body);
        const by = req?.payload?.id_usuario;

        if(error){ return res.status(400).json({message:error})};
        this.academicoColegioRepository.register(registerAcademicoColegioDto!,by!)
        .then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
        });
    };

    findAll = (req:Request, res: Response)=>{
        this.academicoColegioRepository.findAll()
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

    findAllActive = (req:Request, res: Response)=>{
        const page = Number.isNaN(Number(req.query.page)) || !req.query.page ? 1 : Number(req.query.page);
        const limit = Number.isNaN(Number(req.query.limit)) || !req.query.limit ? 10 : Number(req.query.limit);

        this.academicoColegioRepository.findAllActive(Number(page), Number(limit))
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

    filter = (req:AuthRequest, res: Response):any=>{

        const { id_colegio, id_academico } = req.query;

        const id_colegio_query_str = typeof id_colegio === 'string' && id_colegio.trim() !== ''? id_colegio.trim(): null;
        const id_academico_query_str = typeof id_academico === 'string' && id_academico.trim() !== ''? id_academico.trim(): null;

        const id_colegio_payload = req.payload?.colegio!==null?req.payload?.colegio.id_colegio:null;
        const filter = {
            id_colegio:id_colegio_query_str || id_colegio_payload,
            id_academico:id_academico_query_str,
        }

        const [error,filterAcademicoColegioDto]=FilterAcademicoColegioDto.filter(filter);
        if (error) { return res.status(400).json({ message: error });}

        this.academicoColegioRepository.filter(filterAcademicoColegioDto!)
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

    findById = (req:AuthRequest, res: Response)=>{
        const { id } = req.params;
        this.academicoColegioRepository.findById(id!)
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

}