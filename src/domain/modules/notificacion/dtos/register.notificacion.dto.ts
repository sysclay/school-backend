export class RegisterNotificacionDto {
    private constructor (
        public token_fcm: string,
        public message: string,
        public title:string,
        public hora:string,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterNotificacionDto?]{
        const { token_fcm,message,title,hora} = object;
        if(!token_fcm) return ["Missing fcm"];
        if(!message) return ["Missing message"];
        return [
            undefined,
            new RegisterNotificacionDto(token_fcm,message,title,hora),
        ]
    }
}