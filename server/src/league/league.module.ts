import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeagueController } from './league.controller';
import { LeagueService } from './league.service';
import { League } from './models/league.entity';
import { CommonModule } from 'src/common/common.module';
import { HttpModule } from '@nestjs/axios';
import { User } from 'src/user/models/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([League, User]),
    CommonModule,
    HttpModule
  ],
  controllers: [LeagueController],
  providers: [LeagueService, HttpModule]
})
export class LeagueModule {}
