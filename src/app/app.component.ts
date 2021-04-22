/*import { Component } from '@angular/core';
import { FlexAlignStyleBuilder } from '@angular/flex-layout';
import "node_modules/bootstrap/scss/bootstrap.scss"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  
}*/

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FlexAlignStyleBuilder } from '@angular/flex-layout';
import "node_modules/bootstrap/scss/bootstrap.scss"
import { AuthenticationService } from './services';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: any;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/home']);
    }
}