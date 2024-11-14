import { Injectable } from "@nestjs/common";
import { BaseRepository } from "./base.repository";

@Injectable()
export class BaseService {
    constructor(
        private readonly baseRepository: BaseRepository
    ){}

    async create(data, entity: string){
        await this.baseRepository.create(data, entity)
    }

    async getAll(entity: string){
        return await this.baseRepository.getAll(entity)
    }

    async getById(data, entity: string){
        return await this.baseRepository.getById(data, entity)
    }

    async update(id, data, entity: string){
        await this.baseRepository.update(id, data, entity)
    }

    async delete(data, entity: string){
        await this.baseRepository.delete(data, entity)
    }
}