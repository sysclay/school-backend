import { Request, Response } from "express";
import { CustomError, ModuloRepository, RegisterModuloDto, UpdateModuloDto } from "../../../../domain/index.js";

interface AuthRequest extends Request {
    payload?: { 
      id_usuario: string,
      RolPermisoModulo:{
          id_RolPermisoModulo:string,
      }
   };
  }

export class ModuloController {
    constructor (
        private readonly moduloRepository:ModuloRepository,
    ){}

    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({message:error.message});    
        }
        return res.status(500).json({error:'Internal Server Error'});
    }

    register= (req:AuthRequest, res:Response):any=>{
        const [error, registerModuloDto ] = RegisterModuloDto.create(req.body);
        const by = req?.payload?.id_usuario;
        if(error){ return res.status(400).json({message:error})};
        this.moduloRepository.register(registerModuloDto!,by!)
        .then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
        });
    };

    //findById = (req:Request, res:Response) =>{
    //    const { id } = req.params;
//
    //    this.TablaRepository.findById(id)
    //    .then( async data =>{
    //        res.json(data)
    //    }).catch(error => {
    //        this.handleError(error,res)
    //    })
    //};

    //findByNameCorto = (req:Request, res:Response) =>{
    //    const nombreCorto = req.query.nom_corto as string;
//
    //    this.TablaRepository.findByNameCorto(nombreCorto)
    //    .then( async data =>{
    //        res.json(data)
    //    }).catch(error => {
    //        this.handleError(error,res)
    //    })
    //};


    findAllModulo = (req:Request, res: Response)=>{
        this.moduloRepository.findAll()
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

    updateAll = (req:AuthRequest, res:Response):any =>{
        const { id } = req.params;
        const [error,updateModuloDto ] = UpdateModuloDto.update(req.body);
        if(error){ return res.status(400).json({message:error})};
        const by = req?.payload?.id_usuario;
        
        this.moduloRepository.updateAll(id,updateModuloDto!,by!).then( async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        })
    };
}