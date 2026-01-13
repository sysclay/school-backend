export class AlumnoEntity {
    constructor(
        public id_colegio: string,
        public colegio: string,
        public id_alumno: string,
        public nro_doc: string,
        public nombre: string,
        public paterno: string,
        public materno: string,
        public telefono: string,
        public correo: string,
        public qr_code: string,
        public estado: boolean,
        public created_at: string,
    ){}
}

export class AlumnoEntityOu {
    constructor (
        public ok:boolean,
        public data: AlumnoEntity | null| undefined,
        public message: string,
        public total?: number,
        public page?: number,
        public limit?: number,
        public totalPages?: number,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }

        // Método para calcular el total de páginas
    calculateTotalPages(): number {
        if (this.total && this.limit) {
            return Math.ceil(this.total / this.limit);
        }
        return 0;
    }
}