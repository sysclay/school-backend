export class UpdateColegioDto {
    private constructor (
        public id_colegio: string,
        public nombre?: string,
        public correo?: string,
        public direccion?: string,
        public telefono?: string,
        public estado?: boolean,
    ){}

    private static isValidEmail(email: string): boolean {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    private static isValidPhone(phone: string): boolean {
        const regex = /^(?:\+?51)?(?:\d{9}|\d{7,8})$/;
        return regex.test(phone);
    }


    static update(object:{[key:string]:any}):[string?,UpdateColegioDto?]{
        const { id_colegio, nombre, correo, direccion, telefono, estado } = object;
        if(!id_colegio) return ["Missing or invalid colegio"];
        // Validar que al menos uno de los otros campos esté presente
        if (
            nombre === undefined &&
            correo === undefined &&
            direccion === undefined &&
            telefono === undefined &&
            estado === undefined
        ) {
            return ["At least one field (nombre, correo, direccion, telefono, estado) must be provided to update."];
        }

        if(telefono && !this.isValidPhone(telefono)) return ["Telefono inválido"];
        if(correo && !this.isValidEmail(correo)) return ["Correo inválido"];
        if (estado !== undefined && typeof estado !== "boolean") return ["Missing or invalid estado"]; 
        return [
            undefined,
            new UpdateColegioDto(id_colegio, nombre, correo, direccion, telefono, estado ),
        ];
    }
}