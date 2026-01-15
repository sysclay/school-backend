import { Request, Response } from "express";
import { CustomError, RegisterPersonaDto, PersonaRepository, FilterPersonaDto, UpdatePersonaDto } from "../../../../domain/index.js";

interface AuthRequest extends Request {
  payload?: { id_usuario: string, };
}

export class PersonaController {
    constructor (
        private readonly personaRepository:PersonaRepository,
    ){}

    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({message:error.message});    
        }
        return res.status(500).json({error:'Internal Server Error'});
    }

    registerPersona= (req:AuthRequest, res:Response):any=>{
        const [error, registerPersonaDto ] = RegisterPersonaDto.create(req.body);
        if(error){ return res.status(400).json({message:error})};
        const by = req?.payload?.id_usuario;

        this.personaRepository.register(registerPersonaDto!,by!)
        .then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
        });
    };

    findById = (req:AuthRequest, res:Response) =>{
        const { id } = req.params;
        // const by = req?.payload?.id_usuario;
        this.personaRepository.findById(id!).then( async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        })
    };

    findPersonaById = (req:AuthRequest, res:Response) =>{
        // const { id } = req.params;
        // console.log('perfil')
        const by = req?.payload?.id_usuario;
        this.personaRepository.findByIdPerfil(by!).then( async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        })
    };

    findPersonaByNDoc = (req:AuthRequest, res:Response) =>{
        const { id } = req.params;
        // const { doc } = req.query as { doc:string };
        // console.log(doc)
        this.personaRepository.findByNDoc(id).then( async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        })
    };

    findPersona = (req:Request, res: Response)=>{
        const page = Number.isNaN(Number(req.query.page)) || !req.query.page ? 1 : Number(req.query.page);
        const limit = Number.isNaN(Number(req.query.limit)) || !req.query.limit ? 10 : Number(req.query.limit);
        this.personaRepository.findAll(Number(page), Number(limit))
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    };


    filterPersona = (req:Request, res: Response):any=>{
        const nro_documento = req.query.nro_docu as string;
        const [error, filterPersonaDto ] = FilterPersonaDto.filter({nro_documento});
        
        if(error){ return res.status(400).json({message:error})};
        this.personaRepository.filterAll(filterPersonaDto!).then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    };

    updateById = (req:AuthRequest, res:Response):any =>{
        const { id } = req.params;
        const [error,updatePersonaDto ] = UpdatePersonaDto.update(req.body);
        if(error){ return res.status(400).json({message:error})};
        const by = req?.payload?.id_usuario;
        
        this.personaRepository.updateById(id,updatePersonaDto!,by!).then( async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        })
    };
}