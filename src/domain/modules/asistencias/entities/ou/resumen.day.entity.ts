// export interface ResumenDay {
//   hora_min?: string;
//   hora_max?: string;
// }

export class ResumenDayEntity {
    constructor(
        public id: string,
        public id_asistencia_programada: string,
        public fecha: Date,
        public nombre: string,
        public matriculados: number,
        public sin_registro: number,
        public puntual: number,
        public tarde: number,
        public sin_salida: number,
        public ausente: number,
        public justificado: number,
    ){}
}

export class ResumenDayEntityOu {
    constructor (
        public ok:boolean,
        public data: ResumenDayEntity | null| undefined,
        public message: string,
        // public meta?: ResumenDay,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}