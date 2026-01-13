import { Request, Response } from "express";
import { CustomError, MatriculaIngresoRepository } from "../../../../domain/index.js";

interface AuthRequest extends Request {
  payload?: { id_usuario: string, };
}

export class MatriculaIngresoController {
    constructor (
        private readonly MatriculaIngresoRepository:MatriculaIngresoRepository,
    ){}

    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({message:error.message});    
        }
        return res.status(500).json({error:'Internal Server Error'});
    }

    // register= (req:AuthRequest, res:Response):any=>{
    //     const [error, registerMatriculaIngresoDto ] = RegisterMatriculaIngresoDto.create(req.body);
    //     if(error){ return res.status(400).json({message:error})};
    //     const by = req?.payload?.id_usuario;

    //     this.MatriculaIngresoRepository.register(registerMatriculaIngresoDto!,by!)
    //     .then(async data=>{
    //         return res.json(data)
    //     }).catch( error => {
    //         return this.handleError(error,res)
    //        }
    //     );
    // };
    
    find = (req:Request, res: Response)=>{
        this.MatriculaIngresoRepository.findAll()
        .then(async data =>{
            res.json(data);
        }).catch(error => {
            this.handleError(error,res)
        });
    };

    findActive = (req:Request, res: Response)=>{
        this.MatriculaIngresoRepository.findAllActive()
        .then(async data =>{
            res.json(data);
        }).catch(error => {
            this.handleError(error,res)
        });
    };

    findById = (req:Request, res: Response)=>{
        const id = req.params.id;
        this.MatriculaIngresoRepository.findById(id!)
        .then(async data =>{
            res.json(data);
        }).catch(error => {
            this.handleError(error,res)
        });
    };

    // filterMatriculaIngreso = (req:Request, res: Response):any=>{
    //     const nro_documento = req.query.nro_documento as string;
    //     const [error, filterMatriculaIngresoDto ] = FilterMatriculaIngresoDto.filter({nro_documento});
        
    //     if(error){ return res.status(400).json({message:error})};
    //     this.MatriculaIngresoRepository.filterAll(filterMatriculaIngresoDto!).then(async data =>{
    //         res.json(data)
    //     }).catch(error => {
    //         this.handleError(error,res)
    //     });
    // };

    // updateQR = (req:Request, res:Response) =>{
    //     const { id } = req.params;

    //     this.MatriculaIngresoRepository.updateQR(id).then( async data =>{
    //         res.json(data)
    //     }).catch(error => {
    //         this.handleError(error,res)
    //     })
    // };


    
}