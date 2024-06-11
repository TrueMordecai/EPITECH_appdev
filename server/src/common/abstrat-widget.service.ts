import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export abstract class AbstratWidgetService {
    protected constructor(protected readonly repo:Repository<any>) {}

    async all() : Promise<any[]> {
        return this.repo.find()
    }

    async create(data): Promise<any> {
        console.log("here", data)
        return this.repo.save(data)
    }

    async findOne(condit): Promise<any> {
        return await this.repo.findOne({where: condit})
    }

    async update(id: number, data): Promise<any> {
        return this.repo.update(id, data)
    }

    async delete(id: number): Promise<any> {
        return this.repo.delete(id);
    }

}
