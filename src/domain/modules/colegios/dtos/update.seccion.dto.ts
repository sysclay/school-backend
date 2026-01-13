export class UpdateSeccionDto {
    private constructor (
        public nombre?: string,
        public descripcion?: string,
        public estado?: boolean,
    ){}

    static update(object:{[key:string]:any}):[string?,UpdateSeccionDto?]{
        const { nombre, descripcion,estado } = object;
        if (nombre !== undefined && descripcion !== null && descripcion !== '' && descripcion.length > 50) {
            return ["El nombre no puede tener más de 50 caracteres"];
        }
        if (estado !== undefined && typeof estado !== "boolean") return ["Missing or invalid estado"]; 
        return [
            undefined,
            new UpdateSeccionDto(nombre, descripcion,estado),
        ];
    }
}