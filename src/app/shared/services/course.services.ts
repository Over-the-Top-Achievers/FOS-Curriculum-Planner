import {API} from './api';
import {HttpClient} from '@angular/common/http';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { Course } from '../models';
import { FormBuilder } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
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

 
    addCourse(body:any): void{     
    var options = {
         headers: new HttpHeaders({
             'Content-Type': 'application/json',
            }),
            body: body,
        };
    this.http.post(`${API.apiRoot}/courses`, options.body).subscribe((s) => { console.log(s)},(err)=> console.log(err));
    }
    updateCourse(body:any): void{     
        var options = {
             headers: new HttpHeaders({
                 'Content-Type': 'application/json',
                }),
                body: body,
            };
        console.log(options);
        this.http.put(`${API.apiRoot}/courses`, options.body).subscribe((s) => {},(err)=> console.log(err));
       }
    getCourses$() : Observable<any> { //observable for NgFor async pipe
        return this.http.get(`${API.apiRoot}/coursesData`)
    }
    getCourses() : any {
        return this.http.get(`${API.apiRoot}/coursesData`).subscribe((data:any)=>{
            console.log(data);
            return data;
        },(err:any)=>{
            console.log(err);
            return;
        }
        );
    }
    getCSV$() :  Observable<any> {
        
        return this.http.get(`${API.apiRoot}/coursesCSV`);
    }
    getCSV() : any {
        var csv;
         this.http.get(`${API.apiRoot}/coursesCSV`).subscribe((data:any)=>{
            console.log(data);
            csv=data;
            return csv;
        }
        )
        
    }
    deleteCourse(name : String):any{
        var options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            }),
            body: {courseCode:name},
          };
        return this.http.delete(`${API.apiRoot}/courses`,options).subscribe((s)=>  {
            console.log(s);
        })
    } 
    ngOnInit(): void {
    //   this.Courses = this.getCourses();
    }

}

