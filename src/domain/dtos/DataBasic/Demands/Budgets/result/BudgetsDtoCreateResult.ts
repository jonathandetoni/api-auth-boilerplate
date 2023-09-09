import { StatusBudgets } from "../../../../../../infrastructure/utils/constants/statusBudgets";

export type BudgetsDtoCreateResult = {
    id: string;
    description: string;
    status: StatusBudgets;
    value: string;
    professionalId: string;
    createdAt: Date;  
}