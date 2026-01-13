export class FilterMatriculaDto {
    private constructor (
        public id_anio_academico_colegio?: string,
        public id_grupo_academico?: string,
        public id_colegio?: string,
        public id_nivel?: string,
        public id_grado?: string,
        public id_seccion?: string,
        public id_alumno?: string,
    ){}

    static filter(object:{[key:string]:any}):[string?,FilterMatriculaDto?]{
        const { id_anio_academico_colegio, id_grupo_academico, id_colegio, id_nivel, id_grado, id_seccion, id_alumno} = object;
        if(!id_anio_academico_colegio && !id_grupo_academico && !id_colegio && !id_nivel && !id_grado && !id_seccion && !id_alumno) return ["Missing sin campo enviado"];
        return [
            undefined,
            new FilterMatriculaDto( id_anio_academico_colegio, id_grupo_academico, id_colegio, id_nivel, id_grado, id_seccion, id_alumno),
        ]
    }
}