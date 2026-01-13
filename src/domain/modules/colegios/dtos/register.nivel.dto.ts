export class RegisterNivelDto {
    private constructor (
        public codigo: string,
        public nombre: string,
        public descripcion: string,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterNivelDto?]{
        const { codigo, nombre, descripcion} = object;
        if(!codigo) return ["Missing codigo"];
        if(!nombre) return ["Missing nombre"];
        if(!descripcion) return ["Missing descripcion"];
        if(codigo.length > 50) return ["El codigo no puede tener más de 50 caracteres"];
        if(nombre.length > 50) return ["El nombre no puede tener más de 50 caracteres"];
        return [
            undefined,
            new RegisterNivelDto( codigo.toUpperCase(),nombre, descripcion),
        ]
    }
}