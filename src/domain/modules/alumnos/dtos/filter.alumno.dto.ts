export class FilterAlumnoDto {
    private constructor (
        public id_colegio: string,
        public nro_docu: string,
        public alumno: string,
    ){}

    static filter(object:{[key:string]:any}):[string?,FilterAlumnoDto?]{
        const { id_colegio, nro_docu, alumno } = object;
        if(!id_colegio) return ["Missing id_colegio"];

        return [
            undefined,
            new FilterAlumnoDto(id_colegio, nro_docu, alumno), 
        ]
    }
}