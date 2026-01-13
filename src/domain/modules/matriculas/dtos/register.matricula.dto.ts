export class RegisterMatriculaDto {
    private constructor (
        public id_alumno: string,
        public id_grupo: string,
        public id_matricula_estado: string,
        public id_matricula_ingreso:string,
        public id_academico:string,
        public repitente:boolean,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterMatriculaDto?]{
        const { id_alumno,id_grupo, id_matricula_estado, id_matricula_ingreso, id_academico, repitente} = object;
        if(!id_alumno) return ["Missing id_alumno"];
        if(!id_grupo) return ["Missing id_grupo"];
        if(!id_matricula_estado) return ["Missing id_matricula_estado"];
        if(!id_matricula_ingreso) return ["Missing id_matricula_ingreso"];
        if(!id_academico) return ["Missing id_academico"];
        return [
            undefined,
            new RegisterMatriculaDto( id_alumno,id_grupo, id_matricula_estado, id_matricula_ingreso, id_academico, repitente),
        ]
    }
}