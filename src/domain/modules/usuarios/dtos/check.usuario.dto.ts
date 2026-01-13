export class CheckRolUsuarioDto {
    private constructor (
        public id_rol: string,
        public id_usuario: string,
        public id_colegio: string,
        public token: string,
    ){}

    static checkRol(object:{[key:string]:any}):[string?,CheckRolUsuarioDto?]{
        const { id_rol,id_usuario,id_colegio,token} = object;
        if(!id_usuario) return ["Missing usuario"];
        // if(!id_colegio) return ["Missing colegio"];
        if(!id_rol) return ["Missing rol"];
        if(!token) return ["Missing token"];
        if(typeof id_rol !== "string"){ return ["Campo rol inválido"] }
        // if(typeof id_colegio !== "string" ){ return ["Campo colegio inválido"] }
        if(typeof id_usuario !== "string" ){ return ["Campo usuario inválido"] };
        if(typeof token !== "string" ){ return ["Campo token inválido"] };

        return [
            undefined,
            new CheckRolUsuarioDto( id_rol,id_usuario,id_colegio, token),
        ]
    }
}