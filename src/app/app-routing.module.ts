import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import {HomeComponent} from './components/home/home.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import "node_modules/bootstrap/scss/bootstrap.scss"

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  { path: 'signin', component: SigninComponent},
  {path: 'admin-page', component: AdminPageComponent},
  { path: '', pathMatch: 'full', redirectTo: '/home' },

  //otherwise redirect to home page
  {path: '**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
