export class UpdateSalidaAsistenciaDto {
    private constructor (
        public hora_salida: string,
        public registrador_salida: string,
    ){}

    static create(object:{[key:string]:any}):[string?,UpdateSalidaAsistenciaDto?]{
        const { hora_salida, registrador_salida} = object;
  
        if(!hora_salida) return ["Missing salida"];
        if(!registrador_salida) return ["Missing registrador"];
        const horaSalidaDate = new Date(hora_salida);
            // 📌 Verificar si es una fecha válida
        if (isNaN(horaSalidaDate.getTime())) { return ["Invalid hora salida format"]; }
            // 📌 Extraer la fecha actual en formato YYYY-MM-DD
        const today = new Date();
        const fechaHoy = today.toISOString().split("T")[0]; // Ej: "2025-03-09"
        const fechaSalida = horaSalidaDate.toISOString().split("T")[0]; // Ej: "2025-03-09"

        console.log(fechaHoy,fechaSalida, today )
        // 📌 Validar que la fecha de `hora_salida` sea hoy
        if (fechaHoy !== fechaSalida) {
            return ["hora salida debe ser del día actual"];
        }

            // 📌 Extraer la hora
        const horas = horaSalidaDate.getHours();

        // 📌 Validar que `hora_salida` esté en los rangos permitidos
        const rangoPermitido = (horas >= 13 && horas < 14) || (horas >= 18 && horas < 19);

        if (!rangoPermitido) {
            return ["hora salida fuera del rango permitido"];
        }
        
        return [ 
            undefined,
            new UpdateSalidaAsistenciaDto(hora_salida, registrador_salida),
        ]
    }
}