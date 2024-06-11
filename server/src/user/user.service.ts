import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from 'src/cat/models/cat.entity';
import { League } from 'src/league/models/league.entity';
import { Repository } from 'typeorm';
import { User } from './models/user.entity';
import { LeagueType } from 'src/league/models/league.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Cat) private readonly catRepository: Repository<Cat>,
        @InjectRepository(League) private readonly leagueRepository: Repository<League>
        ) {}

        async all() : Promise<User[]> {
            return this.userRepository.find();
        }

        async paginate(page : number  = 1) : Promise<any>{
            const take = 1;
    
            const [users, total] = await this.userRepository.findAndCount({
                take,
                skip: (page - 1) * take

            })

            return {
                data: users,
                meta : {
                    total,
                    page,
                    last_page: Math.ceil(total / take)
                }
            }
        }    

        async create(data) : Promise<User> {
            const u = this.userRepository.save(data)
            console.log('Create user :', await u)
            return u
        }
    
        
        async findOne(condit): Promise<User> {
            return await this.userRepository.findOne({where: condit})
        }

        async update(id: number, data) : Promise<any> {
            return this.userRepository.update(id, data)
        }

        async delete(id: number): Promise<any> {
            return this.userRepository.delete(id);
        }

        async getLeagueWidget(usr: User): Promise<any> {
            
            const lol = await this.leagueRepository.find ({
                where : {
                    user: {
                        id: usr.id
                    }
                }
            })
            for (var i = 0; i != lol.length; i++) {
                console.log("lol i :", lol[i].type, " = ", LeagueType.Rankone)
                if (lol[i].type == LeagueType.Rankone) {
                    lol[i]['window'] = "league_rank"
                } else {
                    lol[i]['window'] = "league_profile"
                }
            }

            return lol
        }

        async getCatWidget(usr: User): Promise<any> {
            return this.catRepository.find({
                where : {
                    user: {
                        id: usr.id
                    }
                }
            })
        }
    }
