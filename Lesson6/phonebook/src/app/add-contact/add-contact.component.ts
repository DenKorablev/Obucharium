import { Component, OnInit} from '@angular/core';
import { Person } from '../person';
import { ContactService } from '../contact.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  person: Person;
  people: Person[];
  errors: string[] = [];

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
      
  onNoSelect() {
      this.person.name = null;
      this.person.phone = null;
      this.person.town = null;
  }

  AddPerson() {
    debugger;
      this.contactService.AddPerson(this.person)
      .subscribe(() => this.goBack(), errors => {
        this.errors = errors.messages;
    });
  }
  
  goBack() {
      this.location.back();
  }
}