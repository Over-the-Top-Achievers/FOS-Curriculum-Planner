import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Course } from 'src/app/shared/models';
import { CourseService } from 'src/app/shared/services/course.services';

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.scss']
})
export class ViewCourseComponent implements OnInit {
  dataSource: any;
  displayedColumns: string[] = ['Course_Code', 'Course_Name', 'Credits', 'NQF', 'Slot',
  'Semester','Year', 'Co_requisite', 'Pre_requisite'];
  http: any;
  yearCourses: any;
  dataSource2: any;
  years: string[] = ['1','2','3'];

  constructor(@Inject(MAT_DIALOG_DATA) public parentData: any,
    public dialogRef: MatDialogRef<ViewCourseComponent>,private courseService:CourseService) {}

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

  applyFilter(event: Event) {

   this.courseService.getCourses().subscribe(
      data => {
        this.dataSource = data as Course[];


        this.dataSource = new MatTableDataSource(this.dataSource)
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

      }
    )

}
selectedYear?:string
displayYearCourse(year: string){
  
  this.courseService.getCourses().subscribe(
    (    data: any) => {

      console.log(data)

      this.dataSource = data as Course[];
      this.dataSource2 = data as Course[];

      this.selectedYear = year
      this.yearCourses = []
      if(this.selectedYear === this.years[0]){
        for(var i = 0; i < (this.dataSource2).length; i++){
          if(this.dataSource2[i].Year === '1'){
            this.yearCourses.push(this.dataSource2[i]);
          }
        } 
      }

      if(this.selectedYear === this.years[1]){
        for(var i = 0; i < (this.dataSource2).length; i++){
          if(this.dataSource2[i].Year === '2'){
            this.yearCourses.push(this.dataSource2[i]);
          }
        } 
      }

      if(this.selectedYear === this.years[2]){
        for(var i = 0; i < (this.dataSource2).length; i++){
          if(this.dataSource2[i].Year === '3'){
            this.yearCourses.push(this.dataSource2[i]);
          }
        } 
      }

      this.yearCourses = new MatTableDataSource(this.yearCourses)
      this.dataSource = this.yearCourses;

      console.log(this.yearCourses)

    }
  )
}
}
