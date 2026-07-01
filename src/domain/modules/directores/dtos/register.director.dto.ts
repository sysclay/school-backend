export class RegisterDirectorDto {
    private constructor (
        public id_persona: string,
        public cip:string,
        public formacion_academica:string,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterDirectorDto?]{
        const {  id_persona, cip, formacion_academica } = object;
        if(!id_persona) return ["Missing persona"];
        if(!cip) return ["Missing cip"];
        if(!formacion_academica) return ["Missing formacion_academica"];
        return [
            undefined,
            new RegisterDirectorDto(id_persona, cip, formacion_academica),
        ]
    }
}