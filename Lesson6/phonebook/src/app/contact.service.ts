import { Injectable } from '@angular/core';
import { Person } from './person';
import { Contacts } from './fake-contacts';
import { LoggerService } from './logger.service';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  person: Person;
  private contactsUrl: string = 'http://localhost:50822/api/Contacts';

  constructor(private logger: LoggerService, private http: HttpClient) { }

  getContacts(): Observable<Person[]> {
    return this.http.get<Person[]>(this.contactsUrl)
    .pipe(tap(contacts=>this.logger.debug("get contacts")));
  }

  searchContacts(term: string): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.contactsUrl}?term=${term}`)
    .pipe(tap(contact =>this.logger.debug(`search contact`)));
  }

  getContact(id: number): Observable<Person> {
    return this.http.get<Person>(`${this.contactsUrl}/${id}`)
    .pipe(tap(contact =>this.logger.debug(`get contact id=${contact.id}`)));
  }

  updateContact(contact: Person): Observable<any> {
    return this.http.put(`${this.contactsUrl}/${contact.id}`, contact)
    .pipe(tap(_ =>this.logger.debug(`upadate contact id=${contact.id}`)),
    catchError(this.handlerUpdateError()));
  }

  handlerUpdateError() {
    return (error: any) => {
      this.logger.debug(error.message);
      debugger;
      let messages: string[] = [];
      if (error.error.ModelState) {
        for (var field in error.error.ModelState) {
          messages = messages.concat(error.error.ModelState[field]);
        }
      } else {
        messages.push(error.message);
      }

      return throwError ({
        messages: messages
      })
    }
  }

  AddPerson(contact): Observable<any>  {
    contact.id;
    return this.http.post(`${this.contactsUrl}/${contact.id}`, contact)
    .pipe(tap(_ =>this.logger.debug(`add contact id=${contact.id}`)),
    catchError(this.handlerUpdateError()));
  }

  RemovePerson(contact: Person): Observable<any>  {
      return this.http.delete(`${this.contactsUrl}/${contact.id}`);
    }
}