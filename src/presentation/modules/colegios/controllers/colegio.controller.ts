import { Request, Response } from "express";
import { ColegioRepository, CustomError, RegisterColegioDto  } from "../../../../domain/index.js";
import { UpdateColegioDto } from "../../../../domain/modules/colegios/dtos/update.colegio.dto.js";

interface AuthRequest extends Request {
    payload?: { id_usuario: string, colegio:{ id_colegio:string } };
}


export class ColegioController {
    constructor (
        private readonly colegioRepository:ColegioRepository,
    ){}

    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({message:error.message});    
        }
        return res.status(500).json({error:'Internal Server Error'});
    }

    registerColegio= (req:AuthRequest, res:Response):any=>{
        const [error, registerColegioDto ] = RegisterColegioDto.create(req.body);
        const by = req?.payload?.id_usuario;

        if(error){ return res.status(400).json({message:error})};
        this.colegioRepository.register(registerColegioDto!,by!)
        .then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
        });
    };

    findById = (req:Request, res:Response) =>{
       const { id } = req.params;

       this.colegioRepository.findById(id)
       .then( async data =>{
           res.json(data)
       }).catch(error => {
           this.handleError(error,res)
       })
    };

    //findByNameCorto = (req:Request, res:Response) =>{
    //    const nombreCorto = req.query.nom_corto as string;
//
    //    this.ColegioRepository.findByNameCorto(nombreCorto)
    //    .then( async data =>{
    //        res.json(data)
    //    }).catch(error => {
    //        this.handleError(error,res)
    //    })
    //};


    findAll = (req:Request, res: Response)=>{
        const page = Number.isNaN(Number(req.query.page)) || !req.query.page ? 1 : Number(req.query.page);
        const limit = Number.isNaN(Number(req.query.limit)) || !req.query.limit ? 10 : Number(req.query.limit);

        this.colegioRepository.findAll(Number(page), Number(limit))
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

    findAllActive = (req:Request, res: Response)=>{
        const page = Number.isNaN(Number(req.query.page)) || !req.query.page ? 1 : Number(req.query.page);
        const limit = Number.isNaN(Number(req.query.limit)) || !req.query.limit ? 10 : Number(req.query.limit);

        this.colegioRepository.findAll(Number(page), Number(limit))
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

    findOne = (req:AuthRequest, res: Response)=>{
        const id_colegio = req.payload?.colegio.id_colegio;
        this.colegioRepository.findOne(id_colegio!)
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

    updateAll = (req:AuthRequest, res: Response):any=>{
        const [error, updateColegioDto ] = UpdateColegioDto.update(req.body);
        if(error){ return res.status(400).json({message:error})};
        const by = req?.payload?.id_usuario;
        this.colegioRepository.updateAll(updateColegioDto!,by!)
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }


}