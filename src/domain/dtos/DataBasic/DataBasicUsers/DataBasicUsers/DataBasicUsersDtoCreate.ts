import { AdressesDtoCreate } from "../Adresses/AdressesDtoCreate";
import { ContactsDtoCreate } from "../Contacts/ContactsDtoCreate";


export type DataBasicUsersDtoCreate = {
    id?: string;
    fullname: string;
    nickname?: string;
    birthdate?: string;
    addresses: AdressesDtoCreate;
    contacts: ContactsDtoCreate;
    userId: string;
}