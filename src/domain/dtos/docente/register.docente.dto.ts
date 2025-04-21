export class RegisterDocenteDto {
    private constructor (
        public persona_id: string,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterDocenteDto?]{
        const {persona_id} = object;
        if(!persona_id) return ["Missing persona"];
        return [
            undefined,
            new RegisterDocenteDto(persona_id),
        ]
    }
}