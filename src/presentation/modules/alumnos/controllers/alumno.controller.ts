import { Request, Response } from "express";
import { CustomError, RegisterAlumnoDto, AlumnoRepository, FilterAlumnoDto, UpdateAlumnoDto } from "../../../../domain/index.js";

interface AuthRequest extends Request {
    payload?: { id_usuario: string, colegio?:{ id_colegio: string } };
}

export class AlumnoController {
    constructor (
        private readonly AlumnoRepository:AlumnoRepository,
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
        const [error, registerAlumnoDto ] = RegisterAlumnoDto.create(data);
        const by = req?.payload?.id_usuario;
        if(error){ return res.status(400).json({message:error})};
        this.AlumnoRepository.register(registerAlumnoDto!,by!)
        .then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
           }
        );
    };

    findById = (req:Request, res:Response) =>{
        const { id } = req.params;
        this.AlumnoRepository.findById(id).then( async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        })
    };

    find = (req:AuthRequest, res: Response)=>{
        const by = req?.payload;
        const page = Number.isNaN(Number(req.query.page)) || !req.query.page ? 1 : Number(req.query.page);
        const limit = Number.isNaN(Number(req.query.limit)) || !req.query.limit ? 10 : Number(req.query.limit);
        this.AlumnoRepository.findAll(page,limit).then(async data =>{

            // res.json(data)
            const response = {
                ok: data.ok,
                message: data.message,
                data: data.data,
                // pagination: {
                    // total: data.data. || 0,
                    // page: data.page || page,
                    // limit: data.limit || limit,
                    // totalPages: data.totalPages || 0,
                    // hasNextPage: data.page && data.totalPages ? data.page < data.totalPages : false,
                    // hasPrevPage: data.page ? data.page > 1 : false,
                // }
            };
            res.json(response);
        }).catch(error => {
            this.handleError(error,res)
        });
    };

    findColegio = (req:AuthRequest, res: Response)=>{
        const id_colegio = req?.payload?.colegio?.id_colegio;
        this.AlumnoRepository.findAllColegio(id_colegio!).then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    };

    filter = (req:Request, res: Response):any=>{
        const id_colegio = req.query.id_colegio as string;
        const alumno = req.query.alumno as string;
        const nro_docu = req.query.nro_docu as string;
        const [error, filterAlumnoDto ] = FilterAlumnoDto.filter({id_colegio, alumno, nro_docu});

        if(error){ return res.status(400).json({message:error})};
        this.AlumnoRepository.filter(filterAlumnoDto!).then(async data =>{
            res.json(data)
        }).catch(error => { 
            this.handleError(error,res)
        });
    };

    updateAll = (req:Request, res:Response):any =>{
        const { id } = req.params;
        const { estado } = req.query;
        const estado_query_str = typeof estado === 'boolean'? String(estado): null;

        const query = { 
            estado: estado_query_str,
        }
        const [error, updateAlumnoDto ] = UpdateAlumnoDto.update(query);
        if(error){ return res.status(400).json({message:error})};

        this.AlumnoRepository.updateAll(id,updateAlumnoDto!).then( async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        })
    };
}