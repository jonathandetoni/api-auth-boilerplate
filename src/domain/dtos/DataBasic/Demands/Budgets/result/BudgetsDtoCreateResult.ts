import { StatusBudgets } from "../../../../../../infrastructure/utils/constants/statusBudgets";
import { UserDtoList } from "../../../User/UserDtoList";
import { DemandsDtoList } from "../../Demands/DemandsDtoList";

export type BudgetsDtoCreateResult = {
    id: string;
    description: string;
    status: StatusBudgets;
    value: string;
    owner: UserDtoList;
    demand: DemandsDtoList;
    createdAt: Date;
    deleted: boolean;
    deletedAt: Date;
}