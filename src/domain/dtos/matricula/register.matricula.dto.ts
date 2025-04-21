export class RegisterMatriculaDto {
    private constructor (
        public alumno_id: string,
        public apoderado_id: string,
        public seccion_id: string,
        public registrador_usuario:string,
        public turno:string,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterMatriculaDto?]{
        const { alumno_id,apoderado_id, seccion_id,registrador_usuario,turno} = object;
        if(!alumno_id) return ["Missing alumno"];
        if(!apoderado_id) return ["Missing apoderado"];
        if(!seccion_id) return ["Missing seccion"];
        if(!registrador_usuario) return ["Missing registrador"];
        if(!turno) return ["Missing turno"];
        return [
            undefined,
            new RegisterMatriculaDto( alumno_id,apoderado_id, seccion_id, registrador_usuario,turno),
        ]
    }
}