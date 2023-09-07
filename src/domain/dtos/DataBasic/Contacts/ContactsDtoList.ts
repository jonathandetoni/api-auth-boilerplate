import { DataBasicUsersDtoList } from "../DataBasicUsers/DataBasicUsersDtoList";

export type ContactsDtoList = {
    id: string;
    contactType: string;
    value: string;
    dataBasicUsers: DataBasicUsersDtoList;
    createdAt: Date;
    updatedAt: Date;
}