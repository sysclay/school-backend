export class FilterAlumnoDto {
    private constructor (
        public codigo: string,
    ){}

    static filter(object:{[key:string]:any}):[string?,FilterAlumnoDto?]{
        const { codigo } = object;
        if(!codigo) return ["Missing codigo"];
        return [
            undefined,
            new FilterAlumnoDto(codigo), 
        ]
    }
}