import { StatusBudgetItems } from "../../../../../../infrastructure/utils/constants/statusBudgetItems";
import { BudgetsDtoList } from "../../Budgets/BudgetsDtoList";


export type BudgetItemsDtoCreateResult = {
    id: string;
    name: string;
    description: string;
    status: StatusBudgetItems;
    value: string;
    budget: BudgetsDtoList;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    deleted: boolean;
}