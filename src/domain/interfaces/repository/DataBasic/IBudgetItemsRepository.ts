import { BudgetItemsDtoCreate } from "../../../dtos/DataBasic/Demands/BudgetItems/BudgetItemsDtoCreate";
import { GeneralResponse } from "../../service/generalResponse";

export interface IBudgetItemsRepository {
    upsert(entity: BudgetItemsDtoCreate ) : Promise<GeneralResponse>;
    read(id: string) : Promise<GeneralResponse>;
    readByBudgetId(budgetId: string): Promise<GeneralResponse>;
    delete(id: string): Promise<GeneralResponse>;
}