export class FilterColegioNivelDto {
    private constructor (
        public id_colegio: string,
    ){}

    static filter(object:{[key:string]:any}):[string?,FilterColegioNivelDto?]{
        const { id_colegio } = object;
        if(!id_colegio) return ["Missing or invalid"];
        return [
            undefined,
            new FilterColegioNivelDto(id_colegio),
        ]
    }
}