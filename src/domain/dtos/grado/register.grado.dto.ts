export class RegisterGradoDto {
    private constructor (
        public grado: string,
        public grado_alias: string,
        public grado_desc: string,
        public anio_lectivo_id: string,
        public nivel_id: string,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterGradoDto?]{
        const { grado,grado_alias,grado_desc, anio_lectivo_id, nivel_id} = object;
        if(!grado) return ["Missing grado"];
        if(!grado_alias) return ["Missing alias"];
        if(!grado_desc) return ["Missing descripcion"];
        if(!anio_lectivo_id) return ["Missing año lectivo"];
        if(!nivel_id) return ["Missing nivel"];
        return [
            undefined,
            new RegisterGradoDto( grado,grado_desc,grado_desc, anio_lectivo_id, nivel_id),
        ]
    }
}