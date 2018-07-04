import { Component, OnInit} from '@angular/core';
import { Person } from '../person';
import { ContactService } from '../contact.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  person: Person[];
  people: Observable<Person[]>;
  errors: string[] = [];

  constructor(private contactService: ContactService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.people = this.activeRoute.params
    .pipe(switchMap(params => this.getContacts(params['term'])));
    }

    getContacts(term: string): Observable<Person[]> {
      if(term) {
       return this.contactService.searchContacts(term);
      } else {
        return this.contactService.getContacts();
      }
    }

    onRemoveSelect(person: Person) {
        this.contactService.RemovePerson(person).subscribe(contact => {
          let cont = this.person.findIndex(c => c == person);
          this.person.splice(cont, 1);
        });
      }
}