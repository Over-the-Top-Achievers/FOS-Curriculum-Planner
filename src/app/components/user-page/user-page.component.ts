import { ArrayType } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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

import {FormControl} from '@angular/forms';
import {ViewCourseComponent} from 'src/app/components/view-course/view-course.component';
import { UserService } from 'src/app/shared/services/user.services';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  viewDetailsDialogRef!: MatDialogRef<ViewCourseComponent>;
  message='yo';
  subscription: Subscription | undefined;
  year1Courses: Course[] = [];
  year2Courses:Course[] = [];
  year3Courses:Course[]= [];

  constructor(private dialog:MatDialog,private userService:UserService){
    
  }
  ngOnInit(): void {
    this.userService.currentCourse.subscribe((message:any) => {
    
    if(message.Year =="1"){
      this.year1Courses.push(message);

    }
    console.log(this.year1Courses)
    })
  }
  openCourseView(year:string):void{

    this.subscription = this.userService.currentMessage.subscribe((message:any) => this.message = message)
    this.viewDetailsDialogRef = this.dialog.open(ViewCourseComponent);
    this.newMessage(year);
  }
  newMessage(message:string) {
    this.userService.changeMessage(message)
  }
  majors: string[] = [
    'Computer Science Major I', 'Mathematics Major I', 'Physics Major I', 'Computational and Applied Mathematics Major I'
  ]
  
}
