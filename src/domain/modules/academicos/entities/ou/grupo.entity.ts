export class GrupoEntity {
    constructor(
        public id_grupo: string,
        public id_academico: string,
        public id_colegio: string,
        public id_nivel: string,
        public id_grado: string,
        public id_seccion: string,
        public nombre: string,
        public nivel: string,
        public grado: string,
        public seccion: string,
        public capacidad: number,
        public hora_inicio: string,
        public hora_fin: string,
        public turno: string,
        public estado: boolean,
        public created_at: Date,
    ){}
}

export class GrupoEntityOu {
    constructor (
        public ok:boolean,
        public data: GrupoEntity | null| undefined,
        public message: string,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}