import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';
import { Cat } from './models/cat.entity';
import { CommonModule } from 'src/common/common.module';
import { HttpModule } from '@nestjs/axios';
import { User } from 'src/user/models/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Cat]),
    CommonModule,
    HttpModule
  ],
  controllers: [CatController],
  providers: [CatService, HttpModule]
})
export class CatModule {}
