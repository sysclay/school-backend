
import { PersonaRolDatasource, PersonaRolEntityOu, PersonaRolRepository, RegisterPersonaRolDto, PersonaRolEntity } from "../../../../domain/index.js";

export class PersonaRolRepositoryImpl implements PersonaRolRepository {

    constructor(
        private readonly PersonaRolDatasource: PersonaRolDatasource,
    ){}

    register(registerPersonaRolDto: RegisterPersonaRolDto, by:string): Promise<PersonaRolEntityOu> {
        return this.PersonaRolDatasource.register(registerPersonaRolDto,by);
    } 

    // findById(id:string):Promise<PersonaRolEntityOu>{
    //    return this.PersonaRolDatasource.findById(id);
    // }

    async findAll(page: number, limit: number, role: string, search: string): Promise<PersonaRolEntityOu> {
        const rawData = (await this.PersonaRolDatasource.findAll()).data;
        let data: PersonaRolEntity[] = [];
        if (Array.isArray(rawData)) {
            data = rawData;
        } else if (rawData) {
            data = [rawData];
        }

        // Filtro especial: solo usuarios sin roles
        if (role === 'no-role') {
            data = data.filter(persona =>
                !Array.isArray(persona.roles) || persona.roles.length === 0
            );
        } else if (role) {
            data = data.filter(persona =>
                Array.isArray(persona.roles) &&
                persona.roles.some((r: any) => r.nombre === role || r.id_rol === role)
            );
        }

        // Filtro por search (nro_documento, nombre, paterno, materno)
        if (search) {
            const searchLower = search.toLowerCase();
            data = data.filter(persona =>
                (typeof persona.nro_documento === 'string' && persona.nro_documento.includes(search)) ||
                (typeof persona.nombre === 'string' && String(persona.nombre).toLowerCase().includes(searchLower)) ||
                (typeof persona.paterno === 'string' && String(persona.paterno).toLowerCase().includes(searchLower)) ||
                (typeof persona.materno === 'string' && String(persona.materno).toLowerCase().includes(searchLower))
            );
        }

        const total = data.length;
        const totalPages = Math.ceil(total / limit);
        const paginatedData = data.slice((page - 1) * limit, page * limit);

        return new PersonaRolEntityOu(
            true,
            paginatedData as any, // El mapper espera PersonaRolEntity o array
            'Operación exitosa',
            total,
            page,
            limit,
            totalPages
        );
    }

}