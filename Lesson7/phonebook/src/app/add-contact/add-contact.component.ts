import { Component, OnInit} from '@angular/core';
import { Person } from '../person';
import { ContactService } from '../contact.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  errors: string[] = [];
  contactId: number;
  people: Person[];
  person: Person;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, this.phoneValidator]),
    town: new FormControl('', Validators.required)
  });

  constructor(
     private contactService: ContactService,
     private activeRoute: ActivatedRoute,
     private location: Location
    ) { }

  ngOnInit() {
      this.contactService.getContacts().subscribe(contacts => {
      this.people = contacts;
      this.person = new Person();
    })
  }

  setContact(contact: Person) {
    this.contactId = contact.id
    this.form.setValue({
      name: contact.name,
      phone: contact.phone,
      town: contact.town
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
      group: model.group
    }

  this.contactService.AddPerson(contact)
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