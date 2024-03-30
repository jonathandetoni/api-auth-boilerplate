import { DataBasicUsersDtoList } from "../DataBasicUsers/DataBasicUsersDtoList";

export type AdressesDtoList = {
    id: string;
    dataBasicUsers: DataBasicUsersDtoList;
    createdAt: Date;
    updatedAt: Date;
}