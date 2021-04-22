import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import {HomeComponent} from './components/home/home.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import "node_modules/bootstrap/scss/bootstrap.scss"
import { AuthGuard } from './services/auth-gaurd.service';

const routes: Routes = [
  {path: 'home', component: HomeComponent},  
  {path: 'admin-page', component: AdminPageComponent,canActivate:[AuthGuard]},
  { path: 'signin', component: SigninComponent},
  { path: '', pathMatch: 'full', redirectTo: '/home' },

  //otherwise redirect to home page
  {path: '**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
