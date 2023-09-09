import { StatusDemands } from "../../../../../../infrastructure/utils/constants/statusDemands";

export type DemandsDtoCreateResult = {
    id: string;
    name: string;
    description: string;
    status: StatusDemands;
    category: string;
    typeService: string;
    addressId: string;
    ownerId: string;
    createdAt: Date;  
}