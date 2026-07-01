import { Request, Response } from "express";
import { CustomError, RegisterPersonaRolDto, PersonaRolRepository } from "../../../../domain/index.js";

interface AuthRequest extends Request {
  payload?: { id_usuario: string, };
}

export class PersonaRolController {
    constructor (
        private readonly PersonaRolRepository:PersonaRolRepository,
    ){}

    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({message:error.message});    
        }
        return res.status(500).json({error:'Internal Server Error'});
    }

    register= (req:AuthRequest, res:Response):any=>{
        const [error, registerPersonaRolDto ] = RegisterPersonaRolDto.create(req.body);
        if(error){ return res.status(400).json({message:error})};
        const by = req?.payload?.id_usuario;

        this.PersonaRolRepository.register(registerPersonaRolDto!,by!)
        .then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
           }
        );
    };
    
    find = (req:Request, res: Response)=>{
        const page = Number.isNaN(Number(req.query.page)) || !req.query.page ? 1 : Number(req.query.page);
        const limit = Number.isNaN(Number(req.query.limit)) || !req.query.limit ? 10 : Number(req.query.limit);
        const role = typeof req.query.role === 'string' ? req.query.role : '';
        const search = typeof req.query.search === 'string' ? req.query.search : '';

        this.PersonaRolRepository.findAll(Number(page), Number(limit), role, search)
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

    // filterPersonaRol = (req:Request, res: Response):any=>{
    //     const nro_documento = req.query.nro_documento as string;
    //     const [error, filterPersonaRolDto ] = FilterPersonaRolDto.filter({nro_documento});
        
    //     if(error){ return res.status(400).json({message:error})};
    //     this.PersonaRolRepository.filterAll(filterPersonaRolDto!).then(async data =>{
    //         res.json(data)
    //     }).catch(error => {
    //         this.handleError(error,res)
    //     });
    // };

    // updateQR = (req:Request, res:Response) =>{
    //     const { id } = req.params;

    //     this.PersonaRolRepository.updateQR(id).then( async data =>{
    //         res.json(data)
    //     }).catch(error => {
    //         this.handleError(error,res)
    //     })
    // };


    
}