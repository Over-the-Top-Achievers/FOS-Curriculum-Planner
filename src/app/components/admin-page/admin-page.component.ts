import { ArrayType } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import "node_modules/bootstrap/scss/bootstrap.scss"
import { Course } from 'src/app/shared/models';
import { CourseService } from 'src/app/shared/services/course.services';
@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {

  courses$ = this.courseService.getCourses();//this is an observable

  constructor(
    private courseService: CourseService //dependency injection
  ) { }

  ngOnInit(): void {
    
  }
}
