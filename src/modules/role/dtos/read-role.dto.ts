import { IsString, MaxLength, IsNumber } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ReadRoleDto {
  @Expose({ name: 'identificador' })
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsString()
  @MaxLength(50, { message: 'Este nombre no es válido' })
  readonly name: string;

  @Expose()
  @IsString()
  @MaxLength(100, { message: 'Esta descripción no es válido' })
  readonly description: string;
}
