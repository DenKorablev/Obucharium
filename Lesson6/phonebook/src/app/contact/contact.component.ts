import { Component, OnInit} from '@angular/core';
import { Person } from '../person';
import { ContactService } from '../contact.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  people: Person[];
  errors: string[] = [];

  constructor(private contactService: ContactService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => this.loadContact(params['term']));
    }

    loadContact(term: string): void {
      if(term) {
        this.contactService.searchContacts(term).subscribe(contacts=>this.people=contacts);
      } else {
        this.contactService.getContacts().subscribe(contacts=>this.people=contacts);
      }
    }

    onRemoveSelect(person: Person) {
        this.contactService.RemovePerson(person).subscribe(contact => {
          let cont = this.people.findIndex(c => c == person);
          this.people.splice(cont, 1);
        });
      }
}