import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from '../group';
import { GroupService } from '../group.service';
import { Observable } from 'rxjs';
import { tap, switchMap, finalize } from 'rxjs/operators';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  groups: Observable<Group[]>;

  isLoading = false;

  constructor(
    private contactService: ContactService,
    private groupService: GroupService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.groups = this.activatedRoute
      .params
      .pipe(
        tap(() => this.isLoading = true),
        switchMap(params => this.loadGroups(params['term'])
          .pipe(
            finalize(() => this.isLoading = false)
          )
        )
      );

    this.activatedRoute.params.subscribe(params => this.loadGroups(params['term']));
  }

  loadGroups(term: string): Observable<Group[]> {
    let getGroups: Observable<Group[]>;
    if (term) {
      getGroups = this.groupService.serachGroups(term);
    } else {
      getGroups = this.groupService.getGroups();
    }
    return getGroups;
  }

  onRemoveGroup(group) {
    this.groupService.RemoveGroup(group).
      subscribe(contacts => {
        this.groups = this.groups.pipe(
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
