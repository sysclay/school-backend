export class UpdateColegioNivelDto {
    private constructor (
        public id_colegio: string,
        public id_nivel: string,
        public estado: boolean,
    ){}

    static update(object:{[key:string]:any}):[string?,UpdateColegioNivelDto?]{
        const { id_colegio, id_nivel,estado } = object;
        if(!id_colegio) return ["Missing or invalid colegio"];
        if(!id_nivel) return ["Missing nivel"];
        if(typeof estado !== "boolean") return ["Missing or invalid estado"];
        // if (typeof id_nivel !== "number" || !Number.isInteger(id_nivel)) return ["Missing or invalid nivel"];
        return [
            undefined,
            new UpdateColegioNivelDto(id_colegio, id_nivel, estado ),
        ]
    }
}