import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstratWidgetService } from 'src/common/abstrat-widget.service';
import { Repository } from 'typeorm';
import { Cat } from './models/cat.entity';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class CatService extends AbstratWidgetService {
    constructor(@InjectRepository(Cat) private readonly catRepository: Repository<Cat>, 
    private readonly httpService: HttpService) {
        super(catRepository);
    }


    async getCat(): Promise<string> {
        try {
            let url3 = `https://api.thecatapi.com/v1/images/search`
            const {data} = await firstValueFrom(this.httpService.get(url3))
            //console.log(data)
            return data[0].url
        } catch (error) {
            console.error({ "Error": error.code, "Message": error.message });
        }
    }


}
// https://api.thecatapi.com/v1/images/search