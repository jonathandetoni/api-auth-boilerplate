import { Router, Request, Response } from 'express';
import { validationToken } from '../../../infrastructure/utils/middleware/authHelper';
import { BudgetItemsRepository } from '../../../domain/repositories/DataBasic/BudgetItemsRepository';
import { BudgetItemsService } from '../../../service/DataBasic/BudgetItemsService';
import { BudgetItemsController } from '../../controllers/DataBasic/BudgetItemsController';
import { BudgetItemsDtoCreate } from '../../../domain/dtos/DataBasic/Demands/BudgetItems/BudgetItemsDtoCreate';

const budgetItemsRouter = Router();

const budgetItemsRepository = new BudgetItemsRepository();
const budgetItemsService = new BudgetItemsService(budgetItemsRepository);
const budgetItemsController = new BudgetItemsController(budgetItemsService);

budgetItemsRouter.post('/budgetItems', validationToken,(request: Request<{}, {}, BudgetItemsDtoCreate>, response: Response) => {
    return budgetItemsController.upsert(request, response);
});

budgetItemsRouter.post('/budgetItems/:budgetItemId', validationToken,(request: Request<{budgetItemId: string}>, response: Response) => {
    return budgetItemsController.delete(request, response);
});

budgetItemsRouter.get('/budgetItems', validationToken, (request: Request<{}, {}, {}, {id: string, budgetId: string}>, response: Response) => {
    return budgetItemsController.read(request, response);
});

export { budgetItemsRouter }