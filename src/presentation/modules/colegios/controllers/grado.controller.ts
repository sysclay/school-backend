import { Request, Response } from "express";
import { CustomError, RegisterGradoDto, GradoRepository, UpdateGradoDto } from "../../../../domain/index.js";

interface AuthRequest extends Request {
    payload?: { id_usuario: string, };
}

export class GradoController {
    constructor (
        private readonly gradoRepository:GradoRepository,
    ){}

    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({message:error.message});    
        }
        return res.status(500).json({error:'Internal Server Error'});
    }

    register= (req:AuthRequest, res:Response):any=>{
        const [error, registerGradoDto ] = RegisterGradoDto.create(req.body);
        const by = req?.payload?.id_usuario;

        if(error){ return res.status(400).json({message:error})};
        this.gradoRepository.register(registerGradoDto!,by!)
        .then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
        });
    };

    findById = (req:Request, res:Response) =>{
       const { id } = req.params;

       this.gradoRepository.findById(id)
       .then( async data =>{
           res.json(data)
       }).catch(error => {
           this.handleError(error,res)
       })
    };

    find = (req:Request, res: Response)=>{
        this.gradoRepository.findAll()
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

    updateAll = (req:AuthRequest, res:Response):any =>{
        const { id } = req.params;
        const [error,updateGradoDto ] = UpdateGradoDto.update(req.body);
        if(error){ return res.status(400).json({message:error})};
        const by = req?.payload?.id_usuario;
        
        this.gradoRepository.updateAll(id,updateGradoDto!,by!).then( async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        })
    };
}