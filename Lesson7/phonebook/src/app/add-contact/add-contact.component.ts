import { Component, OnInit} from '@angular/core';
import { Person } from '../person';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Group } from '../group';
import { GroupService } from '../group.service';
import { forkJoin } from 'rxjs';
import { PersonVm } from '../personVm';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  contactId: number;
  groups: Group[] = [];
  selectGroup: Group;
  errors: string[] = [];

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, this.phoneValidator]),
    town: new FormControl('', Validators.required),
    groupsSelect: new FormControl('', Validators.required)
  });

  constructor(
    private contactService: ContactService,
    private groupService: GroupService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    forkJoin(
      this.contactService.getContacts(),
      this.groupService.getGroups()
    ).subscribe(
      ([contacts, groups]) => {
        let groupsModel = [{
          id: -1,
          name: 'Not selected'
        }];
        groupsModel = groupsModel.concat(groups);
        let selectedGroup = groupsModel[0];
        const newPerson: Person = {
          id: 0,
          name: '',
          phone: '',
          town: '',
          groupId: -1
        };

        this.setContact(PersonVm.PersonCreater(newPerson, ''), groupsModel, groupsModel[0]);
      }
    );
  }

  setContact(contact: PersonVm, groups: Group[], selectedGroup: Group) {
    this.contactId = contact.id;
    this.groups = groups;
    this.selectGroup = selectedGroup;
    this.form.setValue({
      name: contact.name,
      phone: contact.phone,
      town: contact.town,
      groupsSelect: this.selectGroup
    });
  }

  goBack() {
    this.location.back();
  }

  onSubmit() {
    debugger;
    const model = this.form.value;
    const contact: Person = {
      id: this.contactId,
      name: model.name,
      phone: model.phone,
      town: model.town,
      groupId: model.groupsSelect.id === -1 ? null : model.groupsSelect.id
    };
    this.contactService.AddPerson(contact)
    .subscribe(() => this.router.navigate(['contacts']), errors => {
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