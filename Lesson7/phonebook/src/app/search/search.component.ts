import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private searchTerms = new Subject<string>();

  constructor(private router: Router) { }

  ngOnInit() {
    this.searchTerms.pipe(
      debounceTime(500),
      distinctUntilChanged())
      .subscribe(term => this.router.navigate(['contacts', term]));
  }

  search(term: string) {
    this.searchTerms.next(term);
  }
}
