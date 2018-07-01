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

    loadContact(): void {
//      this.people = this.contactService.getContacts();
      this.contactService.getContacts().subscribe(contacts=>this.people=contacts);
    }

    onRemoveSelect(person) {
      this.contactService.RemovePerson(person);
    }
}
