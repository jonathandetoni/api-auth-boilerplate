import { DataBasicUsersDtoList } from "../../DataBasicUsers/DataBasicUsersDtoList";

export type AdressesDtoCreateResult = {
    id: string;
    dataBasicUsers: DataBasicUsersDtoList;
    createdAt: Date;  
}