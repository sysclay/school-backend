export class LoginUsuarioDto {
    private constructor (
        public nro_documento: string,
        public contrasena: string,
    ){}

    static login(object:{[key:string]:any}):[string?,LoginUsuarioDto?]{
        const { nro_documento, contrasena} = object;
        if(!nro_documento) return ["Missing numero documento"];
        if(!contrasena) return ["Missing contraseña"];
        return [
            undefined,
            new LoginUsuarioDto( nro_documento, contrasena),
        ]
    }
}