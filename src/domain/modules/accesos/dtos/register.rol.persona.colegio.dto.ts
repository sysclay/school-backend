export class RegisterRolPersonaColegioDto {
    private constructor (
        public id_rol: string,
        public id_persona: string,
        public id_colegio: string,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterRolPersonaColegioDto?]{
        const { id_rol, id_persona,id_colegio} = object;
        if(!id_rol) return ["Missing rol"];
        if(!id_persona) return ["Missing usuario"];
        if(!id_colegio) return ["Missing usuario"];
        return [
            undefined,
            new RegisterRolPersonaColegioDto( id_rol, id_persona,id_colegio),
        ]
    }
}