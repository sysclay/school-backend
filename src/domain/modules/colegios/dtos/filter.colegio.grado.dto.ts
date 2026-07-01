export class FilterColegioGradoDto {
    private constructor (
        public id_colegio: string,
        public id_nivel: string,
    ){}

    static filter(object:{[key:string]:any}):[string?,FilterColegioGradoDto?]{
        const { id_colegio, id_nivel } = object;
        if(!id_colegio && !id_nivel) return ["Missing or invalid"];
        return [
            undefined,
            new FilterColegioGradoDto(id_colegio, id_nivel ),
        ]
    }
}