export class RegisterPermisoDto {
    private constructor (
        public codigo: string,
        public nombre: string,
        public descripcion:string,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterPermisoDto?]{
        const { codigo,nombre,descripcion} = object;
        if(!codigo) return ["Missing codigo"];
        if(!nombre) return ["Missing nombre"];
        if(!descripcion) return ["Missing descripcion"];
        if(codigo.length > 50) return ["El código no puede tener más de 50 caracteres"];
        if(nombre.length > 50) return ["El nombre no puede tener más de 50 caracteres"];
        if(descripcion.length > 250) return ["La descripción no puede tener más de 250 caracteres"];
        return [
            undefined,
            new RegisterPermisoDto(codigo.toLowerCase(),nombre,descripcion),
        ]
    }
}