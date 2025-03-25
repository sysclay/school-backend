export class FilterAlumnoDto {
    private constructor (
        public nro_documento: string,
    ){}

    static filter(object:{[key:string]:any}):[string?,FilterAlumnoDto?]{
        const {  nro_documento } = object;
        if(!nro_documento) return ["Missing numero documento"];
        return [
            undefined,
            new FilterAlumnoDto(nro_documento), 
        ]
    }
}