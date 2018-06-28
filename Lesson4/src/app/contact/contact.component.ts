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

  selectedPerson: Person;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.loadContact();
    }

    loadContact():void {
      this.people = this.contactService.getContacts();
    }

    onSelect(person: Person) {
      this.selectedPerson = person;
    }

    onRemoveSelect(peopleIndex: number) {
        this.people.splice(peopleIndex, 1);
        this.selectedPerson = null;
    }
}
