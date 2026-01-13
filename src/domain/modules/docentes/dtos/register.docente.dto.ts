export class RegisterDocenteDto {
    private constructor (
        public id_colegio: string,
        public id_rol: string,
        public id_doc: string,
        public nombre: string,
        public ape_pat: string,
        public ape_mat: string,
        public doc: string,
        public sexo: string,
        public telefono: string,
        public correo: string,
        public direccion: string,
        public fec_nac: Date,
        public foto: string,
        public titulo: string,
        public especialidad: string,
        public fecha_contratacion: Date,
        public persona_id?: string,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterDocenteDto?]{
        const {id_colegio, id_rol, id_doc, nombre, ape_pat, ape_mat, doc, sexo, telefono, correo, direccion, fec_nac, foto, titulo, especialidad, fecha_contratacion, id_persona} = object;
        if(!id_colegio) return ["Missing id_colegio"];
        if(!id_rol) return ["Missing id_rol"];
        if(!id_doc) return ["Missing id_doc"];
        if(!nombre) return ["Missing nombre"];
        if(!ape_pat) return ["Missing ape_pat"];
        if(!ape_mat) return ["Missing ape_mat"];
        if(!doc) return ["Missing doc"];
        if(!sexo) return ["Missing sexo"];
        if(!telefono) return ["Missing telefono"];
        if(!correo) return ["Missing correo"];
        if(!direccion) return ["Missing direccion"];
        if(!fec_nac) return ["Missing fec_nac"];
        // if(!foto) return ["Missing foto"];
        if(!titulo) return ["Missing titulo"];
        if(!especialidad) return ["Missing especialidad"];
        if(!fecha_contratacion) return ["Missing fecha_contratacion"];

        return [
            undefined,
            new RegisterDocenteDto(id_colegio, id_rol, id_doc, nombre, ape_pat, ape_mat, doc, sexo, telefono, correo, direccion, fec_nac, foto, titulo, especialidad, fecha_contratacion,id_persona),
        ]
    }
}