import { Request, Response } from "express";
import { CustomError, FilterRolDto, RegisterRolDto, RolRepository } from "../../../../domain/index.js";

interface AuthRequest extends Request {
  payload?: { 
    id_usuario: string,
    rol:{
        id_rol:string,
    }
 };
}

export class RolController {
    constructor (
        private readonly rolRepository:RolRepository,
    ){}

    private handleError(error:unknown, res:Response){
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({message:error.message});    
        }
        return res.status(500).json({error:'Internal Server Error'});
    }

    register= (req:AuthRequest, res:Response):any=>{
        
        const [error, registerRolDto ] = RegisterRolDto.create(req.body);
        if(error){ return res.status(400).json({message:error})};
        const by = req?.payload?.id_usuario;
        this.rolRepository.register(registerRolDto!,by!)
        .then(async data=>{
            return res.json(data)
        }).catch( error => {
            return this.handleError(error,res)
        });
    };

    findAll = (req:Request, res: Response)=>{
        this.rolRepository.findAll()
        .then(async data =>{
            res.json(data)
        }).catch(error => {
            this.handleError(error,res)
        });
    }

    //findById = (req:Request, res:Response) =>{
    //    const { id } = req.params;
//
    //    this.RolRepository.findById(id)
    //    .then( async data =>{
    //        res.json(data)
    //    }).catch(error => {
    //        this.handleError(error,res)
    //    })
    //};

    //findByNameCorto = (req:Request, res:Response) =>{
    //    const nombreCorto = req.query.nom_corto as string;
//
    //    this.RolRepository.findByNameCorto(nombreCorto)
    //    .then( async data =>{
    //        res.json(data)
    //    }).catch(error => {
    //        this.handleError(error,res)
    //    })
    //};



    // filterRol = (req:Request, res: Response):any=>{
    //     const usuario_id = req.query.usuario_id as string;
    //     const [error, filterRolDto ] = FilterRolDto.filter({usuario_id});

    //     if(error){ return res.status(400).json({message:error})};
    //     this.rolRepository.filterAll(filterRolDto!)
    //     .then(async data =>{
    //         return res.json(data)
    //     }).catch(error => {
    //         return this.handleError(error,res)
    //     });

    // }

    // asigandoRol = (req:AuthRequest, res: Response):any=>{
    //     // const id = req.query.usuario_id as string;
    //     // const [error, filterRolDto ] = FilterRolDto.filter({usuario_id});

    //     // if(error){ return res.status(400).json({message:error})};
    //     const by = req?.payload?.rol.id_rol;
    //     this.rolRepository.asignado(by!)
    //     .then(async data =>{
    //         return res.json(data)
    //     }).catch(error => {
    //         return this.handleError(error,res)
    //     });

    // }
    // registerPersonaRolColegio = (req:AuthRequest, res: Response):any=>{
    //     // const id = req.query.usuario_id as string;
    //     const [error, filterRolDto ] = RegisterRolPersonaColegioDto.create(req.body);

    //     if(error){ return res.status(400).json({message:error})};
    //     const by = req?.payload?.rol.id_rol;
    //     this.rolRepository.registerRolPersonaColegio(filterRolDto!,by!)
    //     .then(async data =>{
    //         return res.json(data)
    //     }).catch(error => {
    //         return this.handleError(error,res)
    //     });
    // }

    // listRolesAsignados = (req:AuthRequest, res: Response):any=>{
    //     this.rolRepository.listRolesAsignados()
    //     .then(async data =>{
    //         return res.json(data)
    //     }).catch(error => {
    //         return this.handleError(error,res)
    //     });
    // }

    // asignarRolPermisoModulo = (req:AuthRequest, res: Response):any=>{
    //     const by = req?.payload?.rol.id_rol;
    //     const [error, asignarRolPermisoModuloDto ] = AsignarRolPermisoModuloDto.asignar(req.body);

    //     if(error){ return res.status(400).json({message:error})};
    //     this.rolRepository.asignarRolPermisoModulo(asignarRolPermisoModuloDto!,by!)
    //     .then(async data =>{
    //         return res.json(data)
    //     }).catch(error => {
    //         return this.handleError(error,res)
    //     });
    // }
}