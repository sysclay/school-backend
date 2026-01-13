import { CustomError, LoginEntity, LoginEntityOu } from "../../../../domain/index.js";

export class LoginMapper {

    static LoginEntityFromObject(object:{[key:string]:any}){
        const {ok,token,message} = object;
        // if(data!==undefined){
        //     const _data = new UsuarioEntity (
        //         // data._id||data.id ,
        //         data.codigo,
        //         // data.username,
        //         // data.nro_documento,
        //         // data.nombre,
        //         // data.paterno,
        //         // data.materno,
        //         // data.correo,
        //         // data.telefono,
        //         // data.token, 
        //     );   
        //     return new LoginEntityOu(
        //         ok,
        //         _data, 
        //         message,
        //     );            
        // } else{
            return new LoginEntityOu(
                ok,
                message,
                token, 
            ); 
        // }
    }

    // static findByIdEntityFromObject(object:{ [key:string]:any}){

    //     const {ok,data,message} = object;
    //     var _data:any
        
    //     if(data){
    //         const _data = new UsuarioEntity (
    //             // data._id||data.id ,
    //             data.codigo,
    //             data.username,

    //             // data.nro_documento,
    //             // data.nombre,
    //             // data.paterno,
    //             // data.materno,
    //             // data.correo,
    //             // data.telefono,
    //             data.token, 
    //         );
    //         return new UsuarioEntityOu(
    //             ok,
    //             _data,
    //             message,
    //         );
    //     }

    //     return new UsuarioEntityOu(
    //         ok,
    //         _data,
    //         message,
    //     );
    // }


    // static findEntityFromObject(object:{[key:string]:any}){
    //     const {ok,data,message} = object;
    //     if(data!==undefined) {
    //         const _data = data.map((object:any)=>{
    //             const {_id,id, codigo, username,nro_documento, nombre, paterno,materno,correo,telefono,token} = object;
    //             return new UsuarioEntity(
    //                 // _id||id,
    //                 codigo,
    //                 username,
    //                 // nro_documento,
    //                 // nombre,
    //                 // paterno,
    //                 // materno,
    //                 // correo,
    //                 // telefono,
    //                 token, 
    //             )
    //         })

    //         return new UsuarioEntityOu(
    //             ok,
    //             _data, 
    //             message,
    //         )
    //     }else{
    //         return new UsuarioEntityOu(
    //             ok,
    //             data, 
    //             message,
    //         )
    //     }
    // }
}