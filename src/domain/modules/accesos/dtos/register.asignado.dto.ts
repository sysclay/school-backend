export class RegisterAsignadoDto {
    private constructor (
        public id_asigna: string,
        public id_asignado: string,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterAsignadoDto?]{
        const { id_asigna, id_asignado} = object;
        if(!id_asigna) return ["Missing asignar"];
        if(!id_asignado) return ["Missing asignado"];
        return [
            undefined,
            new RegisterAsignadoDto( id_asigna, id_asignado),
        ]
    }
}