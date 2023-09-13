import { BudgetsDtoCreate } from "../../domain/dtos/DataBasic/Demands/Budgets/BudgetsDtoCreate";
import { IBudgetsRepository } from "../../domain/interfaces/repository/DataBasic/IBudgetsRepository";
import { IBudgetsService } from "../../domain/interfaces/service/DataBasic/IBudgetsService";
import { GeneralResponse } from "../../domain/interfaces/service/generalResponse";

class BudgetsService implements IBudgetsService {
  private readonly _budgetsRepository: IBudgetsRepository;

  constructor(budgetsRepository: IBudgetsRepository) {
    this._budgetsRepository = budgetsRepository;
  }
  
  async create(entity: BudgetsDtoCreate): Promise<GeneralResponse> {
    return await this._budgetsRepository.create(entity);
  }

  async read(id: string): Promise<GeneralResponse> {
    return await this._budgetsRepository.read(id);
  }

  async readByOwnerId(ownerId: string): Promise<GeneralResponse> {
    return await this._budgetsRepository.readByOwnerId(ownerId);
  }
  
  async readByDemandId(demandId: string): Promise<GeneralResponse> {
    return await this._budgetsRepository.readByDemandId(demandId);
  }

  async update(entity: BudgetsDtoCreate): Promise<GeneralResponse> {
    return await this._budgetsRepository.update(entity);
  }

  async delete(budgetId: string): Promise<GeneralResponse> {
    return await this._budgetsRepository.delete(budgetId);
  }
}

export { BudgetsService }