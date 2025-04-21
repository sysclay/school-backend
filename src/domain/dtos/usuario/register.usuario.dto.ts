export class RegisterUsuarioDto {
    private constructor (
        public username: string,
        public contrasena: string,
        public persona_id:string
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterUsuarioDto?]{
        const { username, contrasena, persona_id} = object;
        if(!username) return ["Missing username"];
        if(!contrasena) return ["Missing contraseña"];
        if(!persona_id) return ["Missing persona"];
        return [
            undefined,
            new RegisterUsuarioDto( username, contrasena, persona_id),
        ]
    }
}