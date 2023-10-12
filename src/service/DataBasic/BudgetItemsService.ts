import { BudgetItemsDtoCreate } from "../../domain/dtos/DataBasic/Demands/BudgetItems/BudgetItemsDtoCreate";
import { IBudgetItemsRepository } from "../../domain/interfaces/repository/DataBasic/IBudgetItemsRepository";
import { IBudgetItemsService } from "../../domain/interfaces/service/DataBasic/IBudgetItemsService";
import { GeneralResponse } from "../../domain/interfaces/service/generalResponse";

class BudgetItemsService implements IBudgetItemsService {
  private readonly _budgetItemsRepository: IBudgetItemsRepository;

  constructor(budgetItemsRepository: IBudgetItemsRepository) {
    this._budgetItemsRepository = budgetItemsRepository;
  }
  
  async upsert(entity: BudgetItemsDtoCreate): Promise<GeneralResponse> {
    return await this._budgetItemsRepository.upsert(entity);
  }

  async read(id: string): Promise<GeneralResponse> {
    return await this._budgetItemsRepository.read(id);
  }

  async readByBudgetId(budgetId: string): Promise<GeneralResponse> {
    return await this._budgetItemsRepository.readByBudgetId(budgetId);
  }

  async delete(budgetId: string): Promise<GeneralResponse> {
    return await this._budgetItemsRepository.delete(budgetId);
  }
}

export { BudgetItemsService }