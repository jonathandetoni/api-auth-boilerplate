import { Router, Request, Response } from 'express';
import { validationToken } from '../../../infrastructure/utils/middleware/authHelper';
import { BudgetsRepository } from '../../../domain/repositories/DataBasic/BudgetsRepository';
import { BudgetsService } from '../../../service/DataBasic/BudgetsService';
import { BudgetsController } from '../../controllers/DataBasic/BudgetsController';
import { BudgetsDtoCreate } from '../../../domain/dtos/DataBasic/Demands/Budgets/BudgetsDtoCreate';

const budgetsRouter = Router();

const budgetsRepository = new BudgetsRepository();
const budgetsService = new BudgetsService(budgetsRepository);
const budgetsController = new BudgetsController(budgetsService);

budgetsRouter.post('/budgets', validationToken,(request: Request<{}, {}, BudgetsDtoCreate>, response: Response) => {
    return budgetsController.create(request, response);
});

budgetsRouter.post('/budgets/:budgetId', validationToken,(request: Request<{budgetId: string}>, response: Response) => {
    return budgetsController.delete(request, response);
});

budgetsRouter.get('/budgets', validationToken, (request: Request<{}, {}, {}, {id: string, ownerId: string, demandId: string}>, response: Response) => {
    return budgetsController.read(request, response);
});

export { budgetsRouter }