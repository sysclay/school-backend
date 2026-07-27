// export interface ResumenMonth {
//   hora_min?: string;
//   hora_max?: string;
// }

export class ResumenMonthEntity {
    constructor(
        public cod_colegio: string,
        public colegio: string,
        public cod_anio_academico: string,
        public cod_grupo: string,
        public grupo_academico: string,
        public anio: number,
        public mes: number,
        public dias_lectivos: number,
        public matriculados: number,
        public sin_registro: number,
        public porcentaje_sin_registro: number,
        public puntual: number,
        public porcentaje_puntual: number,
        public tarde: number,
        public porcentaje_tarde: number,
        public sin_salida: number,
        public porcentaje_sin_salida: number,
        public ausente: number,
        public porcentaje_ausente: number,
        public justificado: number,
        public porcentaje_justificado: number,
    ){}
}

export class ResumenMonthEntityOu {
    constructor (
        public ok:boolean,
        public data: ResumenMonthEntity | null| undefined,
        public message: string,
        // public meta?: ResumenMonth,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}