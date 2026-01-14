import { Request, Response } from "express";
import { CustomError, RegisterMatriculaDto, MatriculaRepository, FilterMatriculaDto } from "../../../../domain/index.js";

interface AuthRequest extends Request {
  payload?: { id_usuario: string, };
}
export class MatriculaController {
    constructor (
        private readonly matriculaRepository:MatriculaRepository,
    ){}

    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({message:error.message});    
        }
        return res.status(500).json({error:'Internal Server Error'});
    }

    register= (req:AuthRequest, res:Response):any=>{
        const [error, registerMatriculaDto ] = RegisterMatriculaDto.create(req.body);
        const by = req?.payload?.id_usuario;
        if(error){ return res.status(400).json({message:error})};
        this.matriculaRepository.register(registerMatriculaDto!,by!)
        .then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
           }
        );
    };

    // findById = (req:Request, res:Response) =>{
    //     const { id } = req.params;

    //     this.matriculaRepository.findById(id)
    //     .then( async data =>{
    //         res.json(data)
    //     }).catch(error => {
    //         this.handleError(error,res)
    //     })
    // };

    find = (req:Request, res: Response)=>{
        const page = Number.isNaN(Number(req.query.page)) || !req.query.page ? 1 : Number(req.query.page);
        const limit = Number.isNaN(Number(req.query.limit)) || !req.query.limit ? 10 : Number(req.query.limit);

        this.matriculaRepository.findAll(Number(page), Number(limit), )
        .then(async data =>{
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
            res.json(response)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

    filter=(req:Request, res: Response):any=>{

        const { id_grupo, id_academico, id_colegio, id_nivel, id_grado, id_seccion, id_alumno, page, limit } = req.query;
        const page_query = Number.isNaN(Number(page)) || !page ? 1 : Number(page);
        const limit_query = Number.isNaN(Number(limit)) || !limit ? 100 : Number(limit);

        const id_grupo_query_str = typeof id_grupo === 'string' && id_grupo.trim() !== ''? id_grupo.trim(): null;
        const id_academico_query_str = typeof id_academico === 'string' && id_academico.trim() !== ''? id_academico.trim(): null;
        const id_colegio_query_str = typeof id_colegio === 'string' && id_colegio.trim() !== ''? id_colegio.trim(): null;
        const id_nivel_query_str = typeof id_nivel === 'string' && id_nivel.trim() !== ''? id_nivel.trim(): null;
        const id_grado_query_str = typeof id_grado === 'string' && id_grado.trim() !== ''? id_grado.trim(): null;
        const id_seccion_query_str = typeof id_seccion === 'string' && id_seccion.trim() !== ''? id_seccion.trim(): null;
        const id_alumno_query_str = typeof id_alumno === 'string' && id_alumno.trim() !== ''? id_alumno.trim(): null;

        const query = { 
            id_grupo_academico: id_grupo_query_str,
            id_anio_academico_colegio: id_academico_query_str,
            id_colegio: id_colegio_query_str,
            id_nivel: id_nivel_query_str,
            id_grado: id_grado_query_str,
            id_seccion: id_seccion_query_str,
            id_alumno: id_alumno_query_str,
        }
        const [error, filterMatriculaDto ] = FilterMatriculaDto.filter(query);
        if(error){ return res.status(400).json({message:error})};
        this.matriculaRepository.filter(filterMatriculaDto!,Number(page_query), Number(limit_query), )
        .then(async data =>{
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
            res.json(response)
        }).catch(error => {
            this.handleError(error,res)
        });
    }
    
}