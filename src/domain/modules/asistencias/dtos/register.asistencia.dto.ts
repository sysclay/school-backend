
export class RegisterAsistenciaDto {
    private constructor (
        public id_colegio: string,
        public id_alumno: string,
        public justificacion?: string,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterAsistenciaDto?]{
        const { id_colegio,id_alumno,justificacion} = object;
        if(!id_colegio) return ["Missing colegio"];
        if(!id_alumno) return ["Missing alumno"];

        return [ 
            undefined,
            new RegisterAsistenciaDto(id_colegio,id_alumno, justificacion,  ),
        ]
    }
}