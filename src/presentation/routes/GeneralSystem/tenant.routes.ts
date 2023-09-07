import { Router, Request, Response } from 'express';
import { TenantRepository } from '../../../domain/repositories/GeneralSystem/TenantRepository';
import { TenantService } from '../../../service/GeneralSystem/TenantService';
import { TenantController } from '../../controllers/GeneralSystem/TenantController';
import { TenantDtoCreate } from '../../../domain/dtos/GeneralSystem/Tenant/TenantDtoCreate';

const tenantRouter = Router();

const tenantRepository = new TenantRepository();
const tenantService = new TenantService(tenantRepository);
const tenantController = new TenantController(tenantService);

tenantRouter.post('/tenant', (request: Request<{}, {}, TenantDtoCreate>, response: Response) => {
    return tenantController.create(request, response);
});

tenantRouter.get('/tenant/:id', (request: Request<{id: string}>, response: Response) => {
    return tenantController.read(request, response);
});

tenantRouter.get('/tenant/:name', (request: Request<{name: string}>, response: Response) => {
    return tenantController.readByName(request, response);
});

export { tenantRouter }