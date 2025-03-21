export class GradoEntity {
    constructor(
        public id: string,
        public grado: string,
        public anio_lectivo_id: string,
        public nivel_id: string,
    ){}
}

export class GradoEntityOu {
    constructor (
        public ok:boolean,
        public data: GradoEntity | null| undefined,
        public message: string,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}