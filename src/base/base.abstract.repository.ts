import { Injectable } from "@nestjs/common";

@Injectable()
export abstract class BaseAbstractRepository<T> {
    constructor(){}

    abstract create(data, entity:string): Promise<void>;

    abstract getAll(entity: string): Promise<entity[]>;

    abstract getById(data, entity:string): Promise<entity>;
    
    abstract update(data, entity:string): Promise<void>;

    abstract delete(data, entity:string): Promise<void>;
}