export class FilterColegioSeccionDto {
    private constructor (
        public id_colegio: string,
        public id_nivel: string,
        public id_grado: string,
    ){}

    static filter(object:{[key:string]:any}):[string?,FilterColegioSeccionDto?]{
        const { id_colegio, id_nivel,id_grado } = object;
        if(!id_colegio && !id_nivel && !id_grado) return ["Missing or invalid"];
        return [
            undefined,
            new FilterColegioSeccionDto(id_colegio, id_nivel,id_grado ),
        ]
    }
}