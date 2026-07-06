// import { Validators } from "../../../utils/index.js";

export class FilterAsistenciaMarcadoDto {
    private constructor (
        public id_grupo_academico?: string | null,
        public id_matricula?:       string | null,
        public fecha_inicio?:       string | null,  // "YYYY-MM-DD" o null
        public fecha_fin?:          string | null,  // "YYYY-MM-DD" o null
    ){}

    static filterMarcado(object:{[key:string]:any}):[string?,FilterAsistenciaMarcadoDto?]{
        const id_grupo_academico = typeof object.id_grupo_academico === 'string' && object.id_grupo_academico.trim() !== '' ? object.id_grupo_academico.trim(): undefined;
        const id_matricula = typeof object.id_matricula === 'string' && object.id_matricula.trim() !== '' ? object.id_matricula.trim(): undefined;

        // ── Fechas opcionales con validación ──────────────────────────────────
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

        const fecha_inicio = typeof object.fecha_inicio === "string" && object.fecha_inicio.trim() !== ""
            ? object.fecha_inicio.trim()
            : undefined;

        const fecha_fin = typeof object.fecha_fin === "string" && object.fecha_fin.trim() !== ""
            ? object.fecha_fin.trim()
            : undefined;

        if (fecha_inicio && !dateRegex.test(fecha_inicio)) {
            return ["fecha_inicio debe tener formato YYYY-MM-DD"];
        }

        if (fecha_fin && !dateRegex.test(fecha_fin)) {
            return ["fecha_fin debe tener formato YYYY-MM-DD"];
        }

        if (fecha_inicio && fecha_fin && fecha_inicio > fecha_fin) {
            return ["fecha_inicio no puede ser mayor que fecha_fin"];
        }

        return [ 
            undefined,
            new FilterAsistenciaMarcadoDto(id_grupo_academico, id_matricula,fecha_inicio,fecha_fin ),
        ]
    }
}