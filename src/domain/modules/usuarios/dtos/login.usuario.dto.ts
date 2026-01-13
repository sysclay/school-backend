export class LoginUsuarioDto {
    private constructor (
        public username: string,
        public password: string,
    ){}

    static login(object:{[key:string]:any}):[string?,LoginUsuarioDto?]{
        const { username, password } = object;
        if(!username) return ["Missing username"];
        if(!password) return ["Missing password"];
        return [
            undefined,
            new LoginUsuarioDto( username, password),
        ]
    }
}