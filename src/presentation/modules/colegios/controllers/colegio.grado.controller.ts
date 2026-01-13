import { Request, Response } from "express";
import { ColegioGradoRepository, CustomError, FilterColegioGradoDto, RegisterColegioGradoDto, UpdateColegioGradoDto  } from "../../../../domain/index.js";

interface AuthRequest extends Request {
    payload?: { id_usuario: string, };
}

export class ColegioGradoController {
    constructor (
        private readonly ColegioGradoRepository:ColegioGradoRepository,
    ){}

    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({message:error.message});    
        }
        return res.status(500).json({error:'Internal Server Error'});
    }

    registerColegioGrado= (req:AuthRequest, res:Response):any=>{
        const [error, registerColegioGradoDto ] = RegisterColegioGradoDto.create(req.body);
        const by = req?.payload?.id_usuario;
        if(error){ return res.status(400).json({message:error})};
        this.ColegioGradoRepository.register(registerColegioGradoDto!,by!)
        .then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
        });
    };

    findByIdColegio = (req:Request, res:Response) =>{
       const { id } = req.params;

       this.ColegioGradoRepository.findByIdColegio(id)
       .then( async data =>{
           res.json(data)
       }).catch(error => {
           this.handleError(error,res)
       })
    };


    findColegioGrado = (req:Request, res: Response)=>{
        const page = Number.isNaN(Number(req.query.page)) || !req.query.page ? 1 : Number(req.query.page);
        const limit = Number.isNaN(Number(req.query.limit)) || !req.query.limit ? 10 : Number(req.query.limit);

        this.ColegioGradoRepository.findAll(Number(page), Number(limit))
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

    filter=(req:Request, res: Response):any=>{

        const { id_colegio, id_nivel } = req.query;

        const id_colegio_query_str = typeof id_colegio === 'string' && id_colegio.trim() !== ''? id_colegio.trim(): null;
        const id_nivel_query_str = typeof id_nivel === 'string' && id_nivel.trim() !== ''? id_nivel.trim(): null;

        const query = { 
            id_colegio: id_colegio_query_str,
            id_nivel: id_nivel_query_str
        }
        const [error, filterColegioGradoDto ] = FilterColegioGradoDto.filter(query);
        if(error){ return res.status(400).json({message:error})};
        this.ColegioGradoRepository.filter(filterColegioGradoDto!)
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

    updateIsActive = (req:AuthRequest, res: Response):any=>{
        const [error, updateColegioGradoDto ] = UpdateColegioGradoDto.update(req.body);
        if(error){ return res.status(400).json({message:error})};
        const by = req?.payload?.id_usuario;

        this.ColegioGradoRepository.updateIsActive(updateColegioGradoDto!,by!)
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }
}