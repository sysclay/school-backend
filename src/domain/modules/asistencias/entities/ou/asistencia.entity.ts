export interface AsistenciaMeta {
  hora_min?: string;
  hora_max?: string;
}

export class AsistenciaEntity {
    constructor(
        public id: string,
        public id_matricula: string,
        public fecha: string,
        public hora_entrada: string,
        public hora_llegada: string,
        public hora_salida: string,
        public registrador_entrada: string,
        public registrador_salida: string,
        public asistencia: string,
    ){}
}

export class AsistenciaEntityOu {
    constructor (
        public ok:boolean,
        public data: AsistenciaEntity | null| undefined,
        public message: string,
        public meta?: AsistenciaMeta,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}