import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import { AppRoutingModule } from './/app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AboutComponent } from './about/about.component';
import { SearchComponent } from './search/search.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { GroupsComponent } from './groups/groups.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { AddGroupComponent } from './add-group/add-group.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    PersonDetailComponent,
    PageNotFoundComponent,
    AboutComponent,
    SearchComponent,
    AddContactComponent,
    GroupsComponent,
    GroupDetailComponent,
    AddGroupComponent,
  ],
  imports: [
    BrowserModule, FormsModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }