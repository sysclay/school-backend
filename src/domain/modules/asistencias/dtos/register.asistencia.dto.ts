
export class RegisterAsistenciaDto {
    private constructor (
        public id_alumno: string,
        public justificacion?: string,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterAsistenciaDto?]{
        const { id_alumno,justificacion} = object;
        if(!id_alumno) return ["Missing alumno"];

        return [ 
            undefined,
            new RegisterAsistenciaDto(id_alumno, justificacion,  ),
        ]
    }
}