import { StatusBudgets } from "../../../../infrastructure/utils/constants/statusBudgets";
import { BudgetsDtoCreate } from "../../../dtos/DataBasic/Demands/Budgets/BudgetsDtoCreate";
import { GeneralResponse } from "../../service/generalResponse";

export interface IBudgetsRepository {
    create(entity: BudgetsDtoCreate ) : Promise<GeneralResponse>;
    read(id: string) : Promise<GeneralResponse>;
    readByOwnerId(ownerId: string): Promise<GeneralResponse>;
    readByDemandId(demandId: string): Promise<GeneralResponse>;
    update(entity: BudgetsDtoCreate): Promise<GeneralResponse>;
    delete(budgetId: string): Promise<GeneralResponse>;
    updateStatus(budgetId: string, status: StatusBudgets): Promise<GeneralResponse>;
}