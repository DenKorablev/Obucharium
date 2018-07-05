import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
import { ContactComponent } from './contact/contact.component';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AboutComponent } from './about/about.component';
import { AddContactComponent } from './add-contact/add-contact.component';

const routes: Routes = [
  { path: '', redirectTo: '/contacts', pathMatch: 'full' },
  { path: 'contacts', component: ContactComponent },
  { path: 'contacts/:term', component: ContactComponent },
  { path: 'detail/:id', component: PersonDetailComponent },
  { path: 'add', component: AddContactComponent },
  { path: 'about', component: AboutComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '404', pathMatch: 'full' },
];

@NgModule({
  exports:[RouterModule],
  imports:[RouterModule.forRoot(routes)],
  declarations: []
})
export class AppRoutingModule { }
