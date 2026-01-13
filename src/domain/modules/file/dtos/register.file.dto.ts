
export class RegisterFileDto {
    private constructor (
        public filename: string,
        public mimetype: string,
        public size: number,
        public buffer?: Buffer // si lo necesitas en memoria
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterFileDto?]{
        const { filename, mimetype, size, buffer } = object;
        if (!filename) return ["Missing filename"];
        if (!mimetype) return ["Missing mimetype"];
        if (!size) return ["Missing size"];
        return [undefined, new RegisterFileDto(filename, mimetype, size, buffer)];
    }
}