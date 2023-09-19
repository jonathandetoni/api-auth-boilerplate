import { DemandsDtoCreate } from "../../domain/dtos/DataBasic/Demands/Demands/DemandsDtoCreate";
import { IDemandsRepository } from "../../domain/interfaces/repository/DataBasic/IDemandsRepository";
import { IDemandsService } from "../../domain/interfaces/service/DataBasic/IDemandsService";
import { GeneralResponse } from "../../domain/interfaces/service/generalResponse";
import { HttpStatusCode } from "../../infrastructure/utils/constants/httpStatusCode";
import { LogLevelEnum, Logger } from "../../infrastructure/utils/log/logger";
import { IBudgetsService } from "../../domain/interfaces/service/DataBasic/IBudgetsService";
import { EnumStatusBudgets } from "../../infrastructure/utils/constants/statusBudgets";
import { EnumStatusDemands, StatusDemands } from "../../infrastructure/utils/constants/statusDemands";

class DemandsService implements IDemandsService {
  private readonly _demandsRepository: IDemandsRepository;
  private readonly _budgetsService: IBudgetsService;

  constructor(
    demandsRespository: IDemandsRepository, 
    budgetsService: IBudgetsService
    ){
    this._demandsRepository = demandsRespository;
    this._budgetsService = budgetsService;
  }
  
  async update(entity: DemandsDtoCreate): Promise<GeneralResponse> {
    return await this._demandsRepository.update(entity);
  }
  
  async delete(demandId: string): Promise<GeneralResponse> {
    return await this._demandsRepository.delete(demandId)
  }

  async create(entity: DemandsDtoCreate): Promise<GeneralResponse> {
    return await this._demandsRepository.create(entity);
  }

  async read(id: string): Promise<GeneralResponse> {
    return await this._demandsRepository.read(id);
  }

  async readByOwnerId(ownerId: string): Promise<GeneralResponse> {
    return await this._demandsRepository.readByOwnerId(ownerId);
  }

  async updateStatus(demandId: string, status: StatusDemands): Promise<GeneralResponse> {
    return this._demandsRepository.updateStatus(demandId, status);
  }

  async acceptBudget(demandId: string, budgetId: string): Promise<GeneralResponse> {
    let result: GeneralResponse;

    const demand = (await this._demandsRepository.read(demandId)).data;
    
    try {
      for(const budget of demand.budgets) {
        if(budget.id === budgetId) {
          await Promise.all([this._budgetsService.updateStatus(budgetId, EnumStatusBudgets.ACCEPTED)]);
        } else {
          await Promise.all([this._budgetsService.updateStatus(budget.id, EnumStatusBudgets.REFUSED)]);
        }
      }

      result = await this.updateStatus(demandId, EnumStatusDemands.CHOSEN_BUDGET);

      return {
        success: true,
        statusCode: result.statusCode,
        data: result.data
      }
    } catch (error: any) {
      Logger.error(error);

      return {
        success: false,
        error: {
          message: "Erro inesperado ao atualizar status da demanda.",
          errorMessage: error.message,
          details: [{
            errorDetails: error.toString(),
            typeError: LogLevelEnum.ERROR    
          },
          {
            label: 'Demanda',
            errorDetails: demand
          },
          {
            label: 'BudgetId',
            errorDetails: budgetId
          }]
        },
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR
      }
    }
  }
}

export { DemandsService }