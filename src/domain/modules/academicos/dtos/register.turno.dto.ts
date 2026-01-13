export class RegisterTurnoDto {
    private constructor (
        public nombre: string,
        public descripcion: string,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterTurnoDto?]{
        const { nombre, descripcion } = object;
        if(!nombre) return ["Missing nombre"];
        if(!descripcion) return ["Missing descripcion"];

        return [
            undefined,
            new RegisterTurnoDto(nombre, descripcion),
        ]
    }
}