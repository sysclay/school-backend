export class FilterAcademicoColegioDto {
    private constructor (
        public id_colegio?: string,
        public id_academico?: string,
    ){}

    static filter(object:{[key:string]:any}):[string?,FilterAcademicoColegioDto?]{
        const { id_colegio, id_academico } = object;
        if(!id_colegio && !id_academico) return ["Missing sin campo enviado"];
        // if(!descripcion) return ["Missing descripcion"];

        return [
            undefined,
            new FilterAcademicoColegioDto(id_colegio, id_academico),
        ]
    }
}