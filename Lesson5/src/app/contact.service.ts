import { Injectable } from '@angular/core';
import { Person } from './person';
import { Contacts } from './fake-contacts';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private logger: LoggerService) { }

  getContacts(): Person[] {
    this.logger.debug("contacts are loading");
    return Contacts;
  }

  getContact(id: number): Person {
    return Contacts.find(c => c.id == id);
  }

  AddPerson(name: string, number: string, town: string) {
    var ID: number =  Math.round(Math.random() * 100);
    Contacts.push({id: ID , name: name, number: number, town: town});
  }

  RemovePerson(contact: Person) {
    let index = Contacts.findIndex(c => c == contact);
    Contacts.splice(index, 1);
  }
}
