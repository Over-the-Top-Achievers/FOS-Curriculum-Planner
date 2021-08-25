import { Component, Directive } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services';

@Directive({})
export class ComponentBase {
    currentUser: any;

    public constructor(
        protected router: Router,
        protected activatedRoute: ActivatedRoute,
        protected authenticationService: AuthenticationService
    ){
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    public get isLoggedIn() {
        return !(this.authenticationService.currentUserValue == null || JSON.stringify(this.authenticationService.currentUserValue) === JSON.stringify({}));
    }

}