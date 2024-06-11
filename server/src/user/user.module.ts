import { User } from './models/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CommonModule } from 'src/common/common.module';
import { Cat } from 'src/cat/models/cat.entity';
import { League } from 'src/league/models/league.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Cat, League]),
    CommonModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
