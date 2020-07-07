import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './role.entity';
import { ReadRoleDto } from './dtos/read-role.dto';
import { CreateRoleDto } from './dtos/create-role.dto';
import { UpdateRoleDto } from './dtos/update-role.dto';

@Controller('roles')
export class RoleController {
  constructor(private readonly _roleService: RoleService) {}

  @Get(':RoleId')
  async getRole(
    @Param('RoleId', ParseIntPipe) RoleId: number,
  ): Promise<ReadRoleDto> {
    return this._roleService.get(RoleId);
  }

  @Get()
  getRoles(): Promise<ReadRoleDto[]> {
    return this._roleService.getAll();
  }

  @Post()
  createRole(@Body() role: Partial<CreateRoleDto>): Promise<ReadRoleDto> {
    return this._roleService.create(role);
  }

  @Patch(':RoleId')
  updateRole(
    @Param('RoleId', ParseIntPipe) RoleId: number,
    @Body() role: Partial<UpdateRoleDto>,
  ) {
    return this._roleService.update(RoleId, role);
  }

  @Delete(':RoleId')
  deleteRole(@Param('RoleId', ParseIntPipe) RoleId: number) {
    return this._roleService.delete(RoleId);
  }
}
