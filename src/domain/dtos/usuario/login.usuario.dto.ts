export class LoginUsuarioDto {
    private constructor (
        public username: string,
        public contrasena: string,
    ){}

    static login(object:{[key:string]:any}):[string?,LoginUsuarioDto?]{
        const { username, contrasena} = object;
        if(!username) return ["Missing username"];
        if(!contrasena) return ["Missing contraseña"];
        return [
            undefined,
            new LoginUsuarioDto( username, contrasena),
        ]
    }
}