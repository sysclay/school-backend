export class UpdatePersonaRolColegioDto {
    private constructor (
        public id_persona: string,
        public id_rol: string,
        public id_colegio: string,
        public estado: boolean,
    ){}

    static update(object:{[key:string]:any}):[string?,UpdatePersonaRolColegioDto?]{
        const { id_persona, id_rol, id_colegio,estado } = object;
        if(!id_persona) return ["Missing persona"];
        if(!id_rol) return ["Missing rol"];
        if(!id_colegio) return ["Missing colegio"];
        if(typeof estado !== "boolean") return ["Missing or invalid estado"];
        return [
            undefined,
            new UpdatePersonaRolColegioDto(id_persona, id_rol, id_colegio,estado),
        ]
    }
}