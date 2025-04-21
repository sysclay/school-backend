import { Validators } from "../../../utils/index.js";

export class UpdateSalidaAsistenciaDto {
    private constructor (
        public hora_salida: string,
        public hora_llegada: string,
        public registrador_salida: string,
        public fecha:string,
    ){}

    static update(object:{[key:string]:any}):[string?,UpdateSalidaAsistenciaDto?]{
        const { hora_salida,hora_llegada, registrador_salida} = object;
  
        if(!hora_salida) return ["Missing salida"];
        if(!registrador_salida) return ["Missing registrador"];

         const fechaActual = Validators.isFechaPeru();
         const horaActual = Validators.isHoraPeru();

         const entradaDate = new Date(`${fechaActual}T${hora_salida}Z`);
         if (isNaN(entradaDate.getTime())) { return ["Formato de hora salida inválido"]; }
         // Si no se envía hora_llegada, usar hora actual del sistema
         const horaLlegadaFinal = (!hora_llegada || hora_llegada.trim() === '')? horaActual: hora_llegada;
         const llegadaDate = new Date(`${fechaActual}T${horaLlegadaFinal}Z`);
 
         if (isNaN(llegadaDate.getTime())) { return ["Formato de hora llegada inválido"]; }
        
        return [ 
            undefined,
            new UpdateSalidaAsistenciaDto(hora_salida,horaLlegadaFinal, registrador_salida, fechaActual),
        ]
    }
}