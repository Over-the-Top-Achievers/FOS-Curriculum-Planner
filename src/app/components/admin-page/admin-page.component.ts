import { ArrayType } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'
import "node_modules/bootstrap/scss/bootstrap.scss"
import {MatDialog} from '@angular/material/dialog';
import {MatDialogRef} from '@angular/material/dialog/dialog-ref'
import { CourseService } from 'src/app/shared/services/course.services';
import { Course } from 'src/app/shared/models';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {

  courses$ = this.courseService.getCourses();//this is an observable

  constructor(
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private courseService: CourseService, //dependency injection
    private dialog: MatDialog,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    
  }

  selectedCourse?: Course;
  displayCourseInfo(courseCode:any){
    this.selectedCourse = courseCode;
    //this.viewDetailsDialogRef = this.dialog.open(ViewCourseComponent, {data: this.selectedCourse});    
  }


  

  courseToDelete?: Course;
  deleteCourse(courseCode?:any){
    this.courseToDelete = courseCode;
    if (courseCode === undefined){
      throw new Error("No course to delete");
    }
    
    else{
      var options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body: {courseCode:courseCode.Course_Code},
      };

      console.log(courseCode);      
      //delete stuff here 
      console.log(courseCode.Course_Code);
      this.http.request('DELETE','http://localhost:8080/courses', options).subscribe((s) => {
        console.log(s);
      });
      
    }    
  }
}
