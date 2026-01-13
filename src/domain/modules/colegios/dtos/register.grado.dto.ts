export class RegisterGradoDto {
    private constructor (
        public codigo: string,
        public nombre: string,
        public abreviado: string,
        public descripcion: string,
        public id_nivel: string,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterGradoDto?]{
        const { codigo,nombre,abreviado, descripcion, id_nivel} = object;
        if(!codigo) return ["Missing codigo"];
        if(!nombre) return ["Missing nombre"];
        if(!abreviado) return ["Missing abreviado"];
        if(!descripcion) return ["Missing descripcion"];
        if(!id_nivel) return ["Missing nivel"];
        if(codigo.length > 50) return ["El codigo no puede tener más de 50 caracteres"];
        if(nombre.length > 50) return ["El nivel no puede tener más de 50 caracteres"];
        if(abreviado.length > 20) return ["El abreviado no puede tener más de 20 caracteres"];
        return [
            undefined,
            new RegisterGradoDto( codigo.toUpperCase(),nombre,abreviado, descripcion, id_nivel),
        ]
    }
}