import {API} from './api';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { Course } from '../models';
import { FormBuilder } from '@angular/forms';

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
    addCourse(data:any): Observable<any>{
        return this.http.post(`${API.apiRoot}/courses`,data);
    }
    getCSV() : Observable<any> {
        return this.http.get(`${API.apiRoot}/coursesCSV`);
    }
    ngOnInit(): void {
    //   this.Courses = this.getCourses();
    }
    updateCourse(body:any): void{     
        var options = {
             headers: new HttpHeaders({
                 'Content-Type': 'application/json',
                }),
                body: body,
                
            };
        console.log(options.body);
        this.http.put(`${API.apiRoot}/courses`, options.body).subscribe((s) => {},(err)=> console.log(err));
    }

    // gets the high school subject courses
    getSubject(): Observable<any>{
        return this.http.get(`${API.apiRoot}/subjectsData`);
    }

    getDegree(): Observable<any>{
        return this.http.get(`${API.apiRoot}/degreeReq`);
    }

    updateAPS(body:any): void{     
        var options = {
             headers: new HttpHeaders({
                 'Content-Type': 'application/json',
                }),
                body: body,
                
            };
        console.log(options.body);
        this.http.put(`${API.apiRoot}/updateAPS`, options.body).subscribe((s) => {},(err)=> console.log(err));
    }

    updateDegree(body:any): void{     
        var options = {
             headers: new HttpHeaders({
                 'Content-Type': 'application/json',
                }),
                body: body,
                
            };
        console.log(options.body);
        this.http.put(`${API.apiRoot}/updateReq`, options.body).subscribe((s) => {},(err)=> console.log(err));
    }
}

