
export class UpdateAsistenciaDto {
    private constructor (
        public id_alumno: string,
        public justificacion?: string,
    ){}

    static update(object:{[key:string]:any}):[string?,UpdateAsistenciaDto?]{
        const { id_alumno,justificacion} = object;
        if(!id_alumno) return ["Missing alumno"];

        return [ 
            undefined,
            new UpdateAsistenciaDto(id_alumno, justificacion,  ),
        ]
    }
}