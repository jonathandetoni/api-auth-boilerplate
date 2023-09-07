import { DataBasicUsersDtoList } from "../../DataBasicUsers/DataBasicUsersDtoList";

export type ContactsDtoCreateResult = {
    id: string;
    contactType: string;
    value: string;
    dataBasicUsers: DataBasicUsersDtoList;
    createdAt: Date;  
}