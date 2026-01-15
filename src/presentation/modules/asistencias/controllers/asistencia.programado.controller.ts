import { Request, Response } from "express";
import { AsistenciaProgramadoRepository, CustomError, FilterAsistenciaProgramadoDto, RegisterAsistenciaProgramadoDto  } from "../../../../domain/index.js";
// import { UpdateAsistenciaProgramadoDto } from "../../../../domain/modules/asistenciaprogramados/dtos/update.asistenciaprogramado.dto.js";

interface AuthRequest extends Request {
    payload?: { id_usuario: string, asistenciaprogramado:{ id_asistenciaprogramado:string } };
}


export class AsistenciaProgramadoController {
    constructor (
        private readonly asistenciaprogramadoRepository:AsistenciaProgramadoRepository,
    ){}

    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({message:error.message});    
        }
        return res.status(500).json({error:'Internal Server Error'});
    }

    registerAsistenciaProgramado= (req:AuthRequest, res:Response):any=>{
        const [error, registerAsistenciaProgramadoDto ] = RegisterAsistenciaProgramadoDto.create(req.body);
        const by = req?.payload?.id_usuario;

        if(error){ return res.status(400).json({message:error})};
        this.asistenciaprogramadoRepository.register(registerAsistenciaProgramadoDto!,by!)
        .then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
        });
    };

    // findById = (req:Request, res:Response) =>{
    //    const { id } = req.params;

    //    this.asistenciaprogramadoRepository.findById(id)
    //    .then( async data =>{
    //        res.json(data)
    //    }).catch(error => {
    //        this.handleError(error,res)
    //    })
    // };

    //findByNameCorto = (req:Request, res:Response) =>{
    //    const nombreCorto = req.query.nom_corto as string;
//
    //    this.AsistenciaProgramadoRepository.findByNameCorto(nombreCorto)
    //    .then( async data =>{
    //        res.json(data)
    //    }).catch(error => {
    //        this.handleError(error,res)
    //    })
    //};


    findAll = (req:Request, res: Response)=>{
        const page = Number.isNaN(Number(req.query.page)) || !req.query.page ? 1 : Number(req.query.page);
        const limit = Number.isNaN(Number(req.query.limit)) || !req.query.limit ? 10 : Number(req.query.limit);
        this.asistenciaprogramadoRepository.findAll(Number(page), Number(limit))
        .then(async data =>{
            // console.log(data)
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

    
    findAllFilter = (req:Request, res: Response):any=>{
        const page = Number.isNaN(Number(req.query.page)) || !req.query.page ? 1 : Number(req.query.page);
        const limit = Number.isNaN(Number(req.query.limit)) || !req.query.limit ? 365 : Number(req.query.limit);

        const id_grupo_academico = typeof req.query.id_grupo_academico === 'string'
        ? req.query.id_grupo_academico.trim()
        : undefined;

        const [error, filterAsistenciaProgramadoDto ] = FilterAsistenciaProgramadoDto.filter({id_grupo_academico});

        // console.log(id_grupo_academico)
        if (error) return res.status(400).json({ ok: false, message: error });

        this.asistenciaprogramadoRepository.findAllFilter(filterAsistenciaProgramadoDto!,Number(page), Number(limit))
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }


    findAllActive = (req:Request, res: Response)=>{
        const page = Number.isNaN(Number(req.query.page)) || !req.query.page ? 1 : Number(req.query.page);
        const limit = Number.isNaN(Number(req.query.limit)) || !req.query.limit ? 365 : Number(req.query.limit);

        this.asistenciaprogramadoRepository.findAll(Number(page), Number(limit))
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

    // findOne = (req:AuthRequest, res: Response)=>{
    //     const id_asistenciaprogramado = req.payload?.asistenciaprogramado.id_asistenciaprogramado;
    //     this.asistenciaprogramadoRepository.findOne(id_asistenciaprogramado!)
    //     .then(async data =>{
    //         console.log(data)
    //         res.json(data)
    //     }).catch(error => {
    //         console.log(error)
    //         this.handleError(error,res)
    //     });
    // }

    // updateAll = (req:AuthRequest, res: Response):any=>{
    //     const [error, updateAsistenciaProgramadoDto ] = UpdateAsistenciaProgramadoDto.update(req.body);
    //     if(error){ return res.status(400).json({message:error})};
    //     const by = req?.payload?.id_usuario;
    //     this.asistenciaprogramadoRepository.updateAll(updateAsistenciaProgramadoDto!,by!)
    //     .then(async data =>{
    //         res.json(data)
    //     }).catch(error => {
    //         this.handleError(error,res)
    //     });
    // }


}