import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import {HomeComponent} from './components/home/home.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import "node_modules/bootstrap/scss/bootstrap.scss"
import { AuthGuard } from './services/auth-gaurd.service';
import { UserPageComponent } from './components/user-page/user-page.component';
import { ApsCalculatorComponent } from './components/aps-calculator/aps-calculator.component';
import { AdminApsComponent } from './components/admin-aps/admin-aps.component';
import { AdminDegreeComponent } from './admin-degree/admin-degree.component';

const routes: Routes = [
  {path: 'home', pathMatch: 'full',component: HomeComponent},  
  {path: 'admin-page',pathMatch: 'full', component: AdminPageComponent,canActivate:[AuthGuard]},
  { path: 'signin',pathMatch: 'full', component: SigninComponent},
  {path:'user-page',pathMatch: 'full',component:UserPageComponent},
  { path:'aps-calculator', pathMatch: 'full', component:ApsCalculatorComponent},
  {path:'admin-aps', pathMatch:'full', component:AdminApsComponent},
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  {path: 'admin-degree', pathMatch: 'full', component:AdminDegreeComponent},
  
  //otherwise redirect to home page
  {path: '**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{enableTracing:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
