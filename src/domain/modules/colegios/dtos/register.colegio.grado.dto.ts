export class RegisterColegioGradoDto {
    private constructor (
        public id_colegio: string,
        public id_nivel: string,
        public id_grado: string,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterColegioGradoDto?]{
        const { id_colegio, id_nivel,id_grado } = object;
        if(!id_colegio) return ["Missing or invalid colegio"];
        if(!id_nivel) return ["Missing nivel"];
        if(!id_grado) return ["Missing grado"];
        // if (typeof id_nivel !== "number" || !Number.isInteger(id_nivel)) return ["Missing or invalid nivel"];
        return [
            undefined,
            new RegisterColegioGradoDto(id_colegio, id_nivel,id_grado ),
        ]
    }
}