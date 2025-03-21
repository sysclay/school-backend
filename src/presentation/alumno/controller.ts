import { Request, Response } from "express";
import { CustomError, RegisterAlumnoDto, AlumnoRepository } from "../../domain/index.js";

export class AlumnoController {
    constructor (
        private readonly AlumnoRepository:AlumnoRepository,
    ){}

    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error:error.message});    
        }
        return res.status(500).json({error:'Internal Server Error'});
    }

    registerAlumno= (req:Request, res:Response):any=>{
        const [error, registerAlumnoDto ] = RegisterAlumnoDto.create(req.body);
        
        if(error){ return res.status(400).json({error})};
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

        this.AlumnoRepository.findById(id)
        .then( async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        })
    };

    //findByNameCorto = (req:Request, res:Response) =>{
    //    const nombreCorto = req.query.nom_corto as string;
//
    //    this.AlumnoRepository.findByNameCorto(nombreCorto)
    //    .then( async data =>{
    //        res.json(data)
    //    }).catch(error => {
    //        this.handleError(error,res)
    //    })
    //};


    findAlumno = (req:Request, res: Response)=>{
        this.AlumnoRepository.findAll()
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    };

    updateQR = (req:Request, res:Response) =>{
        const { id } = req.params;

        this.AlumnoRepository.updateQR(id)
        .then( async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        })
    };
}