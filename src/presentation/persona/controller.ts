import { Request, Response } from "express";
import { CustomError, RegisterPersonaDto, PersonaRepository, FilterPersonaDto } from "../../domain/index.js";

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

    registerPersona= (req:Request, res:Response):any=>{
        const [error, registerPersonaDto ] = RegisterPersonaDto.create(req.body);
        
        if(error){ return res.status(400).json({message:error})};
        this.personaRepository.register(registerPersonaDto!)
        .then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
           }
        );
    };

    // findById = (req:Request, res:Response) =>{
    //     const { id } = req.params;

    //     this.personaRepository.findById(id).then( async data =>{
    //         res.json(data)
    //     }).catch(error => {
    //         this.handleError(error,res)
    //     })
    // };

    // findPersona = (req:Request, res: Response)=>{
    //     this.personaRepository.findAll().then(async data =>{
    //         res.json(data)
    //     }).catch(error => {
    //         this.handleError(error,res)
    //     });
    // };
    // filterPersona = (req:Request, res: Response):any=>{
    //     const nro_documento = req.query.nro_documento as string;
    //     const [error, filterPersonaDto ] = FilterPersonaDto.filter({nro_documento});
        
    //     if(error){ return res.status(400).json({message:error})};
    //     this.personaRepository.filterAll(filterPersonaDto!).then(async data =>{
    //         res.json(data)
    //     }).catch(error => {
    //         this.handleError(error,res)
    //     });
    // };

    // updateQR = (req:Request, res:Response) =>{
    //     const { id } = req.params;

    //     this.personaRepository.updateQR(id).then( async data =>{
    //         res.json(data)
    //     }).catch(error => {
    //         this.handleError(error,res)
    //     })
    // };
}