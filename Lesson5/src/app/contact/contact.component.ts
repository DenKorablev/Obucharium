import { Component, OnInit} from '@angular/core';
import { Person } from '../person';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  people: Person[];

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.loadContact();
    }

    loadContact():Person[] {
      this.people = this.contactService.getContacts();
      return this.people;
    }

    onRemoveSelect(person) {
      this.contactService.RemovePerson(person);
    }
}
