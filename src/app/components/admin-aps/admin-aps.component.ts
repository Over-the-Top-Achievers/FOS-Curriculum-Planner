import { ArrayType } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'
import "node_modules/bootstrap/scss/bootstrap.scss"
import {MatDialog} from '@angular/material/dialog';
import {MatDialogRef} from '@angular/material/dialog/dialog-ref';
import {API} from '../../shared/services/api'
import { CourseService } from 'src/app/shared/services/course.services';
import {MatTableDataSource} from '@angular/material/table';
import { Subject } from 'src/app/shared/models';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.services';
import { ViewCourseComponent } from '../view-course/view-course.component';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-admin-aps',
  templateUrl: './admin-aps.component.html',
  styleUrls: ['./admin-aps.component.scss']
})
export class AdminApsComponent implements OnInit {
  data: Subject[] = [];
  dataSource: any = [];
  sujects$ = this.courseService.getSubject();
  

  constructor(
    private router:Router,
    private activatedRoute:ActivatedRoute,
    public courseService: CourseService, //dependency injection
    private dialog: MatDialog,
    private http: HttpClient,
    private formbuilder:FormBuilder,
    public userService:UserService
  ) { }

  ngOnInit(): void {
    this.courseService.getSubject().subscribe(
      data => {
        this.dataSource = data as [];
        console.log(this.dataSource.length)
        // console.log(this.dataSource[1]['Subject']) way to reference the particular attribute
      }
    )
  }

  subjectToEdit? : Subject;

}
