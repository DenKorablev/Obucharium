import { Component, OnInit} from '@angular/core';
import { Person } from '../person';
import { ContactService } from '../contact.service';
import { ActivatedRoute } from '@angular/router';
import {  Observable, forkJoin, of } from 'rxjs';
import { switchMap, tap, map, finalize } from 'rxjs/operators';
import { PersonVm } from '../personVm';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  people: Observable<PersonVm[]>;
  isLoading: boolean = false;
  contacts: PersonVm[];

  constructor(
    private contactService: ContactService, 
    private activeRoute: ActivatedRoute,
    private groupService: GroupService
  ) { }

  ngOnInit() {
    this.people = this.activeRoute.params
    .pipe(
      tap(() => this.isLoading = true),
      switchMap(params => this.getContacts(params['term'])
      .pipe(finalize(() => this.isLoading = false))));
    }

    getContacts(term: string): Observable<PersonVm[]> {
      let getContacts: Observable<Person[]>;
  
      if (term) {
        getContacts = this.contactService.searchContacts(term);
      } else {
        getContacts = this.contactService.getContacts();
      }
  
      return forkJoin(
        getContacts,
        this.groupService.getGroups()
      ).pipe(
        map(([contacts, groups]) => {
          const result: PersonVm[] = [];
          contacts.forEach(c => {
            let groupName = '';
            if (c.groupId) {
              const group = groups.find(g => g.id === c.groupId);
              if(group) {
                groupName = group.name;
              }
            }
            result.push(PersonVm.PersonCreater(c, groupName));
          });
          return result;
        })
      );
    }

  onRemoveSelect(person) {
    this.contactService.RemovePerson(person).
      subscribe(contacts => {
        this.people = this.people.pipe(
          tap(contact => {
            let x = contact.find(c => c.id === contacts.id);
            const index = contact.indexOf(x);
            if (index > -1) {
              contact.splice(index, 1);
            }
          })
        );
      });
  }
}

