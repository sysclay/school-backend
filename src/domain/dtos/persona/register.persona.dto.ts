import { Validators } from "../../../utils/index.js";

export class RegisterPersonaDto {
    private constructor (
        public nombre: string,
        public apellido_paterno: string,
        public apellido_materno: string,
        public telefono: string,
        public correo: string,
        public nro_documento: string,
        public tipo_documento_id: string,
        
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterPersonaDto?]{
        const { nombre, apellido_paterno,apellido_materno,telefono,correo, nro_documento, tipo_documento_id } = object;
        if(!nombre) return ["Missing nombre"];
        if(!apellido_paterno) return ["Missing apellido paterno"];
        if(!apellido_materno) return ["Missing apellido materno"];
        if(!telefono) return ["Missing numero telefono"];
        if(!Validators.isValidPhone(telefono)) return ["Telefono inválido"];
        if(!correo) return ["Missing numero correo"];
        if(!Validators.isValidEmail(correo)) return ["Correo inválido"];
        if(!nro_documento) return ["Missing numero documento"];
        if(!tipo_documento_id) return ["Missing documento id"];
        return [
            undefined,
            new RegisterPersonaDto(nombre, apellido_paterno,apellido_materno,telefono,correo, nro_documento, tipo_documento_id),
        ]
    }


}