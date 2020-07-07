import { IsString, MaxLength } from 'class-validator';

export class UpdateRoleDto {
  @IsString()
  @MaxLength(50, { message: 'Este nombre no es válido' })
  readonly name: string;

  @IsString()
  @MaxLength(100, { message: 'Esta descripción no es válido' })
  readonly description: string;
}
