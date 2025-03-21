export class RegisterAlumnoDto {
    private constructor (
        public nombre: string,
        public apellido_paterno: string,
        public apellido_materno: string,
        public nro_documento: string,
        public tipo_documento_id: string,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterAlumnoDto?]{
        const { nombre, apellido_paterno,apellido_materno, nro_documento, tipo_documento_id } = object;
        if(!nombre) return ["Missing nombre"];
        if(!apellido_paterno) return ["Missing apellido paterno"];
        if(!apellido_materno) return ["Missing apellido materno"];
        if(!nro_documento) return ["Missing numero documento"];
        if(!tipo_documento_id) return ["Missing documento id"];
        return [
            undefined,
            new RegisterAlumnoDto(nombre, apellido_paterno,apellido_materno, nro_documento, tipo_documento_id),
        ]
    }
}