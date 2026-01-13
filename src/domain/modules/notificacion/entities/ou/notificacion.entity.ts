export class NotificacionEntity {
    constructor(
        public id: string,
        public nom_apoderado: string,
        public pat_apoderado: string,
        public mat_apoderado: string,
        public doc_apoderado: string,
        public correo: string,
        public anio: string,
        public device_id: string,
        public token_fcm: string,
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