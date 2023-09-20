import { Router, Request, Response } from 'express';
import { validationToken } from '../../../infrastructure/utils/middleware/authHelper';
import { DemandsRepository } from '../../../domain/repositories/DataBasic/DemandsRepository';
import { DemandsService } from '../../../service/DataBasic/DemandsService';
import { DemandsController } from '../../controllers/DataBasic/DemandsController';
import { DemandsDtoCreate } from '../../../domain/dtos/DataBasic/Demands/Demands/DemandsDtoCreate';
import { BudgetsRepository } from '../../../domain/repositories/DataBasic/BudgetsRepository';
import { BudgetsService } from '../../../service/DataBasic/BudgetsService';

const demandsRouter = Router();

const budgetsRepository = new BudgetsRepository();
const budgetsService = new BudgetsService(budgetsRepository);

const demandsRepository = new DemandsRepository();
const demandsService = new DemandsService(demandsRepository, budgetsService);
const demandsController = new DemandsController(demandsService);

demandsRouter.post('/demands', validationToken,(request: Request<{}, {}, DemandsDtoCreate>, response: Response) => {
    return demandsController.create(request, response);
});

demandsRouter.put('/demands', validationToken,(request: Request<{}, {}, DemandsDtoCreate>, response: Response) => {
    return demandsController.update(request, response);
});

demandsRouter.post('/demands/:demandId/budgets/:budgetId/accept', validationToken,(request: Request<{demandId: string, budgetId: string}>, response: Response) => {
    return demandsController.acceptBudget(request, response);
});

demandsRouter.post('/demands/:demandId', validationToken,(request: Request<{demandId: string}>, response: Response) => {
    return demandsController.delete(request, response);
});

demandsRouter.get('/demands', validationToken, (request: Request<{}, {}, {}, {id: string, ownerId: string}>, response: Response) => {
    return demandsController.read(request, response);
});

export { demandsRouter }