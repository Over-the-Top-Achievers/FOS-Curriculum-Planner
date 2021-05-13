import { ArrayType } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'
import "node_modules/bootstrap/scss/bootstrap.scss"
import {MatDialog} from '@angular/material/dialog';
import {MatDialogRef} from '@angular/material/dialog/dialog-ref';

import { CourseService } from 'src/app/shared/services/course.services';

import { Course } from 'src/app/shared/models';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  courses$ = this.courseService.getCourses$();//this is an observable


  checkoutForm = this.formbuilder.group({
    Course_Code:'',
    Course_Name:'',
    Credits:'',
    NQF:'',
    Slot:'',
    Semester:'',
    Year:'',
    Pre_requisite:'',
    Co_requisite:'',
  });

  constructor(
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private courseService: CourseService, //dependency injection
    private dialog: MatDialog,
    private http: HttpClient,
    private formbuilder:FormBuilder,
  ) { }

  ngOnInit(): void {
    
  }

  selectedCourse?: Course;
  displayCourseInfo(courseCode:any){
    this.selectedCourse = courseCode;
    //this.viewDetailsDialogRef = this.dialog.open(ViewCourseComponent, {data: this.selectedCourse});    
  }  
  close(){    
    console.log('Close button clicked');
    //this.router.navigate(['/admin-page']);
    window.location.reload();
  }
}
