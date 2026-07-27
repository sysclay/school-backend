export class ResumenAlumnoDto {
    private constructor(
        public id_alumno?: string | null,
    ) {}

    static resumenAlumno(object: { [key: string]: any }): [string?, ResumenAlumnoDto?] {
        const {
            id_alumno = null,
        } = object;

        return [
            undefined,
            new ResumenAlumnoDto(
                id_alumno,
            ),
        ];
    }
}