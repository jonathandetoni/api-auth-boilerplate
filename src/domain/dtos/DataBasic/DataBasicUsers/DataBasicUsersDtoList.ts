import { UserDtoList } from "../User/UserDtoList";

export type DataBasicUsersDtoList = {
    id: string;
    fullname: string;
    nickname?: string;
    birthdate?: string;
    address: object;
    contacts: object;
    user: UserDtoList;
    createdAt: Date;
    updatedAt: Date;
}