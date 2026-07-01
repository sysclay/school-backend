export class RegisterColegioSeccionDto {
    private constructor (
        public id_colegio: string,
        public id_nivel: string,
        public id_grado: string,
        public id_seccion: string,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterColegioSeccionDto?]{
        const { id_colegio, id_nivel,id_grado,id_seccion } = object;
        if(!id_colegio) return ["Missing or invalid colegio"];
        if(!id_nivel) return ["Missing nivel"];
        if(!id_grado) return ["Missing grado"];
        if(!id_seccion) return ["Missing seccion"];
        // if (typeof id_nivel !== "number" || !Number.isInteger(id_nivel)) return ["Missing or invalid nivel"];
        return [
            undefined,
            new RegisterColegioSeccionDto(id_colegio, id_nivel,id_grado,id_seccion ),
        ]
    }
}