export class RegisterUsuarioDto {
    private constructor (
        public username: string,
        public password: string,
        public id_persona: string,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterUsuarioDto?]{
        const { username, password, id_persona,created_by} = object;
        if(!username) return ["Missing username"];
        if(!password) return ["Missing contraseña"];
        if(!id_persona) return ["Missing persona"];
        if(typeof username !== "string" ){ return ["Campo username inválido"] };
        if(typeof password !== "string" ){ return ["Campo contraseña inválido"] };
        if(typeof id_persona !== "string" ){ return ["Campo persona inválido"] };
        // if(typeof persona_id !== "number" || isNaN(persona_id)){ return ["Campos inválidos"] }
        return [
            undefined,
            new RegisterUsuarioDto( username, password, id_persona),
        ]
    }
}