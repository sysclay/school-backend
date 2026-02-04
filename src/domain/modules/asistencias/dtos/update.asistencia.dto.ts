
export class UpdateAsistenciaDto {
    private constructor (
        public id_colegio: string,
        public id_alumno: string,
        public justificacion?: string,
    ){}

    static update(object:{[key:string]:any}):[string?,UpdateAsistenciaDto?]{
        const { id_colegio,id_alumno,justificacion} = object;
        if(!id_alumno) return ["Missing alumno"];
        if(!id_colegio) return ["Missing colegio"];

        return [ 
            undefined,
            new UpdateAsistenciaDto(id_colegio,id_alumno, justificacion,  ),
        ]
    }
}