export class RegisterColegioDto {
    private constructor (
        public nombre: string,
        public correo: string,
        public telefono: string,
        public direccion: string,
        public estado: boolean,
    ){}

    private static isValidEmail(email: string): boolean {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    private static isValidPhone(phone: string): boolean {
        const regex = /^(?:\+?51)?9\d{8}$|^(?:\+?51)?\d{7,8}$/;
        return regex.test(phone);
    }

    static create(object:{[key:string]:any}):[string?,RegisterColegioDto?]{
        const { nombre, correo, telefono, direccion, estado } = object;
        if(!nombre) return ["Missing nombre colegio"];
        if(!correo) return ["Missing correo"];
        if(!telefono) return ["Missing teléfono"];
        if(telefono.length>12) return ["Character teléfono demasiado largo"];
        if(!this.isValidPhone(telefono)) return ["Teléfono inválido"];
        if(!this.isValidEmail(correo)) return ["Correo inválido"];
        if(!direccion) return ["Missing direccion"];
        if(typeof estado !== "boolean") return ["Missing or invalid estado"];
        if(nombre.length > 255) return ["El nombre colegio no puede tener más de 50 caracteres"];
        return [
            undefined,
            new RegisterColegioDto(nombre, correo, telefono, direccion, estado),
        ]
    }
}