import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../person';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, forkJoin } from 'rxjs';
import { Group } from '../group';
import { GroupService } from '../group.service';
import { PersonVm } from '../personVm';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})

export class PersonDetailComponent implements OnInit {

    errors: string[] = [];
    contactId: number;
    groups: Group[] = [];
    selectedGroup: Group;

    form = new FormGroup({
      name: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, this.phoneValidator]),
      town: new FormControl('', Validators.required),
      groupsSelect: new FormControl('')
    });

   constructor(
     private contactService: ContactService,
     private groupService: GroupService,
     private activatedRoute: ActivatedRoute,
     private location: Location,
     private router: Router) { }


    ngOnInit() {
      this.loadContact();
    }
  
    loadContact() {
      const id = +this.activatedRoute.snapshot.paramMap.get('id');
  
      this.contactService.getContact(id)
        .subscribe(contact => {
          if (contact === undefined) {
            this.router.navigate(['404']);
          } else {
            this.groupService.getGroups().subscribe(groups => {
              let groupsModel = [{
                id: -1,
                name: 'Not selected'
              }];
              groupsModel = groupsModel.concat(groups);
              let selectedGroup = groupsModel[0];
  
              let gn = '';
              if (contact.groupId) {
                const group = groupsModel.find(g => g.id === contact.groupId);
                if (group) {
                  gn = group.name;
                  selectedGroup = group;
                }
              }
  
              this.setContact(PersonVm.PersonCreater(contact, gn), groupsModel, selectedGroup);
            }
  
            );
          }
        },
          error => this.router.navigate(['404'])
        );
    }
  
    setContact(contact: PersonVm, groups: Group[], selectedGroup: Group) {
      this.contactId = contact.id;
      this.groups = groups;
      this.selectedGroup = selectedGroup;
      this.form.setValue({
        name: contact.name,
        phone: contact.phone,
        town: contact.town,
        groupsSelect: this.selectedGroup
      })
    }

    goBack() {
      this.location.back();
    }

    onSubmit() {
    const model = this.form.value;
    const contact: Person = {
      id: this.contactId,
      name: model.name,
      phone: model.phone,
      town: model.town,
      groupId: model.groupsSelect.id === -1 ? null : model.groupsSelect.id
    }
    this.contactService.updateContact(contact)
    .subscribe(() => this.goBack(), errors => {
      this.errors = errors.messages;
    });
  }

  phoneValidator(control: FormControl): {[s: string]: boolean} {
    if(!control.value || /^\d+$/.test(control.value)) {
      return null;
    }
    return {"phoneValidator": true};
  }
}
