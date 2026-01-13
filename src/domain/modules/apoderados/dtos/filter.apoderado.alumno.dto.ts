export class FilterApoderadoAlumnoDto {
    private constructor (
        public id_persona: string,
    ){}

    static filter(object:{[key:string]:any}):[string?,FilterApoderadoAlumnoDto?]{
        const { id_persona, } = object;
        if(!id_persona) return ["Missing campo"];

        return [
            undefined,
            new FilterApoderadoAlumnoDto( id_persona ),
        ]
    }
}