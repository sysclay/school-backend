export class UpdateNivelDto {
    private constructor (
        public nombre?: string,
        public descripcion?: string,
        public estado?: boolean,
    ){}

    static update(object:{[key:string]:any}):[string?,UpdateNivelDto?]{
        const { nombre, descripcion,estado } = object;
        if (nombre !== undefined && descripcion !== null && descripcion !== '' && descripcion.length > 50) {
            return ["La nombre no puede tener más de 50 caracteres"];
        }
        if (estado !== undefined && typeof estado !== "boolean") return ["Missing or invalid estado"]; 
        return [
            undefined,
            new UpdateNivelDto( nombre, descripcion,estado),
        ];
    }
}