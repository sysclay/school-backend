export class UpdatePermisoDto {
    private constructor (
        public nombre?: string,
        public descripcion?:string,
        public estado?:boolean,
    ){}

    static update(object:{[key:string]:any}):[string?,UpdatePermisoDto?]{
        const { nombre,descripcion,estado} = object;
        if (nombre !== undefined && nombre !== null && nombre !== '' && nombre.length > 50) {
            return ["El nombre no puede tener más de 50 caracteres"];
        }
        if (descripcion !== undefined && descripcion !== null && descripcion !== '' && descripcion.length > 250) {
            return ["La descripción no puede tener más de 250 caracteres"];
        }
        return [
            undefined,
            new UpdatePermisoDto(nombre,descripcion,estado),
        ]
    }
}