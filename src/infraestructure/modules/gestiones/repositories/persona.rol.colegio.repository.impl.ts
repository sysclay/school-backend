
import { PersonaRolColegioDatasource, PersonaRolColegioEntityOu, PersonaRolColegioRepository, RegisterPersonaRolColegioDto, PersonaRolColegioEntity, UpdatePersonaRolColegioDto } from "../../../../domain/index.js";

export class PersonaRolColegioRepositoryImpl implements PersonaRolColegioRepository {

    constructor(
        private readonly PersonaRolColegioDatasource: PersonaRolColegioDatasource,
    ){}

    register(registerPersonaRolColegioDto: RegisterPersonaRolColegioDto, by:string): Promise<PersonaRolColegioEntityOu> {
        return this.PersonaRolColegioDatasource.register(registerPersonaRolColegioDto,by);
    } 

    // findById(id:string):Promise<PersonaRolColegioEntityOu>{
    //    return this.PersonaRolColegioDatasource.findById(id);
    // }

    async findAll(page: number, limit: number, role: string, colegio:string, search: string): Promise<PersonaRolColegioEntityOu> {
        // return this.PersonaRolColegioDatasource.findAll(page,limit,role,search);
        const rawData = (await this.PersonaRolColegioDatasource.findAll()).data;

        // console.log(page, limit, role, search);
        let data: PersonaRolColegioEntity[] = [];
        if (Array.isArray(rawData)) {
            data = rawData;
        } else if (rawData) {
            data = [rawData];
        }
        // console.log(data.length)

        // Filtro especial: solo usuarios sin roles
        if (role === 'no-role') {
            data = data.filter(persona =>
                !Array.isArray(persona.colegios) || persona.colegios.length === 0
            );
        } else if (role) {
            data = data.filter(persona =>
                Array.isArray(persona.colegios) &&
                persona.colegios.some(colegio =>
                    Array.isArray(colegio.roles) &&
                    colegio.roles.some(rol =>
                        rol.nombre_rol === role || rol.id_rol === role
                    )
                )
            );
        }
        // Filtro por search (nro_documento, nombre, paterno, materno)
        const normalize = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        if (search) {
            const query = normalize(search.trim());
            data = data.filter(persona => {
                if (typeof persona.nombre_completo !== "string") return false;
                return normalize(persona.nombre_completo).includes(query);
            });
        }

        if (colegio) {
            data = data.filter(persona =>
                Array.isArray(persona.colegios) &&
                persona.colegios.some(col =>
                    col.id_colegio === colegio || col.nombre_colegio === colegio
                )
            );
        }

        const total = data.length;
        const totalPages = Math.ceil(total / limit);
        const paginatedData = data.slice((page - 1) * limit, page * limit);

        return new PersonaRolColegioEntityOu(
            true,
            paginatedData as any, // El mapper espera PersonaRolColegioEntity o array
            'Operación exitosa',
            total,
            page,
            limit,
            totalPages
        );
    }

    updateAll(updatePersonaRolColegioDto: UpdatePersonaRolColegioDto, by: string): Promise<PersonaRolColegioEntityOu> {
        return this.PersonaRolColegioDatasource.updateAll(updatePersonaRolColegioDto,by)
    }

}