export class AsistenciaProgramadoEntity {
    constructor(
        public id_asistencia_programado: string,
        public id_grupo_academico: string,
        public fecha: string,
        public hora_inicio: string,
        public hora_fin: string,
        // public descripcion: string,
        public estado: boolean,
    ){}
}

export class AsistenciaProgramadoEntityOu {
    constructor (
        public ok:boolean,
        public data: AsistenciaProgramadoEntity | null| undefined,
        public message: string,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}