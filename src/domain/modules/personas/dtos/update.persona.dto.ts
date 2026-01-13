
export class UpdatePersonaDto {
    private constructor (
        public nombre?: string,
        public paterno?: string,
        public materno?: string,
        public id_genero?: string,
        public correo?: string,
        public telefono?: string,
        public fecha_nacimiento?: string,
        public direccion?: string,
        public foto?: string,
        public estado?:boolean,
    ){}

    private static isValidEmail(email: string): boolean {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    private static isValidPhone(phone: string): boolean {
        const regex = /^(?:\+?51)?(?:\d{9}|\d{7,8})$/;
        return regex.test(phone);
    }

    static update(object:{[key:string]:any}):[string?,UpdatePersonaDto?]{
        const { nombre, paterno, materno, telefono, correo, id_genero, fecha_nacimiento, direccion, foto, estado } = object;
        // Solo validar campos que se envían y no son undefined, null o vacíos

        if(nombre !== undefined && nombre !== null && nombre.trim() === '') return ["Nombre no puede estar vacío"];
        if(paterno !== undefined && paterno !== null && paterno.trim() === '') return ["Apellido paterno no puede estar vacío"];
        if(materno !== undefined && materno !== null && materno.trim() === '') return ["Apellido materno no puede estar vacío"];
        if(telefono !== undefined && telefono !== null && telefono.trim() !== '' && !this.isValidPhone(telefono)) return ["Telefono inválido"];
        if(correo !== undefined && correo !== null && correo.trim() !== '' && !this.isValidEmail(correo)) return ["Correo inválido"];
        if(id_genero !== undefined && id_genero !== null && id_genero.trim() == '') return ["Género no puede estar vacío"];

        return [
            undefined,
            new UpdatePersonaDto(
                nombre,
                paterno,
                materno,
                id_genero,
                correo,
                telefono,
                fecha_nacimiento,
                direccion,
                foto,
                estado
            ),
        ]
    }


}