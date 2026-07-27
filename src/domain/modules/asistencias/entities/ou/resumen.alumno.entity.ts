
export class ResumenAlumnoEntity {
    constructor(
        public id_programado: number,
        public fecha: Date,
        public mes: number,
        public anio: number,
        public id_alumno: string,
        public codigo_alumno: string,
        public dia_semana: string,
        public hora_inicio: string,
        public hora_fin: string,
        public estado_asistencia: string,
        public hora_llegada: string,
        public hora_salida: string,
        public justificacion: string
    ){}
}

export class ResumenAlumnoEntityOu {
    constructor (
        public ok:boolean,
        public data: ResumenAlumnoEntity | null| undefined,
        public message: string,
        // public meta?: ResumenAlumno,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}