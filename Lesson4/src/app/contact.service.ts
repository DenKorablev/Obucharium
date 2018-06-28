import { Injectable } from '@angular/core';
import { Person } from './person';
import { Contacts } from './fake-contacts';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor() { }

  getContacts(): Person[] {
    return Contacts;
  }
}
