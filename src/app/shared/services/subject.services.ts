import {API} from './api';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { Course } from '../models';
import { FormBuilder } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})

export class SubjectService {

    constructor(
        private http: HttpClient,

    ){}

    getSubjects() : Observable<any> { //returns an observable which emitting/publishing the result of the get request
        return this.http.get(`${API.apiRoot}/subjectsData`);
    }

    getDegreeReq(): Observable<any>{
        return this.http.get(`${API.apiRoot}/degreeReq`);
    }

    ngOnInit(): void {
    }


}

