import { Request, Response } from "express";
import { ColegioNivelRepository, CustomError, FilterColegioNivelDto, RegisterColegioNivelDto, UpdateColegioNivelDto  } from "../../../../domain/index.js";

interface AuthRequest extends Request {
    payload?: { id_usuario: string, };
}

export class ColegioNivelController {
    constructor (
        private readonly colegioNivelRepository:ColegioNivelRepository,
    ){}

    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({message:error.message});    
        }
        return res.status(500).json({error:'Internal Server Error'});
    }

    register= (req:AuthRequest, res:Response):any=>{
        const [error, registerColegioNivelDto ] = RegisterColegioNivelDto.create(req.body);
        const by = req?.payload?.id_usuario;
        if(error){ return res.status(400).json({message:error})};
        this.colegioNivelRepository.register(registerColegioNivelDto!,by!)
        .then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
        });
    };

    findById = (req:Request, res:Response) =>{
        const { id } = req.params;
 
        this.colegioNivelRepository.findByIdColegio(id)
        .then( async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        })
     };


    find = (req:Request, res: Response)=>{
        const page = Number.isNaN(Number(req.query.page)) || !req.query.page ? 1 : Number(req.query.page);
        const limit = Number.isNaN(Number(req.query.limit)) || !req.query.limit ? 10 : Number(req.query.limit);

        this.colegioNivelRepository.findAll(Number(page), Number(limit))
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

    filter=(req:Request, res: Response):any=>{

        const { id_colegio } = req.query;

        const id_colegio_query_str = typeof id_colegio === 'string' && id_colegio.trim() !== ''? id_colegio.trim(): null;

        const query = { 
            id_colegio: id_colegio_query_str,
        }
        const [error, filterColegioNivelDto ] = FilterColegioNivelDto.filter(query);
        if(error){ return res.status(400).json({message:error})};
        this.colegioNivelRepository.filter(filterColegioNivelDto!)
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

    updateIsActive = (req:AuthRequest, res: Response):any=>{
        const [error, updateColegioNivelDto ] = UpdateColegioNivelDto.update(req.body);
        if(error){ return res.status(400).json({message:error})};
        const by = req?.payload?.id_usuario;

        this.colegioNivelRepository.updateIsActive(updateColegioNivelDto!,by!)
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

}