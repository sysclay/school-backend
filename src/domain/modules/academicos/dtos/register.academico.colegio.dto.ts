export class RegisterAcademicoColegioDto {
    private constructor (
        public readonly id_colegio: string,
        public readonly id_academico: string,
        public readonly fecha_inicio: Date,
        public readonly fecha_fin: Date,
    ){}

    static create(object:{[key:string]:any}):[string?,RegisterAcademicoColegioDto?]{
        const { id_colegio, id_academico, fecha_inicio, fecha_fin } = object;

        // Validaciones de campos requeridos
        if (!id_colegio) return ["Missing id_colegio"];
        if (!id_academico) return ["Missing id_academico"];
        if (!fecha_inicio) return ["Missing fecha_inicio"];
        if (!fecha_fin) return ["Missing fecha_fin"];

        // Validaciones de tipo string
        if (typeof id_colegio !== 'string' || id_colegio.trim() === '') {
            return ["id_colegio must be a non-empty string"];
        }
        if (typeof id_academico !== 'string' || id_academico.trim() === '') {
            return ["id_academico must be a non-empty string"];
        }
        // Conversión y validación de fechas
        const inicio = new Date(fecha_inicio);
        const fin = new Date(fecha_fin);
        if (isNaN(inicio.getTime())) return ["Invalid fecha_inicio format"];
        if (isNaN(fin.getTime())) return ["Invalid fecha_fin format"];

      // Validación lógica de fechas
        if (inicio >= fin) return ["fecha_inicio must be before fecha_fin"];

                // Validación adicional: no fechas muy antiguas o muy futuras
        const currentYear = new Date().getFullYear();
        const minYear = currentYear - 10;
        const maxYear = currentYear + 10;

        if (inicio.getFullYear() < minYear || inicio.getFullYear() > maxYear) {
            return [`fecha_inicio year must be between ${minYear} and ${maxYear}`];
        }
        if (fin.getFullYear() < minYear || fin.getFullYear() > maxYear) {
            return [`fecha_fin year must be between ${minYear} and ${maxYear}`];
        }

        // console.log('ERROR::::', id_colegio.trim(), id_academico.trim(), fecha_inicio, fecha_fin )

        return [
            undefined,
            new RegisterAcademicoColegioDto(id_colegio.trim(), id_academico.trim(), fecha_inicio, fecha_fin ),
        ]
    }

    // Métodos adicionales útiles
    toObject(): { [key: string]: any } {
        return {
            id_colegio: this.id_colegio,
            id_academico: this.id_academico,
            fecha_inicio: this.fecha_inicio,
            fecha_fin: this.fecha_fin,
        };
    }

    // Para serialización genérica (no específica de BD)
    toPlainObject(): { [key: string]: any } {
        return {
            id_colegio: this.id_colegio,
            id_academico: this.id_academico,
            fecha_inicio: this.fecha_inicio,
            fecha_fin: this.fecha_fin,
        };
    }

}

