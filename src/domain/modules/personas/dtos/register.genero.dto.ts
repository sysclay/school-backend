
export class RegisterGeneroDto {
    private constructor (
        public genero: string,
        public abreviado: string,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterGeneroDto?]{
        const { genero, abreviado } = object;
        if(!genero) return ["Missing genero"];
        if(!abreviado) return ["Missing abreviado"];
        return [
            undefined,
            new RegisterGeneroDto(
                genero,
                abreviado,
            ),
        ]
    }


}