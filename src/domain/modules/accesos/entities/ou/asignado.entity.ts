export class AsignadoEntity {
    constructor(
        public id_asigna: string,
        public id_asignado: string,
        public asigna: string,
        public asignado: string,
        public estado: boolean,
    ){}
}

export class AsignadoEntityOu {
    constructor (
        public ok:boolean,
        public data: AsignadoEntity | null| undefined,
        public message: string,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}