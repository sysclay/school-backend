export class ApoderadoAlumnoEntity {
    constructor(
        public id_persona_apoderado: string,
        public id_persona_alumno: string,
        public id_apoderado: string,
        public id_apoderado_alumno: string,
        public id_alumno: string,
        public tipo_doc: string,
        public nro_doc: string,
        public nombre: string,
        public paterno: string,
        public materno: string,
        public genero: string,
        public foto: string,
        public correo: string,
        public telefono: string,
        public direccion: string,
        public qr: string,
        // public created_at: string,
    ){}
}

export class ApoderadoAlumnoEntityOu {
    constructor (
        public ok:boolean,
        public data: ApoderadoAlumnoEntity | null| undefined,
        public message: string,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}