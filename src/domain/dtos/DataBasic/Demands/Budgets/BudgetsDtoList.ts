import { StatusBudgets } from "../../../../../infrastructure/utils/constants/statusBudgets";
import { UserDtoList } from "../../User/UserDtoList";
import { BudgetItemsDtoList } from "../BudgetItems/BudgetItemsDtoList";
import { DemandsDtoList } from "../Demands/DemandsDtoList";

export type BudgetsDtoList = {
    id: string;
    description: string;
    status: StatusBudgets;
    value: string;
    owner: UserDtoList;
    demand: DemandsDtoList;
    budgetItems: BudgetItemsDtoList[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    deleted: boolean;
}