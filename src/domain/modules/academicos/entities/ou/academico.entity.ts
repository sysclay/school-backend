export class AcademicoEntity {
    constructor(
        public id_academico: string,
        public nombre: string,
        public descripcion: string,
        public estado: boolean,
        public created_at: Date,
    ){}
}

export class AcademicoEntityOu {
    constructor (
        public ok:boolean,
        public data: AcademicoEntity | null| undefined,
        public message: string,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}