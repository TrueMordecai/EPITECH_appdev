import { HttpService } from '@nestjs/axios';
import { ConsoleLogger, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { AbstratWidgetService } from 'src/common/abstrat-widget.service';
import { Repository } from 'typeorm';
import { League } from './models/league.entity';

let base_url1 = "https://euw1.api.riotgames.com/lol/"
let key = ""
let base_url2 = "https://europe.api.riotgames.com/lol/"


@Injectable()
export class LeagueService extends AbstratWidgetService {
    constructor(@InjectRepository(League) private readonly leagueRepository: Repository<League>,
                                    private readonly httpService: HttpService)
    {
        super(leagueRepository);
    }

    async getMatches(username : string = "KC Deku") {
        const url1 = `${base_url1}summoner/v4/summoners/by-name/${username}?api_key=${key}`;
        console.log("url : ", url1);
        try {
            const { data }  = await firstValueFrom(this.httpService.get(url1));
            const puuid = data.puuid
            let url2 = `${base_url2}match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5&api_key=${key}`;
            const a = await firstValueFrom(this.httpService.get(url2));
            let win_count = 0;
            let total_match = 0;
            for (; total_match < Object.keys(a.data).length; total_match++) {
                let url3 = `${base_url2}match/v5/matches/${a.data[total_match]}?api_key=${key}`
                const b = await firstValueFrom(this.httpService.get(url3))
                for (let j = 0; j < Object.keys(b.data.info.participants).length; j++) {
                    if (b.data.info.participants[j].puuid == puuid) {
                        if (b.data.info.participants[j].win == true)
                            win_count += 1
                    }
                }
            }
            return win_count;
        } catch (error) {
            console.error({"Error here" : error.code, "Message" : error.message});
        }
    }


    async getProfile(username : string): Promise<string> {
        const url = `${base_url1}summoner/v4/summoners/by-name/${username}?api_key=${key}`;
        const win = (await this.getMatches());
        try {
            let { data }  = await firstValueFrom(this.httpService.get(url))
            data['win'] = win
            return (data)
        } catch (error) {            
            console.error({"Error" : error.code, "Message" : error.message})
        }
        return "error";
    }

    async getRank() {
        const url = `${base_url1}league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=${key}`;
        try {
            const { data }  = await firstValueFrom(this.httpService.get(url));
            let size = Object.keys(data.entries).length
            let save = 0;
            let lpsave = 0;
            for (let i = 0; i != size; i++) {
                if (lpsave < data.entries[i].leaguePoints) {
                    save = i;
                    lpsave = data.entries[i].leaguePoints;
                }
            }
            let icon = ""
            let name = ""
            const url2 = `${base_url1}summoner/v4/summoners/${data.entries[save].summonerId}?api_key=${key}`
            console.log("url2 : ", url2)
            console.log("Future oim = ", data.entries[save])
            try {
                let { data }  = await firstValueFrom(this.httpService.get(url2))
                console.log("data2 : ", data)
                icon = data.profileIconId
                console.log("icon : ", icon)
                const url3 = `https://europe.api.riotgames.com/riot/account/v1/accounts/by-puuid/${data.puuid}?api_key=${key}`
                try {
                    let { data }  = await firstValueFrom(this.httpService.get(url3))
                    name = data.gameName
                    console.log("AEEAZZEAAZEEZAZE" , data )
                } catch(error) {
                    console.error({"Error 4 Here" : error.code, "Message" : error.message})
                }
            } catch (error) {            
                console.error({"Error 3 Here" : error.code, "Message" : error.message})
            }
            let ret = {}
            ret['icon'] = icon
            ret['username'] = name
            ret['lp'] = data.entries[save].leaguePoints
            ret['total_losses'] = data.entries[save].losses
            ret['total_wins'] = data.entries[save].wins
            ret['winrate'] = (data.entries[save].wins / (data.entries[save].wins + data.entries[save].losses)) * 100
            return ret;
        } catch(error) {
            console.error({"Error 2 Here" : error.code, "Message" : error.message});
        }    }

}
