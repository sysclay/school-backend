import { Request, Response } from "express";
import { AsistenciaRepository, CustomError, RegisterAsistenciaDto, UpdateAsistenciaDto  } from "../../../../domain/index.js";
import { FilterAsistenciaDto } from "../../../../domain/modules/asistencias/dtos/filter.asistencia.dto.js";

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

        // console.log('FILTER CONTROLLER::',query)
        const [error, filterAsistenciaDto ] = FilterAsistenciaDto.filter(query);
        if(error){ return res.status(400).json({message:error})};
        this.asistenciaRepository.filter(filterAsistenciaDto!)
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

    update = (req:AuthRequest, res: Response):any=>{

        const [error, updateAsistenciaDto ] = UpdateAsistenciaDto.update(req.body);
        const by = req?.payload?.id_usuario;
        if(error){ return res.status(400).json({message:error})};
        this.asistenciaRepository.update('',updateAsistenciaDto!, by!)
        .then(async data =>{
            // console.log('RESULT::',data)
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

    // findById = (req:Request, res:Response) =>{
    //    const { id } = req.params;

    //    this.asistenciaRepository.findById(id)
    //    .then( async data =>{
    //        res.json(data)
    //    }).catch(error => {
    //        this.handleError(error,res)
    //    })
    // };

    //findByNameCorto = (req:Request, res:Response) =>{
    //    const nombreCorto = req.query.nom_corto as string;
//
    //    this.AsistenciaRepository.findByNameCorto(nombreCorto)
    //    .then( async data =>{
    //        res.json(data)
    //    }).catch(error => {
    //        this.handleError(error,res)
    //    })
    //};


    // findAll = (req:Request, res: Response)=>{
    //     const page = Number.isNaN(Number(req.query.page)) || !req.query.page ? 1 : Number(req.query.page);
    //     const limit = Number.isNaN(Number(req.query.limit)) || !req.query.limit ? 10 : Number(req.query.limit);

    //     this.asistenciaRepository.findAll(Number(page), Number(limit))
    //     .then(async data =>{
    //         res.json(data)
    //     }).catch(error => {
    //         this.handleError(error,res)
    //     });
    // }

    // findAllActive = (req:Request, res: Response)=>{
    //     const page = Number.isNaN(Number(req.query.page)) || !req.query.page ? 1 : Number(req.query.page);
    //     const limit = Number.isNaN(Number(req.query.limit)) || !req.query.limit ? 10 : Number(req.query.limit);

    //     this.asistenciaRepository.findAll(Number(page), Number(limit))
    //     .then(async data =>{
    //         res.json(data)
    //     }).catch(error => {
    //         this.handleError(error,res)
    //     });
    // }

    // findOne = (req:AuthRequest, res: Response)=>{
    //     const id_asistencia = req.payload?.asistencia.id_asistencia;
    //     this.asistenciaRepository.findOne(id_asistencia!)
    //     .then(async data =>{
    //         console.log(data)
    //         res.json(data)
    //     }).catch(error => {
    //         console.log(error)
    //         this.handleError(error,res)
    //     });
    // }

    // updateAll = (req:AuthRequest, res: Response):any=>{
    //     const [error, updateAsistenciaDto ] = UpdateAsistenciaDto.update(req.body);
    //     if(error){ return res.status(400).json({message:error})};
    //     const by = req?.payload?.id_usuario;
    //     this.asistenciaRepository.updateAll(updateAsistenciaDto!,by!)
    //     .then(async data =>{
    //         res.json(data)
    //     }).catch(error => {
    //         this.handleError(error,res)
    //     });
    // }


}