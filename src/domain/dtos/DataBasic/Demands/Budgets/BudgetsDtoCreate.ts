import { StatusBudgets } from "../../../../../infrastructure/utils/constants/statusBudgets";

export type BudgetsDtoCreate = {
    id?: string;
    description: string;
    status: StatusBudgets;
    value: string;
    ownerId: string;
    demandId: string;
}