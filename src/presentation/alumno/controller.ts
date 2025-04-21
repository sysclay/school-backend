import { Request, Response } from "express";
import { CustomError, RegisterAlumnoDto, AlumnoRepository, FilterAlumnoDto } from "../../domain/index.js";

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

    registerAlumno= (req:Request, res:Response):any=>{
        const [error, registerAlumnoDto ] = RegisterAlumnoDto.create(req.body);
        
        if(error){ return res.status(400).json({message:error})};
        this.AlumnoRepository.register(registerAlumnoDto!)
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

    findAlumno = (req:Request, res: Response)=>{
        this.AlumnoRepository.findAll().then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    };

    filterAlumno = (req:Request, res: Response):any=>{
        const codigo = req.query.codigo as string;
        const [error, filterAlumnoDto ] = FilterAlumnoDto.filter({codigo});
        
        if(error){ return res.status(400).json({message:error})};
        this.AlumnoRepository.filterAll(filterAlumnoDto!).then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    };

    updateQR = (req:Request, res:Response) =>{
        const { id } = req.params;

        this.AlumnoRepository.updateQR(id).then( async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        })
    };
}