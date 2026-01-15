import { Request, Response } from "express";
import { CustomError, RegisterPersonaRolColegioDto, PersonaRolColegioRepository, UpdatePersonaRolColegioDto } from "../../../../domain/index.js";

interface AuthRequest extends Request {
  payload?: { id_usuario: string, };
}

export class PersonaRolColegioController {
    constructor (
        private readonly PersonaRolColegioRepository:PersonaRolColegioRepository,
    ){}

    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({message:error.message});    
        }
        return res.status(500).json({error:'Internal Server Error'});
    }

    register= (req:AuthRequest, res:Response):any=>{
        const [error, registerPersonaRolColegioDto ] = RegisterPersonaRolColegioDto.create(req.body);
        if(error){ return res.status(400).json({message:error})};
        const by = req?.payload?.id_usuario;

        this.PersonaRolColegioRepository.register(registerPersonaRolColegioDto!,by!)
        .then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
        });
    };
    
    find = (req:Request, res: Response)=>{
        const page = Number.isNaN(Number(req.query.page)) || !req.query.page ? 1 : Number(req.query.page);
        const limit = Number.isNaN(Number(req.query.limit)) || !req.query.limit ? 10 : Number(req.query.limit);
        const role = typeof req.query.role === 'string' ? req.query.role : '';
        const colegio = typeof req.query.colegio === 'string' ? req.query.colegio : '';
        const search = typeof req.query.search === 'string' ? req.query.search : '';

        this.PersonaRolColegioRepository.findAll(Number(page), Number(limit), role, colegio, search)
        .then(async data =>{
            // Return pagination response with metadata
            const response = {
                ok: data.ok,
                message: data.message,
                data: data.data,
                pagination: {
                    total: data.total || 0,
                    page: data.page || page,
                    limit: data.limit || limit,
                    totalPages: data.totalPages || 0,
                    hasNextPage: data.page && data.totalPages ? data.page < data.totalPages : false,
                    hasPrevPage: data.page ? data.page > 1 : false,
                }
            };
            res.json(response);
        }).catch(error => {
            this.handleError(error,res)
        });
    };

    // filterPersonaRolColegio = (req:Request, res: Response):any=>{
    //     const nro_documento = req.query.nro_documento as string;
    //     const [error, filterPersonaRolColegioDto ] = FilterPersonaRolColegioDto.filter({nro_documento});
        
    //     if(error){ return res.status(400).json({message:error})};
    //     this.PersonaRolColegioRepository.filterAll(filterPersonaRolColegioDto!).then(async data =>{
    //         res.json(data)
    //     }).catch(error => {
    //         this.handleError(error,res)
    //     });
    // };

    // updateQR = (req:Request, res:Response) =>{
    //     const { id } = req.params;

    //     this.PersonaRolColegioRepository.updateQR(id).then( async data =>{
    //         res.json(data)
    //     }).catch(error => {
    //         this.handleError(error,res)
    //     })
    // };

    updateAll = (req:AuthRequest, res: Response):any=>{
        const [error, updatePersonaRolColegioDto ] = UpdatePersonaRolColegioDto.update(req.body);
        if(error){ return res.status(400).json({message:error})};
        const by = req?.payload?.id_usuario;

        this.PersonaRolColegioRepository.updateAll(updatePersonaRolColegioDto!,by!)
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }


    
}