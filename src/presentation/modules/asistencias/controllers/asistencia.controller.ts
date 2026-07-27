import { Request, Response } from "express";
import { AsistenciaRepository, CustomError, FilterAsistenciaMarcadoDto, RegisterAsistenciaDto, ResumenAlumnoDto, ResumenMonthDto, UpdateAsistenciaDto  } from "../../../../domain/index.js";
import { FilterAsistenciaDto } from "../../../../domain/modules/asistencias/dtos/filter.asistencia.dto.js";
import { ResumenDayDto } from "../../../../domain/modules/asistencias/dtos/resumen.day.dto.js";

interface AuthRequest extends Request {
    payload?: { id_usuario: string, asistencia:{ id_asistencia:string } };
}


export class AsistenciaController {
    constructor (
        private readonly asistenciaRepository:AsistenciaRepository,
    ){}

    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({message:error.message});    
        }
        return res.status(500).json({error:'Internal Server Error'});
    }

    registerAsistencia= (req:AuthRequest, res:Response):any=>{
        const [error, registerAsistenciaDto ] = RegisterAsistenciaDto.create(req.body);
        const by = req?.payload?.id_usuario;

        if(error){ return res.status(400).json({message:error})};
        this.asistenciaRepository.register(registerAsistenciaDto!,by!)
        .then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
        });
    };

    filter = (req:AuthRequest, res: Response):any=>{
        const { id_matricula, id_asistencia_programado, fecha } = req.query;
        const id_matricula_query_str = typeof id_matricula === 'string' && id_matricula.trim() !== ''? id_matricula.trim(): null;
        const id_asistencia_programado_query_str = typeof id_asistencia_programado === 'string' && id_asistencia_programado.trim() !== ''? id_asistencia_programado.trim(): null;
        const id_fecha_query_str = typeof fecha === 'string' && fecha.trim() !== ''? fecha.trim(): null;
        const query = { 
            id_matricula: id_matricula_query_str,
            id_asistencia_programado: id_asistencia_programado_query_str,
            fecha: id_fecha_query_str,
        };

        const [error, filterAsistenciaDto ] = FilterAsistenciaDto.filter(query);
        if(error){ return res.status(400).json({message:error})};
        this.asistenciaRepository.filter(filterAsistenciaDto!)
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

    filterMatricula = (req: AuthRequest, res: Response): any => {
        const { id_grupo_academico, id_matricula, fecha_inicio, fecha_fin } = req.query;

        const query = {
            id_grupo_academico: typeof id_grupo_academico === "string" && id_grupo_academico.trim() !== ""
                ? id_grupo_academico.trim()
                : null,

            id_matricula: typeof id_matricula === "string" && id_matricula.trim() !== ""
                ? id_matricula.trim()
                : null,

            fecha_inicio: typeof fecha_inicio === "string" && fecha_inicio.trim() !== ""
                ? fecha_inicio.trim()
                : null,

            fecha_fin: typeof fecha_fin === "string" && fecha_fin.trim() !== ""
                ? fecha_fin.trim()
                : null,
        };

        const [error, filterAsistenciaMarcadoDto] = FilterAsistenciaMarcadoDto.filterMarcado(query);
        if (error) return res.status(400).json({ message: error });

        this.asistenciaRepository.filterMarcado(filterAsistenciaMarcadoDto!, 1, 400)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    };

    update = (req:AuthRequest, res: Response):any=>{

        const [error, updateAsistenciaDto ] = UpdateAsistenciaDto.update(req.body);
        const by = req?.payload?.id_usuario;
        if(error){ return res.status(400).json({message:error})};
        this.asistenciaRepository.update('',updateAsistenciaDto!, by!)
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

    resumenMonth = (req: AuthRequest, res: Response): any => {
        const {
            id_colegio,
            id_anio_academico,
            id_grupo_academico,
            month,
        } = req.query;
        const query = {
            id_colegio: typeof id_colegio === 'string' && id_colegio.trim() !== ''
                ? id_colegio.trim()
                : null,

            id_anio_academico: typeof id_anio_academico === 'string' && id_anio_academico.trim() !== ''
                ? id_anio_academico.trim()
                : null,

            id_grupo_academico: typeof id_grupo_academico === 'string' && id_grupo_academico.trim() !== ''
                ? id_grupo_academico.trim()
                : null,

            month: month != null ? Number(month) : null,
        };

        const [error, resumenMonthDto] = ResumenMonthDto.resumenMonth(query);
        if (error) {
            return res.status(400).json({ message: error });
        }

        this.asistenciaRepository.resumenMonth(resumenMonthDto!, 1, 1000)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    };

    resumenDay = (req: AuthRequest, res: Response): any => {
        const { id_asistencia_programada } = req.query;
        const query = {
            id_asistencia_programada: typeof id_asistencia_programada === "string" && id_asistencia_programada.trim() !== ""
                ? id_asistencia_programada.trim()
                : null,
        };


        const [error, resumenDayDto] = ResumenDayDto.resumenDay(query);
        if (error) return res.status(400).json({ message: error });

        this.asistenciaRepository.resumenDay(resumenDayDto!, 1, 400)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    };
    resumenAlumno = (req: AuthRequest, res: Response): any => {
        const { id_alumno } = req.query;
        const query = {
            id_alumno: typeof id_alumno === "string" && id_alumno.trim() !== ""
                ? id_alumno.trim()
                : null,
        };
        console.log(query,id_alumno, 'query');
        const [error, resumenAlumnoDto] = ResumenAlumnoDto.resumenAlumno(query);
        if (error) return res.status(400).json({ message: error });

        this.asistenciaRepository.resumenAlumno(resumenAlumnoDto!, 1, 400)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    };

}