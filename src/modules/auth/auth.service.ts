import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { User } from '../user/user.entity';
import { compare } from 'bcryptjs';
import { throwError } from 'rxjs';
import { IJwtPayload } from './jwt-payload.interface';
import { RoleType } from '../role/roletype.enum';
import { SigninDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly _authRepository: AuthRepository,
    private readonly _jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto): Promise<void> {
    const { username, email } = signupDto;
    const userExists = await this._authRepository.findOne({
      where: [{ username }, { email }],
    });

    if (userExists) {
      throw new ConflictException('Usuario o email ya existe');
    }

    return this._authRepository.signup(signupDto);
  }

  async signin(signinDto: SigninDto): Promise<{ token: string }> {
    const { username, password } = signinDto;
    const user: User = await this._authRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new NotFoundException('Usuario no existe');
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('La contraseña no es válida');
    }

    const payload: IJwtPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
      roles: user.roles.map(r => r.name as RoleType),
    };

    const token = await this._jwtService.sign(payload);
    return { token };
  }
}
