import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import "node_modules/bootstrap/scss/bootstrap.scss"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule} from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularMaterialModule } from './angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './components/signin/signin.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { HttpClientModule,  HTTP_INTERCEPTORS } from '@angular/common/http';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatMenuModule} from '@angular/material/menu';
import { fakeBackendProvider } from './helpers';
import { JwtInterceptor, ErrorInterceptor } from './helpers';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { UserPageComponent } from './components/user-page/user-page.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewCourseComponent } from './components/view-course/view-course.component';
import { UserService } from './shared/services/user.services';
import { ApsCalculatorComponent } from './components/aps-calculator/aps-calculator.component';
import { OfferPageComponent } from './components/offer-page/offer-page.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AdminApsComponent } from './components/admin-aps/admin-aps.component';
import { AdminDegreeComponent } from './components/admin-degree/admin-degree.component';
import { DisclaimerDialogComponent } from './components/disclaimer-dialog/disclaimer-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    HomeComponent,
    AdminPageComponent,
    UserPageComponent,
    ViewCourseComponent,
    ApsCalculatorComponent,
    OfferPageComponent,
    AdminApsComponent,
    AdminDegreeComponent,
    DisclaimerDialogComponent,    
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatButtonModule,
    AngularMaterialModule,
    FormsModule, 
    ReactiveFormsModule,
    TextFieldModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    RouterModule,
    BrowserAnimationsModule,
    Ng2SmartTableModule,    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },     
    {provide: MatDialogRef,useValue: {}},
    { provide: MAT_DIALOG_DATA, useValue: [] },
    {provide:UserService},
    fakeBackendProvider,
    {provide: DisclaimerDialogComponent}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
