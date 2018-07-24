import { Component, OnInit} from '@angular/core';
import { Location } from '@angular/common'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Group } from '../group';
import { GroupService } from '../group.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {
  
  gr: Group;
  errors: string[] = [];

  form = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  constructor(
    private groupService: GroupService,
    private router: Router
  ) { }

  ngOnInit() {
    this.groupService.getGroups().subscribe(groups => {
      this.gr= new Group();
    });
  }

  onSubmit() {
    const model = this.form.value;
    const group: Group = {
      id: 0,
      name: model.name
    };

    this.groupService.AddGroup(group)
      .subscribe(() => this.router.navigate(['groups']), 
      errors => this.errors = errors.messages);
  }
}