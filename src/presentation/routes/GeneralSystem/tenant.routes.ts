import { Router, Request, Response } from 'express';
import { TenantRepository } from '../../../domain/repositories/GeneralSystem/TenantRepository';
import { TenantService } from '../../../service/GeneralSystem/TenantService';
import { TenantController } from '../../controllers/GeneralSystem/TenantController';
import { TenantDtoCreate } from '../../../domain/dtos/GeneralSystem/Tenant/TenantDtoCreate';
import { validationToken } from '../../../infrastrutucture/utils/middleware/authHelper';

const tenantRouter = Router();

const tenantRepository = new TenantRepository();
const tenantService = new TenantService(tenantRepository);
const tenantController = new TenantController(tenantService);

tenantRouter.post('/tenant', validationToken,(request: Request<{}, {}, TenantDtoCreate>, response: Response) => {
    return tenantController.create(request, response);
});

tenantRouter.get('/tenant', validationToken, (request: Request<{}, {}, {}, {id: string, name: string}>, response: Response) => {
    return tenantController.read(request, response);
});

export { tenantRouter }