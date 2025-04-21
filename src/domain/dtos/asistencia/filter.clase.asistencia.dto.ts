import { Validators } from '../../../utils/index.js';
export class FilterClaseAsistenciaDto {
    private constructor (
        public codigo: string,
        public fecha: string,
    ){}

    static filterClase(object:{[key:string]:any}):[string?,FilterClaseAsistenciaDto?]{
        const { codigo, fecha} = object;
        let fechaNow:string;
        if(!codigo||codigo.trim() === '') return ["Missing codigo"];
        if(!fecha || fecha.trim()===''){
            const fechaActual = Validators.isFechaPeru();
            fechaNow = fechaActual;
        } else {
            if (!Validators.isFechaValida(fecha)) {
                return ["Fecha inválida, debe tener formato YYYY-MM-DD"];
            }
            fechaNow = new Date(fecha).toISOString().split('T')[0];
        }
        return [ 
            undefined,
            new FilterClaseAsistenciaDto(codigo, fechaNow),
        ]
    }
}