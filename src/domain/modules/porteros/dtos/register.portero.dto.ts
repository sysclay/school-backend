export class RegisterPorteroDto {
    private constructor (
        public id_colegio: string,
        public nombre: string,
        public paterno: string,
        public materno: string,
        public id_documento: string,
        public nro_documento: string,
        public id_genero: string,
        public correo?: string,
        public telefono?: string,
        public fecha_nacimiento?: string,
        public direccion?: string,
        public foto?: string,
    ){}


    private static isValidEmail(email: string): boolean {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    private static isValidPhone(phone: string): boolean {
        const regex = /^(?:\+?51)?(?:\d{9}|\d{7,8})$/;
        return regex.test(phone);
    }

    static create(object:{[key:string]:any}):[string?,RegisterPorteroDto?]{
        const { id_colegio,  nombre, paterno,materno, id_documento, nro_documento,id_genero,correo,telefono} = object;
        if(!id_colegio) return ["Missing colegio"];
        if(!nombre) return ["Missing nombre"];
        if(!paterno) return ["Missing apellido paterno"];
        if(!materno) return ["Missing apellido materno"];
        if(telefono && !this.isValidPhone(telefono)) return ["Telefono inválido"];
        if(correo && !this.isValidEmail(correo)) return ["Correo inválido"];
        if(!nro_documento) return ["Missing numero documento"];
        if(!id_documento) return ["Missing documento"];
        if(!id_genero) return ["Missing genero"];
        if(nombre !== undefined && nombre !== null && nombre !== '' && nombre.length > 100) return ["El nombre no puede tener más de 100 caracteres"];
        if(paterno !== undefined && paterno !== null && paterno !== '' && paterno.length > 100) return ["El apellido paterno no puede tener más de 100 caracteres"];
        if(materno !== undefined && materno !== null && materno !== '' && materno.length > 100) return ["El apellido materno no puede tener más de 100 caracteres"];
        return [
            undefined,
            new RegisterPorteroDto( id_colegio, nombre, paterno,materno, id_documento, nro_documento,id_genero,correo,telefono,object.fecha_nacimiento,object.direccion,object.foto ),
        ]
    }
}