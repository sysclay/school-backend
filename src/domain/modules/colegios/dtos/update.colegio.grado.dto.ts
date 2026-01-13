export class UpdateColegioGradoDto {
    private constructor (
        public id_colegio: string,
        public id_nivel: string,
        public id_grado: string,
        public estado: boolean,
    ){}

    static update(object:{[key:string]:any}):[string?,UpdateColegioGradoDto?]{
        const { id_colegio, id_nivel, id_grado ,estado } = object;
        if(!id_colegio) return ["Missing or invalid colegio"];
        if(!id_nivel) return ["Missing nivel"];
        if(!id_grado) return ["Missing grado"];
        if(typeof estado !== "boolean") return ["Missing or invalid estado"];
        // if (typeof id_nivel !== "number" || !Number.isInteger(id_nivel)) return ["Missing or invalid nivel"];
        return [
            undefined,
            new UpdateColegioGradoDto(id_colegio, id_nivel, id_grado, estado ),
        ]
    }
}