export class RegisterNotificacionDto {
    private constructor (
        public id_alumno: string,
        public message: string,
        public title:string,
        public hora:string,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterNotificacionDto?]{
        const { id_alumno,message,title,hora} = object;
        if(!id_alumno) return ["Missing identity"];
        if(!message) return ["Missing message"];
        return [
            undefined,
            new RegisterNotificacionDto(id_alumno,message,title,hora),
        ]
    }
}