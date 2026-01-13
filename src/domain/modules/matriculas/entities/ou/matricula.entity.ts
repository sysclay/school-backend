export class MatriculaEntity {
    constructor(
        public id_matricula: string,
        public id_anio_academico_colegio: string,
        public id_grupo_academico: string,
        public id_colegio: string,
        public id_nivel: string,
        public id_grado: string,
        public id_seccion: string,
        public id_alumno: string,
        public nro_documento: string,
        public nombre: string,
        public paterno: string,
        public materno: string,
        public telefono: string,
        public correo: string,
        public nivel: string,
        public grado: string,
        public seccion: string,
        public turno: string,
        public hora_inicio: string,
        public hora_fin: string,
        public tipo_ingreso: string,
        public tipo_estado: string,
        public estado: boolean,
    ){}
}

export class MatriculaEntityOu {
    constructor (
        public ok:boolean,
        public data: MatriculaEntity | null| undefined,
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
}