export class RegisterAcademicoDto {
    private constructor (
        public nombre: string,
        public descripcion: string,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterAcademicoDto?]{
        const { nombre, descripcion } = object;
        if(!nombre) return ["Missing nombre"];
        if(!descripcion) return ["Missing descripcion"];

        return [
            undefined,
            new RegisterAcademicoDto(nombre, descripcion),
        ]
    }
}