export class SeccionEntity {
    constructor(
        public id: string,
        public seccion: string,
        public grado_id: string,
    ){}
}

export class SeccionEntityOu {
    constructor (
        public ok:boolean,
        public data: SeccionEntity | null| undefined,
        public message: string,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}