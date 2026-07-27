export class ResumenMonthDto {
    private constructor(
        public id_colegio?: string | null,
        public id_anio_academico?: string | null,
        public id_grupo_academico?: string | null,
        public month?: string | null,
    ) {}

    static resumenMonth(object: { [key: string]: any }): [string?, ResumenMonthDto?] {
        const {
            id_colegio = null,
            id_anio_academico = null,
            id_grupo_academico = null,
            month = null,
        } = object;

        return [
            undefined,
            new ResumenMonthDto(
                id_colegio,
                id_anio_academico,
                id_grupo_academico,
                month
            ),
        ];
    }
}