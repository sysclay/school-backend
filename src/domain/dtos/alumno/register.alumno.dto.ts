export class RegisterAlumnoDto {
    private constructor (
        public persona_id: string,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterAlumnoDto?]{
        const {  persona_id } = object;
        if(!persona_id) return ["Missing persona"];
        return [
            undefined,
            new RegisterAlumnoDto(persona_id),
        ]
    }
}