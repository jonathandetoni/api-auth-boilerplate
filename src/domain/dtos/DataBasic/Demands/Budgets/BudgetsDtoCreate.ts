import { StatusBudgets } from "../../../../../infrastructure/utils/constants/statusBudgets";

export type ContactsDtoCreate = {
    id?: string;
    description: string;
    status: StatusBudgets;
    value: string;
    professionalId: string;
}