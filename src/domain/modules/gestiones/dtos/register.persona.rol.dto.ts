export class RegisterPersonaRolDto {
    private constructor (
        public id_persona: string,
        public id_rol: string,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterPersonaRolDto?]{
        const { id_persona, id_rol } = object;
        if(!id_persona) return ["Missing persona"];
        if(!id_rol) return ["Missing rol"];
        return [
            undefined,
            new RegisterPersonaRolDto(id_persona, id_rol),
        ]
    }
}