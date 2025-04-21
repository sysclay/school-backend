export class ValidarTokenDto {
    private constructor (
        public token: string,
    ){}

    static validar(object:{[key:string]:any}):[string?,ValidarTokenDto?]{
        const {  token } = object;
        if(!token) return ["Missing token"];
        return [
            undefined,
            new ValidarTokenDto(token), 
        ]
    }
}