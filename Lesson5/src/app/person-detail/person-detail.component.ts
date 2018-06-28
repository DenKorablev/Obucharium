import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../person';
import { ContactService } from '../contact.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})

export class PersonDetailComponent implements OnInit {

  person: Person;

  constructor(
     private contactService: ContactService,
     private activatedRoute: ActivatedRoute,
     private location: Location) { }

  ngOnInit() {
    this.loadContact();
  }

  loadContact() {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.person = id ? this.contactService.getContact(id) : new Person();
  }

  onAddNewPerson() {
    this.contactService.AddPerson(this.person.name, this.person.number, this.person.town);
  }

  onRemoveSelect(contact: Person) {
    this.contactService.RemovePerson(contact);
  }
    
  onNoSelect() {
    this.person.name = null;
    this.person.number = null;
    this.person.town = null;
  }

  goBack() {
    this.location.back();
  }
}
