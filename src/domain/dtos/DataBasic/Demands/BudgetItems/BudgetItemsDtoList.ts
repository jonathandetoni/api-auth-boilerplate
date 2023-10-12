import { StatusBudgetItems } from "../../../../../infrastructure/utils/constants/statusBudgetItems";
import { BudgetsDtoList } from "../Budgets/BudgetsDtoList";

export type BudgetItemsDtoList = {
    id: string;
    name: string;
    description: string;
    status: StatusBudgetItems;
    value: string;
    budget: BudgetsDtoList;
    budgetId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    deleted: boolean;
}