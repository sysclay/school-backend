export class UpdateEntityMessage {
    constructor(
        public message: string,
    ){}
}

export class UpdateEntityMessageOu {
    constructor (
        public ok:boolean,
        public data: UpdateEntityMessage | null| undefined,
        public message: string,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}