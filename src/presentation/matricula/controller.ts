import { Request, Response } from "express";
import { CustomError, RegisterMatriculaDto, MatriculaRepository } from "../../domain/index.js";

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

    registerMatricula= (req:Request, res:Response):any=>{
        const [error, registerMatriculaDto ] = RegisterMatriculaDto.create(req.body);
        
        if(error){ return res.status(400).json({message:error})};
        this.matriculaRepository.register(registerMatriculaDto!)
        .then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
           }
        );
    };

    findById = (req:Request, res:Response) =>{
        const { id } = req.params;

        this.matriculaRepository.findById(id)
        .then( async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        })
    };

    findMatricula = (req:Request, res: Response)=>{
        this.matriculaRepository.findAll()
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

    filterMatriculaGradoSeccion=(req:Request, res: Response)=>{
        const matricula_id = req.query.matricula_id as string;

        this.matriculaRepository.filterMatriculaGradoSeccion(matricula_id)
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }
}