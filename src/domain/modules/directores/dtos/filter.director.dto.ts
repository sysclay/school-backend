// import { Validators } from "../../../utils/validators.js";

export class FilterDirectorDto {
    private constructor (
        public nro_documento: string,
        public year: string,
    ){}

    static filter(object:{[key:string]:any}):[string?,FilterDirectorDto?]{
        const {nro_documento,year} = object;
        // let yearNow:string;
        if(!nro_documento) return ["Missing documento"];
        // if(!year || (typeof year === 'string' && year.trim() === '')){
        //     const yearActual = Validators.isYearPeru();
        //     yearNow = yearActual;
        // } else {
        //     if (!Validators.isYearValida(year.toString())) { return ["Año inválida, debe tener formato YYYY, debe ser hasta año actual"]; }
        //     yearNow = year;
        // }
        return [
            undefined,
            // new FilterDirectorAlumnoDto(nro_documento, yearNow),
            new FilterDirectorDto(nro_documento, year),
        ]
    }
}