import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Group } from './group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private groupUrl= 'http://localhost:50822/api/PersonGroups';

  constructor(
    private logger: LoggerService,
    private http: HttpClient
  ) { }

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.groupUrl}`)
      .pipe(tap(groups => this.logger.debug(`get groups`)));
  }

  serachGroups(term: string): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.groupUrl}?term=${term}`)
    .pipe(tap(groups => this.logger.debug(`search groups`)));
  }

  getGroup(id: number): Observable<Group> {
    return this.http.get<Group>(`${this.groupUrl}/${id}`)
      .pipe(tap(_ => this.logger.debug(`group is loaded. id: ${id}`)));
  }

  updateGroup(group: Group): Observable<Object> {
    return this.http.put(`${this.groupUrl}/${group.id}`, group)
      .pipe(tap(_ => this.logger.debug(`group is updated`)));
  }
  
  RemoveGroup(group): Observable<any>  {
    return this.http.delete(`${this.groupUrl}/${group.id}`)
    .pipe(tap(_ => this.logger.debug(`group is updated`)));
  }

  AddGroup(group): Observable<any>  {
    return this.http.post(`${this.groupUrl}/${group.id}`, group)
    .pipe(tap(_ =>this.logger.debug(`add contact id=${group.id}`)));
  }
}
