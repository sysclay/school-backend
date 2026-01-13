export class UpdateUsuarioDto {
    private constructor (
        public username?: string | null,
        public password?: string | null,
        public estado?: boolean | null,
    ){}

    static update(object:{[key:string]:any}):[string?,UpdateUsuarioDto?]{
        const { username, password, estado } = object;
        let errorMessage: string | undefined;
        if (username !== undefined &&  typeof username !== 'string') { errorMessage = "Username debe ser un texto"; }
        if (password !== undefined && typeof password !== 'string') { errorMessage = "Password debe ser un texto"; }
        if (estado !== undefined && typeof estado !== 'boolean') { errorMessage = "Estado debe ser booleano"; }
        if (errorMessage) { return [errorMessage, undefined]; }
        return [
            undefined,
            new UpdateUsuarioDto( username, password, estado),
        ]
    }
}