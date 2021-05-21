import { ArrayType } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'
import "node_modules/bootstrap/scss/bootstrap.scss"
import {MatDialog} from '@angular/material/dialog';
import {MatDialogRef} from '@angular/material/dialog/dialog-ref';
import {API} from '../../shared/services/api'
import { CourseService } from 'src/app/shared/services/course.services';
import {MatTableDataSource} from '@angular/material/table';
import { Course } from 'src/app/shared/models';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.services';
import { ViewCourseComponent } from '../view-course/view-course.component';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {

  displayedColumns: string[] = ['Course_Code', 'Course_Name', 'Credits', 'NQF', 'Slot',
                                        'Semester','Year', 'Co_requisite', 'Pre_requisite'];
  dataSource: any = [];
  dataSource2: any = [];
  yearCourses: any = [];

  data: Course[] = [];
  courses$ = this.courseService.getCourses();//this is an observable
  csv$ = this.courseService.getCSV();
  csvdata :string | undefined;
  items = this.courseService.getCourses();
 

  currentReqHolder:string ="";//holds the actual COMS;APPM kinds of values
  currentEdit:string="";// holds Pre_requisite or Co_requisite for editing
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
  subscription: any;
  viewDetailsDialogRef!: MatDialogRef<unknown, any>;
  message: any;
  constructor(
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private courseService: CourseService, //dependency injection
    private dialog: MatDialog,
    private http: HttpClient,
    private formbuilder:FormBuilder,
    private userService:UserService
    //private api: API
  ) { }

  openCourseView(paramater:string):void{//opens the course viewer

    this.subscription = this.userService.currentMessage.subscribe((message:any) => this.message = message)
    this.viewDetailsDialogRef = this.dialog.open(ViewCourseComponent);
    this.userService.changeMessage(paramater);
  }
  //change the form input to change
  setPreReqs():void{
    this.openCourseView('0')
    this.currentEdit="Pre_requisite"
  }
  setCoReqs():void {
    this.openCourseView('0')
    this.currentEdit="Co_requisite"
  }
  getCSV():any{
    this.csv$.subscribe((data) => { 
      this.downloadCSV(data);
      this.csvdata = data} 
      );
  }
  downloadCSV(data:Blob):void {
    const blob: Blob = new Blob([data], { type: 'text/csv' });
    const fileName = 'budget.csv';
    const objectUrl: string = URL.createObjectURL(blob);
    const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;

    a.href = objectUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();

    console.log(this.csvdata)
  }

  ngOnInit(): void {
    
    this.courseService.getCourses().subscribe(
      data => {
        this.dataSource = data as Course[];
        console.log(this.dataSource)
      }
    )


    //Turns the inputs grey
    this.checkoutForm.get('Pre_requisite')!.disable();
    this.checkoutForm.get('Co_requisite')!.disable();
    this.userService.currentCourse.subscribe((message:any) => {
    
      //uses an observable because this happens async. changing this may lead to no changes due to value changing after expected
      message = message as Course[];
      this.currentReqHolder="";
      for(let i=0;i<message.length;i++){
       if(message[i].Course_Code){//Checks if valid entry
         this.currentReqHolder =this.currentReqHolder.concat(message[i].Course_Code+';')
       }
     }
     this.checkoutForm.patchValue({[this.currentEdit]:this.currentReqHolder}) //changes the form value 

      })
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

     
      //delete stuff here 
      console.log(courseCode.Course_Code);
      this.http.delete('http://localhost:8080/courses', options).subscribe((s) => {
        console.log(s);
        this.refresh()
      });
      
    }    
  }

// this is for the adding course function
// using checkout form modules to record the user input. 
addCourse(): void {
  // Process checkout data here
  //this.items = this.courseService.clearCart();
  // this.checkoutForm.get('Pre_requisite')!.enable();
  // this.checkoutForm.get('Co_requisite')!.enable();
  console.warn('Course is being added to the database.', this.checkoutForm.value);

  var options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    body: {Course_Code:this.checkoutForm.value.Course_Code,
      Course_Name:this.checkoutForm.value.Course_Name,
      Credits:this.checkoutForm.value.Credits,
      NQF:this.checkoutForm.value.NQF,
      Slot:this.checkoutForm.value.Slot,
      Semester:this.checkoutForm.value.Semester,
      Year:this.checkoutForm.value.Year,
      Pre_requisite:this.checkoutForm.value.Pre_requisite,
      Co_requisite:this.checkoutForm.value.Co_requisite
    },
    
  };

  this.courseService.addCourse(options.body).subscribe((s) => {
    console.log(s);
  });

  this.checkoutForm.reset();
}

  refresh(): void {
    window.location.reload();
}


  close(){    
    console.log('Close button clicked');
    window.location.reload();
  }

  years: string[] = [
    'First year',
    'Second Year',
    'Third Year'
  ];

  
  applyFilter(event: Event) {
    //this.dataSource = new MatTableDataSource(this.dataSource)
    this.courseService.getCourses().subscribe(
      data => {
        this.dataSource = data as Course[];
        //this.dataSource2 = data as Course[];

        this.dataSource = new MatTableDataSource(this.dataSource)
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

      }
    )
    
    //console.log(this.dataSource[0].Course_Code)
  }

  selectedYear?:string
  displayYearCourse(year: string){
    
    this.courseService.getCourses().subscribe(
      data => {
        console.log(this.yearCourses.length)

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
