import { StatusDemands } from "../../../../../../infrastructure/utils/constants/statusDemands";
import { UserDtoList } from "../../../User/UserDtoList";
import { BudgetsDtoList } from "../../Budgets/BudgetsDtoList";

export type DemandsDtoCreateResult = {
    id: string;
    name: string;
    description: string;
    status: StatusDemands;
    category: string;
    typeService: string;
    address: object;
    owner: UserDtoList;
    comments: object[];
    budgets: BudgetsDtoList[];
    createdAt: Date;
}