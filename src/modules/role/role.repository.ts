import { Repository, EntityRepository } from 'typeorm';
import { Role } from './role.entity';

// Permite acceso a todos los metodos de la entidad con la base de datos
@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {}
