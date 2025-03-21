export class RegisterSeccionDto {
    private constructor (
        public seccion: string,
        public grado_id: string,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterSeccionDto?]{
        const { seccion, grado_id} = object;
        if(!seccion) return ["Missing seccion"];
        if(!grado_id) return ["Missing grado"];
        return [
            undefined,
            new RegisterSeccionDto( seccion, grado_id),
        ]
    }
}