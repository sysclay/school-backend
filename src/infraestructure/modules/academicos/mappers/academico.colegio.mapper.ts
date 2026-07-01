import { CustomError, AcademicoColegioEntity, AcademicoColegioEntityOu } from "../../../../domain/index.js";

export class AcademicoColegioMapper {



    static EntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined){
            // if(!data.rol_id){ throw CustomError.badRequest('Missing Rol'); }
            const _data = new AcademicoColegioEntity (
                    data.id_colegio,
                    data.id_academico_colegio,
                    data.id_academico,
                    data.colegio,
                    new Date(data.fec_ini).toLocaleDateString('es-ES'),
                    new Date(data.fec_fin).toLocaleDateString('es-ES'),
                    data.nombre,
                    data.descripcion,
                    data.total_secciones,
                    data.estado,
                    data.created_at,
            );   
            return new AcademicoColegioEntityOu(
                ok,
                _data, 
                message,
            );            
        }else{
            return new AcademicoColegioEntityOu(
                ok,
                data, 
                message,
            ); 
        }
    }

    static findByIdEntityFromObject(object:{ [key:string]:any}){

        const {ok,data,message} = object;
        var _data:any
        
        if(data){
            const _data = new AcademicoColegioEntity (
                    data.id_colegio,
                    data.id_academico_colegio,
                    data.id_academico,
                    data.colegio,
                    new Date(data.fec_ini).toLocaleDateString('es-ES'),
                    new Date(data.fec_fin).toLocaleDateString('es-ES'),
                    data.nombre,
                    data.descripcion,
                    data.total_secciones,
                    data.estado,
                    data.created_at,
            );
            return new AcademicoColegioEntityOu(
                ok,
                _data,
                message,
            );
        }

        return new AcademicoColegioEntityOu(
            ok,
            _data,
            message,
        );
    }


    static findEntityFromObject(object:{[key:string]:any}){
        const {ok,data,message} = object;
        if(data!==undefined) {
            const _data = data.map((object:any)=>{
                const {id_colegio,id_academico_colegio,id_academico,colegio,fec_ini,fec_fin,nombre,descripcion,total_secciones,estado,created_at} = object;
                return new AcademicoColegioEntity(
                    id_colegio,
                    id_academico_colegio,
                    id_academico,
                    colegio,
                    new Date(fec_ini).toLocaleDateString('es-ES'),
                    new Date(fec_fin).toLocaleDateString('es-ES'),
                    nombre,
                    descripcion,
                    total_secciones,
                    estado,
                    created_at,
                )
            })

            return new AcademicoColegioEntityOu(
                ok,
                _data, 
                message,
            )
        }else{
            return new AcademicoColegioEntityOu(
                ok,
                data, 
                message,
            )
        }
    }
}