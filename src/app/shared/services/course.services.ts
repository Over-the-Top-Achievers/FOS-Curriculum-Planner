import {API} from './api';
import {HttpClient} from '@angular/common/http';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { Course } from '../models';

@Injectable({
    providedIn: 'root'
})

export class CourseService {

    // public Courses:Array<Course> = [];
    // public courses$ = this.getCourses();

    constructor(
        private http: HttpClient,
    ){
    }

    // getCourses() : Array<Course> {
    //     let result:Array<Course> = [];
    //     this.http.get(`${API.apiRoot}/coursesData`).toPromise().then((response: any) => {
    //         result = response;
    //     });
    //     return result;
    // }

    getCourses() : Observable<any> { //returns an observable which emitting/publishing the result of the get request
        return this.http.get(`${API.apiRoot}/coursesData`);
    }

    ngOnInit(): void {
    //   this.Courses = this.getCourses();
    }
}

