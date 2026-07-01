export class RegisterSeccionDto {
    private constructor (
        public nombre: string,
        public descripcion: string,
        public id_grado: string,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterSeccionDto?]{
        const { nombre,descripcion, id_grado} = object;
        if(!nombre) return ["Missing nombre"];
        if(!descripcion) return ["Missing descripcion"];
        if(!id_grado) return ["Missing grado"];
        return [
            undefined,
            new RegisterSeccionDto( nombre,descripcion, id_grado),
        ]
    }
}