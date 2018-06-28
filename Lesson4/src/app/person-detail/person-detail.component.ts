import { Component, OnInit, Input } from '@angular/core';
import { ContactComponent } from '../contact/contact.component';
import { Person } from '../person';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})

export class PersonDetailComponent implements OnInit {
  name: string;
  number: string;
  town: string;

  @Input() person: Person;

  constructor(private contact: ContactComponent) { }

  ngOnInit() {
  }
    
  onNoSelect() {
    this.person = null;
    this.name = null;
    this.number = null;
    this.town = null;
  }

  onAddNewPerson(name: string, number: string, town: string) {
    this.contact.people.push({name: name, number: number, town: town});
  }
}
