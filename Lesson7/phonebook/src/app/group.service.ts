import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Group } from './group';


@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private apiBaseUrl = 'http://localhost:17023/api/groups';

  constructor(
    private logger: LoggerService,
    private http: HttpClient
  ) { }

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.apiBaseUrl}`)
      .pipe(
        tap(groups =>
          this.logger.debug(`groups are loaded. Count: ${groups.length}.`)
        ),
      );
  }

  serachGroups(term: string): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.apiBaseUrl}?term=${term}`)
      .pipe(
        tap(groups =>
          this.logger.debug(`search groups. Found: ${groups.length}.`)
        ),
      );
  }

  getGroup(id: number): Observable<Group> {
    return this.http.get<Group>(`${this.apiBaseUrl}/${id}`)
      .pipe(
        tap(_ =>
          this.logger.debug(`group is loaded. id: ${id}`)
        ),
      );
  }

  updateGroup(group: Group): Observable<Object> {
    return this.http.put(`${this.apiBaseUrl}/${group.id}`, group)
      .pipe(
        tap(_ =>
          this.logger.debug(`group is updated. id: ${group.id}`)
        ),
      );
  }

  createGroup(group: Group): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/${group.id}`, group)
      .pipe(
        tap(_ =>
          this.logger.debug(`group is created. id: ${group.id}`)
        ),
      );
  }

  deleteGroup(groupId: number): Observable<Object> {
    return this.http.delete(`${this.apiBaseUrl}/${groupId}`)
    .pipe(
      tap(_ =>
        this.logger.debug(`group is deleted. id: ${groupId}`)
      ),
    );
  }


}