import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { Configuration } from './config/config.keys';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from './modules/role/role.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
<<<<<<< HEAD
  imports: [
    ConfigModule,
    DatabaseModule,
    TypeOrmModule.forRoot(),
    UserModule,
    RoleModule,
  ],
=======
  imports: [ConfigModule, DatabaseModule, TypeOrmModule.forRoot(), UserModule, RoleModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
>>>>>>> develop
})
export class AppModule {
  static port: number | string;

  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}
