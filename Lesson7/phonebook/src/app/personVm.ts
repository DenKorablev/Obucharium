import { Person } from './person';

export class PersonVm extends Person {
    groupName: string;

    public static PersonCreater(person: Person, groupName: string): PersonVm {
        const pvm = new PersonVm();
        pvm.groupId = person.groupId;
        pvm.groupName = groupName;
        pvm.id = person.id;
        pvm.name = person.name;
        pvm.phone = person.phone;
        pvm.town= person.town;
        return pvm;
    }
}
