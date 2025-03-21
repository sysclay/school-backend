export class RegisterColegioDto {
    private constructor (
        public nombre_institucion: string,
        public correo: string,
        public telefono: string,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterColegioDto?]{
        const { nombre_institucion, correo, telefono } = object;
        if(!nombre_institucion) return ["Missing nombre_institucion"];
        if(!correo) return ["Missing correo"];
        if(!telefono) return ["Missing telefono"];
        if(telefono.length>15) return ["Character telefono demasiado largo"];
        return [
            undefined,
            new RegisterColegioDto(nombre_institucion, correo, telefono),
        ]
    }
}