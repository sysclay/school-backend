export class RegisterMatriculaDto {
    private constructor (
        public alumno_id: string,
        public apoderado_id: string,
        public seccion_id: string,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterMatriculaDto?]{
        const { alumno_id,apoderado_id, seccion_id} = object;
        if(!alumno_id) return ["Missing alumno"];
        if(!apoderado_id) return ["Missing apoderado"];
        if(!seccion_id) return ["Missing seccion"];
        return [
            undefined,
            new RegisterMatriculaDto( alumno_id,apoderado_id, seccion_id),
        ]
    }
}