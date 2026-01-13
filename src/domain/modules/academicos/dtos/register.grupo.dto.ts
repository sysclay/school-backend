export class RegisterGrupoDto {
    private constructor (
        public nombre: string,
        // public academico: string,
        public capacidad: number,
        public id_colegio: string,
        public id_nivel: string,
        public id_grado: string,
        public id_seccion: string,
        public id_academico: string,
        public id_turno: string,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterGrupoDto?]{
        const { nombre, capacidad, id_colegio, id_nivel, id_grado, id_seccion, id_academico,id_turno } = object;
        if(!nombre) return ["Missing nombre"];
        // if(!academico) return ["Missing academico"];
        if(!capacidad) return ["Missing capacidad"];
        if(!id_colegio) return ["Missing id_colegio"];
        if(!id_nivel) return ["Missing id_nivel"];
        if(!id_grado) return ["Missing id_grado"];
        if(!id_seccion) return ["Missing id_seccion"];
        if(!id_academico) return ["Missing id_academico"];
        if(!id_turno) return ["Missing id_turno"];

        return [
            undefined,
            new RegisterGrupoDto(nombre, capacidad, id_colegio, id_nivel, id_grado, id_seccion, id_academico,id_turno),
        ]
    }
}