import { Component, OnInit} from '@angular/core';
import { Person } from '../person';
import { ContactService } from '../contact.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, tap, finalize } from 'rxjs/operators';
import { MAX_LENGTH_VALIDATOR } from '@angular/forms/src/directives/validators';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  person: Person[];
  people: Observable<Person[]>;
  errors: string[] = [];
  isLoading: boolean = false;

  constructor(private contactService: ContactService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.people = this.activeRoute.params
    .pipe(
      tap(() => this.isLoading = true),
      switchMap(params => this.getContacts(params['term'])
      .pipe(finalize(() => this.isLoading = false))));
    }

    getContacts(term: string): Observable<Person[]> {
      if(term) {
       return this.contactService.searchContacts(term);
      } else {
        return this.contactService.getContacts();
      }
    }
    onRemoveSelect(person: number) {
      this.contactService.RemovePerson(person).subscribe(contact => {
        this.people = this.people.pipe(
            tap(persons => {

              let idx = persons.findIndex(c => c.id === contact.id);      
              persons.splice(idx, 1);   
            })
          ); 
      });
    }
}