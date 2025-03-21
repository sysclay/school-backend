export class RegisterGradoDto {
    private constructor (
        public grado: string,
        public anio_lectivo_id: string,
        public nivel_id: string,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterGradoDto?]{
        const { grado, anio_lectivo_id, nivel_id} = object;
        if(!grado) return ["Missing grado"];
        if(!anio_lectivo_id) return ["Missing año lectivo"];
        if(!nivel_id) return ["Missing nivel"];
        return [
            undefined,
            new RegisterGradoDto( grado, anio_lectivo_id, nivel_id),
        ]
    }
}