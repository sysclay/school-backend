export class UpdateGradoDto {
    private constructor (
        public codigo?: string,
        public nombre?: string,
        public abreviado?: string,
        public descripcion?: string,
        public estado?: boolean,
    ){}

    static update(object:{[key:string]:any}):[string?,UpdateGradoDto?]{
        const { codigo,nombre,abreviado, descripcion,estado } = object;
        if (codigo !== undefined && codigo !== null && codigo !== '' && codigo.length > 50) {
            return ["El codigo no puede tener más de 50 caracteres"];
        }
        if (nombre !== undefined && descripcion !== null && descripcion !== '' && descripcion.length > 50) {
            return ["El nombre no puede tener más de 50 caracteres"];
        }
        if (abreviado !== undefined && abreviado !== null && abreviado !== '' && abreviado.length > 20) {
            return ["El abreviado no puede tener más de 20 caracteres"];
        }
        if (estado !== undefined && typeof estado !== "boolean") return ["Missing or invalid estado"]; 
        return [
            undefined,
            new UpdateGradoDto(codigo,nombre,abreviado, descripcion,estado),
        ];
    }
}