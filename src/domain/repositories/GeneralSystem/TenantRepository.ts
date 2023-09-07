import { prismaClient } from '../../../infrastructure/config/database/prismaClient';
import { Logger } from '../../../infrastructure/utils/log/logger';
import { ITenantRepository } from '../../interfaces/repository/GeneralSystem/ITenantRepository';
import { TenantDtoCreate } from '../../dtos/GeneralSystem/Tenant/TenantDtoCreate';
import { TenantDtoList } from '../../dtos/GeneralSystem/Tenant/TenantDtoList';
import { TenantDtoCreateResult } from '../../dtos/GeneralSystem/Tenant/result/TenantDtoCreateResult';

class TenantRepository implements ITenantRepository {
    async create(entity: TenantDtoCreate): Promise<TenantDtoCreateResult> {
        try {
            return await prismaClient.tenants.upsert({
                where: {
                    id: entity.id,
                    name: entity.name
                },
                create: {
                    name: entity.name,
                    description: entity.description
                },
                update: {
                    name: entity.name,
                    description: entity.description
                }
            }) as TenantDtoCreateResult;
        } catch (error) {
            throw Logger.error(error);
        }
    }
    async read(id: string): Promise<TenantDtoList> {
        try {
            return await prismaClient.tenants.findFirstOrThrow({
                where: {
                    id: id
                }
            }) as TenantDtoList;
        } catch (error) {
            throw Logger.error(error);
        }   
    }
    async readByName(name: string): Promise<TenantDtoList> {
        try {
            return await prismaClient.tenants.findFirstOrThrow({
                where: {
                    name: name
                }
            }) as TenantDtoList;
        } catch (error) {
            throw Logger.error(error);
        } 
    }
   
}

export { TenantRepository }