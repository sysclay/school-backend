export class AcademicoColegioEntity {
    constructor(
        public id_colegio: string,
        public id_academico_colegio: string,
        public id_academico: string,
        public colegio: string,
        public fec_ini: string,
        public fec_fin: string,
        public nombre: Date,
        public descripcion: Date,
        public total_secciones: Date,
        public estado: boolean,
        public created_at: Date,
    ){}
}

export class AcademicoColegioEntityOu {
    constructor (
        public ok:boolean,
        public data: AcademicoColegioEntity | null| undefined,
        public message: string,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}