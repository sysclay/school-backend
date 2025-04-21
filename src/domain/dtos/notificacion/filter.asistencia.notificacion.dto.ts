import { Validators } from "../../../utils/index.js";

export class FilterAsistenciaNotiDto {
    private constructor (
        public codigo: string,
        public anio: string | number,
    ){}

    static filter(object:{[key:string]:any}):[string?,FilterAsistenciaNotiDto?]{
        const { codigo,anio} = object;
        let yearNow:string;
        if(!codigo) return ["Missing codigo"];
        if(!anio || (typeof anio === 'string' && anio.trim() === '')){
            const yearActual = Validators.isYearPeru();
            yearNow = yearActual;
        } else {
            if (!Validators.isYearValida(anio.toString())) { return ["Año inválida, debe tener formato YYYY, debe ser hasta año actual"]; }
            yearNow = anio;
        }
        return [
            undefined,
            new FilterAsistenciaNotiDto(codigo,yearNow),
        ]
    }
}