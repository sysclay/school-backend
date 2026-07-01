export class RegisterApoderadoAlumnoDto {
    private constructor (
        public id_alumno: string,
        public id_apoderado: string,
        public id_parentesco: string,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterApoderadoAlumnoDto?]{
        const { id_alumno, id_apoderado,id_parentesco } = object;
        if(!id_alumno) return ["Missing alumno"];
        if(!id_apoderado) return ["Missing apoderado"];
        if(!id_parentesco) return ["Missing parentesco"];

        return [
            undefined,
            new RegisterApoderadoAlumnoDto( id_alumno, id_apoderado, id_parentesco ),
        ]
    }
}