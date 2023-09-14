import { Router, Request, Response } from 'express';
import { validationToken } from '../../../infrastructure/utils/middleware/authHelper';
import { DemandsRepository } from '../../../domain/repositories/DataBasic/DemandsRepository';
import { DemandsService } from '../../../service/DataBasic/DemandsService';
import { DemandsController } from '../../controllers/DataBasic/DemandsController';
import { DemandsDtoCreate } from '../../../domain/dtos/DataBasic/Demands/Demands/DemandsDtoCreate';

const demandsRouter = Router();

const demandsRepository = new DemandsRepository();
const demandsService = new DemandsService(demandsRepository);
const demandsController = new DemandsController(demandsService);

demandsRouter.post('/demands', validationToken,(request: Request<{}, {}, DemandsDtoCreate>, response: Response) => {
    return demandsController.create(request, response);
});

demandsRouter.put('/demands', validationToken,(request: Request<{}, {}, DemandsDtoCreate>, response: Response) => {
    return demandsController.update(request, response);
});

demandsRouter.post('/demands/:demandId', validationToken,(request: Request<{demandId: string}>, response: Response) => {
    return demandsController.delete(request, response);
});

demandsRouter.get('/demands', validationToken, (request: Request<{}, {}, {}, {id: string, ownerId: string}>, response: Response) => {
    return demandsController.read(request, response);
});

export { demandsRouter }