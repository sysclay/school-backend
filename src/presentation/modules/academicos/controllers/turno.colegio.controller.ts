import { Request, Response } from "express";
import { CustomError,TurnoColegioRepository, RegisterTurnoColegioDto } from "../../../../domain/index.js";

interface AuthRequest extends Request {
  payload?: { 
    id_usuario: string,
    rol:{
        id_rol:string,
    },
    colegio:{
        id_colegio:string
    }
 };
}

export class TurnoColegioController {
    constructor (
        private readonly TurnoColegioRepository:TurnoColegioRepository,
    ){}

    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({message:error.message});    
        }
        return res.status(500).json({error:'Internal Server Error'});
    }

    register= (req:AuthRequest, res:Response):any=>{
        const [error, registerTurnoColegioDto ] = RegisterTurnoColegioDto.create(req.body);
        const by = req?.payload?.id_usuario;
        if(error){ return res.status(400).json({message:error})};
        this.TurnoColegioRepository.register(registerTurnoColegioDto!,by!)
        .then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
        });
    };

    findAll = (req:Request, res: Response)=>{

        this.TurnoColegioRepository.findAll()
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

    findAllActive = (req:AuthRequest, res: Response)=>{
        this.TurnoColegioRepository.findAllActive()
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

    findColegio = (req:AuthRequest, res: Response):any=>{
        // Intentar obtener id_colegio del query params
        const id_colegio_query = req.query.id_colegio as string | undefined;
          // Si viene en query, usarlo
        const id_colegio = id_colegio_query || req.payload?.colegio?.id_colegio;
        if (!id_colegio) return res.status(400).json({ ok: false, message: 'ID del colegio es requerido.'});
        const soloActivos = !!id_colegio_query;
        this.TurnoColegioRepository.findColegio(id_colegio!,soloActivos)
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            console.log(error)
            this.handleError(error,res)
        });

    }

    findById = (req:AuthRequest, res: Response)=>{
        // const id_rol = req?.payload?.rol.id_rol;
        const { id } = req.params;
        this.TurnoColegioRepository.findById(id!)
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

    update = (req:AuthRequest, res: Response) => {
        const { id } = req.params;
        const { estado } = req.body;
        // const [error,updatePersonaDto ] = UpdatePersonaDto.update(req.body);
        // if(error){ return res.status(400).json({message:error})};
        const by = req?.payload?.id_usuario;
        
        this.TurnoColegioRepository.update(id,estado,by!).then( async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        })
    }

}