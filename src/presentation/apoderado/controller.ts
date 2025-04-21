import { Request, Response } from "express";
import { CustomError, RegisterApoderadoDto, ApoderadoRepository, FilterApoderadoAlumnoDto } from "../../domain/index.js";

export class ApoderadoController {
    constructor (
        private readonly apoderadoRepository:ApoderadoRepository,
    ){}

    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({message:error.message});    
        }
        return res.status(500).json({error:'Internal Server Error'});
    }

    registerApoderado= (req:Request, res:Response):any=>{
        const [error, registerApoderadoDto ] = RegisterApoderadoDto.create(req.body);
        
        if(error){ return res.status(400).json({message:error})};
        this.apoderadoRepository.register(registerApoderadoDto!)
        .then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
           }
        );
    };

    findById = (req:Request, res:Response) =>{
        const { id } = req.params;

        this.apoderadoRepository.findById(id)
        .then( async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        })
    };

    findApoderado = (req:Request, res: Response)=>{
        this.apoderadoRepository.findAll()
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

    filterApoderadoAlumno= (req:Request, res:Response):any=>{
        const nro_documento = req.query.nro_documento as string;
        const year = req.query.year as string;
        const data = { nro_documento,year }
        const [error, filterApoderadoAlumnoDto ] = FilterApoderadoAlumnoDto.filter(data);
        
        if(error){ return res.status(400).json({message:error})};
        this.apoderadoRepository.filterApoderadoAlumno(filterApoderadoAlumnoDto!)
        .then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
           }
        );
    };
}