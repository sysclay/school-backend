// import { Validators } from "../../../utils/validators.js";

export class FilterApoderadoDto {
    private constructor (
        public nro_documento: string,
        public year: string,
    ){}

    static filter(object:{[key:string]:any}):[string?,FilterApoderadoDto?]{
        const {nro_documento,year} = object;
        // let yearNow:string;
        if(!nro_documento) return ["Missing documento"];
        return [
            undefined,
            // new FilterApoderadoAlumnoDto(nro_documento, yearNow),
            new FilterApoderadoDto(nro_documento, year),
        ]
    }
}