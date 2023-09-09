import { StatusBudgets } from "../../../../../infrastructure/utils/constants/statusBudgets";

export type ContactsDtoList = {
    id: string;
    description: string;
    status: StatusBudgets;
    value: string;
    professionalId: string;
    createdAt: Date;
    updatedAt: Date;
}