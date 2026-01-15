export class UpdateAlumnoDto {
    private constructor (
        public estado?: boolean,
    ){}


    static update(object:{[key:string]:any}):[string?,UpdateAlumnoDto?]{
        const { estado} = object;
        // if(!estado) return ["Missing algun campo"];

        return [
            undefined,
            new UpdateAlumnoDto( estado ),
        ]
    }
}