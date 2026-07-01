export class FilterApoderadoAlumnoDto {
    private constructor (
        public id_colegio: string,
        public id_persona: string,
    ){}

    static filter(object:{[key:string]:any}):[string?,FilterApoderadoAlumnoDto?]{
        const { id_colegio, id_persona, } = object;
        if(!id_colegio || !id_persona) return ["Missing campo"];

        return [
            undefined,
            new FilterApoderadoAlumnoDto( id_colegio, id_persona ),
        ]
    }
}