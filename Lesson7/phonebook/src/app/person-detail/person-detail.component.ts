import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../person';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})

export class PersonDetailComponent implements OnInit {

    errors: string[] = [];
    contactId: number;
    contacts: Observable<Person[]>;

    form = new FormGroup({
      name: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, this.phoneValidator]),
      town: new FormControl('', Validators.required)
    });

   constructor(
     private contactService: ContactService,
     private activatedRoute: ActivatedRoute,
     private location: Location,
     private router: Router) { }

    ngOnInit() {
      this.loadContact();
    }

    loadContact() {
      const id = +this.activatedRoute.snapshot.paramMap.get('id');
      this.contactService.getContact(id).subscribe(contact =>
        this.setContact(contact),
        error => this.router.navigate(['404'])
      );
    }

    setContact(contact: Person) {
      this.contactId = contact.id
      this.form.setValue({
        name: contact.name,
        phone: contact.phone,
        town: contact.town,
        group: contact.group
      })
    }

    save(contact: Person) {
      this.contactService.updateContact(contact)
      .subscribe(() => this.goBack(), errors => {
        this.errors = errors.messages;
      });
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

    this.save(contact);
  }

  phoneValidator(control: FormControl): {[s: string]: boolean} {
    if(!control.value || /^\d+$/.test(control.value)) {
      return null;
    }
    return {"phoneValidator": true};
  }
}
