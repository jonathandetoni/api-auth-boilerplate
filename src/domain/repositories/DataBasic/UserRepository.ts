import { prismaClient } from '../../../infrastrutucture/config/database/prismaClient';
import { Logger } from '../../../infrastrutucture/utils/log/logger';
import { Prisma } from '@prisma/client';
import { IUserRepository } from '../../interfaces/repository/DataBasic/IUserRepository';
import { UserDtoList } from '../../dtos/DataBasic/User/UserDtoList';
import { UserDtoCreate } from '../../dtos/DataBasic/User/UserDtoCreate';
import { UserDtoCreateResult } from '../../dtos/DataBasic/User/result/UserDtoCreateResult';
import { hashPassword } from '../../../infrastrutucture/utils/middleware/authHelper';

class UserRepository implements IUserRepository {
    async create(entity: UserDtoCreate): Promise<UserDtoCreateResult> {
        try {
            const upsertReturn = await prismaClient.users.upsert({
                where: {
                    id: entity.id,
                    email: entity.email
                },
                update: {
                    email: entity.email,
                    password: await hashPassword(entity.password),
                    tenantId: entity.tenantId,
                    role: entity.role,
                    typeUser: entity.typeUser,
                },
                create: {
                    email: entity.email,
                    password: await hashPassword(entity.password),
                    cpf: entity.cpf,
                    tenantId: entity.tenantId,
                    role: entity.role,
                    typeUser: entity.typeUser,
                },
                select: {
                    id: true,
                    createdAt: true,
                    email: true,
                    tenant: true,
                    role: true,
                    typeUser: true
                }
            }) as UserDtoCreateResult

            console.log('error: ', upsertReturn)

            return upsertReturn;
        } catch (error) {
            console.log('catch error: ', error)
            throw Logger.error(error);
        }
    }

    async read(id: string): Promise<UserDtoList> {
        try {
            const findFirstOrThrowReturn = await prismaClient.users.findFirstOrThrow({
                where: {
                    id: id
                },
                select: {
                    id: true,
                    createdAt: true,
                    updatedAt: true,
                    email: true,
                    cpf: true
                }
            }) as UserDtoList;

            return findFirstOrThrowReturn;
        } catch (error) {
            if (error instanceof Prisma.NotFoundError) {
                throw Logger.error(error.message);
            }

            throw Logger.error(error)
        }
    }

    async readByEmail(email: string): Promise<UserDtoList> {
        try {
            const findFirstOrThrow = await prismaClient.users.findFirstOrThrow({
                where: {
                    email: email
                },
                select: {
                    id: true,
                    createdAt: true,
                    updatedAt: true,
                    cpf: true,
                    email: true
                }
            }) as UserDtoList;

            return findFirstOrThrow;
        } catch (error) {
            if (error instanceof Prisma.NotFoundError) {
                throw Logger.error(error.message);
            }

            throw Logger.error(error)
        }
    }

    async readByEmailWithPassword(email: string): Promise<UserDtoList> {
        try {
            const findFirstOrThrow = await prismaClient.users.findFirstOrThrow({
                where: {
                    email: email
                },
                select: {
                    id: true,
                    createdAt: true,
                    updatedAt: true,
                    cpf: true,
                    email: true,
                    password: true
                }
            }) as UserDtoList;

            return findFirstOrThrow;
        } catch (error) {
            if (error instanceof Prisma.NotFoundError) {
                throw Logger.error(error.message);
            }

            throw Logger.error(error)
        }
    }
}

export { UserRepository }