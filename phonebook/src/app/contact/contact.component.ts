import { Component, OnInit} from '@angular/core';
import { Person } from '../person';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  people: Person[] = [
    {name:'Dima', number:'89207779988', town:'Moscow'},
    {name:'Masha', number:'89153241122', town:'Pskov'},
    {name:'Oleg', number:'89127779388', town:'St.Peterburg'},
  ];

  selectedPerson: Person;

  constructor() { }

  ngOnInit() {
    }
    onSelect(person: Person) {
      this.selectedPerson = person;
    }

    onRemoveSelect(peopleIndex: number) {
        this.people.splice(peopleIndex, 1);
        this.selectedPerson = null;
    }
}
