export class FcmEntity {
    constructor(
        public id: string,
        public token_fcm: string,
        public device_id: string,
        public usuario_id: string,
    ){}
}

export class FcmEntityOu {
    constructor (
        public ok:boolean,
        public data: FcmEntity | null| undefined,
        public message: string,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}