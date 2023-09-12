import { BudgetsDtoCreate } from "../../../dtos/DataBasic/Demands/Budgets/BudgetsDtoCreate";
import { GeneralResponse } from "../generalResponse";

export interface IBudgetsService {
    create(entity: BudgetsDtoCreate ) : Promise<GeneralResponse>;
    read(id: string) : Promise<GeneralResponse>;
    readByOwnerId(ownerId: string): Promise<GeneralResponse>;
    readByDemandId(demandId: string): Promise<GeneralResponse>;
    delete(budgetId: string): Promise<GeneralResponse>;
}