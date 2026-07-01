export class RegisterColegioNivelDto {
    private constructor (
        public id_colegio: string,
        public id_nivel: string,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterColegioNivelDto?]{
        const { id_colegio, id_nivel } = object;
        if(!id_colegio) return ["Missing or invalid colegio"];
        if(!id_nivel) return ["Missing nivel"];
        // if (typeof id_nivel !== "number" || !Number.isInteger(id_nivel)) return ["Missing or invalid nivel"];
        return [
            undefined,
            new RegisterColegioNivelDto(id_colegio, id_nivel ),
        ]
    }
}