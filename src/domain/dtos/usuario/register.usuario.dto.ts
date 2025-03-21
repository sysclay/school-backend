export class RegisterUsuarioDto {
    private constructor (
        public nro_documento: string,
        public contrasena: string,
        public telefono: string,
        public correo: string,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterUsuarioDto?]{
        const { nro_documento, contrasena, telefono, correo} = object;
        if(!nro_documento) return ["Missing numero documento"];
        if(!contrasena) return ["Missing contraseña"];
        if(!telefono) return ["Missing telefono"];
        if(!correo) return ["Missing correo"];
        return [
            undefined,
            new RegisterUsuarioDto( nro_documento, contrasena, telefono, correo),
        ]
    }
}