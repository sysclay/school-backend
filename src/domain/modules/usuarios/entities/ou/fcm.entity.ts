export class FcmEntity {
    constructor(
        public id_fcm: string,
        public id_usuario: string,
        public token_fcm: string,
        public platform: string,
        public last_login: string,
        public last_seen: string,
        public is_active: boolean,
    ){}
}

export class FcmEntityOu {
    constructor (
        public ok:boolean,
        public message: string,
        public data?: FcmEntity | null 
    ){}

    // Método opcional para verificar el estado de `data`
    // hasValidData(): boolean {
    //     return this.data !== undefined && this.data !== null;
    // }
}