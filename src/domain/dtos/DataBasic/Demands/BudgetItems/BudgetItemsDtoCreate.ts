import { StatusBudgetItems } from "../../../../../infrastructure/utils/constants/statusBudgetItems";

export type BudgetItemsDtoCreate = {
    id?: string;
    name: string;
    description: string;
    status: StatusBudgetItems;
    value: string;
    budgetId: string;
}