export class RegisterApoderadoDto {
    private constructor (
        public persona_id: string,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterApoderadoDto?]{
        const {persona_id} = object;
        if(!persona_id) return ["Missing persona"];
        return [
            undefined,
            new RegisterApoderadoDto(persona_id),
        ]
    }
}