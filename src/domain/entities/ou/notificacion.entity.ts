export class NotificacionEntity {
    constructor(
        public id: string,
        // public token_fcm: string,
        public apoderado_id: string,
    ){}
}

export class NotificacionEntityOu {
    constructor (
        public ok:boolean,
        public data: NotificacionEntity | null| undefined,
        public message: string,
    ){}

    // Método opcional para verificar el estado de `data`
    hasValidData(): boolean {
        return this.data !== undefined && this.data !== null;
    }
}