import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DisplayComponent } from './display/display.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { QuoteComponent } from './quote/quote.component';
import { AddquotesComponent } from './addquotes/addquotes.component';
// import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  { path: 'new', component: AddComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: '', component: DisplayComponent },
  { path: 'quotes/:id', component: QuoteComponent },
  { path: 'write/:id', component: AddquotesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
