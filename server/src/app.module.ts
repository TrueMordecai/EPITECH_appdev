import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { LeagueModule } from './league/league.module';
import { CatModule } from './cat/cat.module';
@Module({
  imports: [UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'dashdb',
      autoLoadEntities: true,
      entities: [],
      synchronize: true,
    }),
    AuthModule,
    CommonModule,
    LeagueModule,
    CatModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
