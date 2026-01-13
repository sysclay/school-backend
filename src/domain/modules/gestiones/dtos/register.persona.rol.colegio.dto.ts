export class RegisterPersonaRolColegioDto {
    private constructor (
        public id_persona: string,
        public id_rol: string,
        public id_colegio: string,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterPersonaRolColegioDto?]{
        const { id_persona, id_rol, id_colegio } = object;
        if(!id_persona) return ["Missing persona"];
        if(!id_rol) return ["Missing rol"];
        if(!id_colegio) return ["Missing colegio"];
        return [
            undefined,
            new RegisterPersonaRolColegioDto(id_persona, id_rol, id_colegio),
        ]
    }
}