export class DocenteEntity {
    constructor(
        public id_usuario: string,
        public id_persona: string,
        public id_docente: string,
        public id_colegio: string,
        public id_documento: string,
        public nom_corto: string,
        public nro_documento: string,
        public nombre: string,
        public paterno: string,
        public materno: string,
        public correo: string,
        public telefono: string,
        public fecha_nacimiento: Date,
        public direccion: string,
        public genero: string,
        public foto: string,
        public titulo: string,
        public especialidad: string,
        public fecha_contratacion: Date,
        public estado: boolean,
        public created_at: Date,
        public created_by: string,
    ){}
}

export class DocenteEntityOu {
    constructor (
        public ok:boolean,
        public data: DocenteEntity | null| undefined,
        public message: string,
        public total: number,
        public page: number,
        public limit: number,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}