import { StatusBudgets } from "../../../../../infrastructure/utils/constants/statusBudgets";
import { BudgetItemsDtoCreate } from "../BudgetItems/BudgetItemsDtoCreate";

export type BudgetsDtoCreate = {
    id?: string;
    description: string;
    status: StatusBudgets;
    value: string;
    budgetItems: BudgetItemsDtoCreate[];
    ownerId: string;
    demandId: string;
}