import { StatusDemands } from "../../../../../infrastructure/utils/constants/statusDemands";

export type DemandsDtoCreate = {
    id?: string;
    name: string;
    description: string;
    status: StatusDemands;
    category: string;
    typeService: string;
    addressId: string;
    ownerId: string;
}