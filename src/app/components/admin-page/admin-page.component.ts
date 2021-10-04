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
import { stringify } from '@angular/compiler/src/util';

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
  currentForm:string=""; // determines which forms to change
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
    Shareable:''
  });
  subscription: any;
  viewDetailsDialogRef!: MatDialogRef<unknown, any>;
  message: any;
  constructor(
    private router:Router,
    private activatedRoute:ActivatedRoute,
    public courseService: CourseService, //dependency injection
    private dialog: MatDialog,
    private http: HttpClient,
    private formbuilder:FormBuilder,
    public userService:UserService
    //private api: API
  ) { }
  populateUpdate(course:any){
    this.updateForm.get('Pre_requisite')!.enable();
    this.updateForm.get('Co_requisite')!.enable();
    delete course._id
    this.updateForm.setValue(course)
    // if(this.currentForm === '0'){
    //   this.updateForm.patchValue({[this.currentEdit]:this.currentReqHolder}) //changes the form value 
    //  }
    //  console.log(this.updateForm)
  }
  openCourseView(paramater:string):void{//opens the course viewer
    let selection:String[];
    let values: String ="";
    if(this.currentForm=='0' && this.currentEdit== "Pre_requisite") values = this.updateForm.value.Pre_requisite;
    else if(this.currentForm =='0' && this.currentEdit== "Co_requisite") values =  this.updateForm.value.Co_requisite;
    else if(this.currentForm =='1' && this.currentEdit== "Pre_requisite") values =  this.checkoutForm.value.Pre_requisite;
    else if(this.currentForm =='1' && this.currentEdit== "Co_requisite") values =  this.checkoutForm.value.Co_requisite;
    console.log('form content',values)
    values = values.replace("(",";");
    values = values.replace(")",";");
    selection = values.split(";")
    const message = JSON.stringify({year:paramater,selection:selection});
    this.subscription = this.userService.currentMessage.subscribe((message:any) => this.message = message)
    this.viewDetailsDialogRef = this.dialog.open(ViewCourseComponent);
    this.userService.changeMessage(message);
  }
  //change the form input to change
  setPreReqs(x:string):void{
    this.currentEdit="Pre_requisite"
    this.currentForm = x
    this.openCourseView('0')
  }
  setCoReqs(x:string):void {
    this.currentEdit="Co_requisite"
    this.currentForm = x
    this.openCourseView('0')
  }
  getCSV():any{
    this.csv$.subscribe((data) => { 
      this.downloadCSV(data);
      this.csvdata = data} 
      );
  }
  downloadCSV(data:Blob):HTMLElement{
    const blob: Blob = new Blob([data], { type: 'text/csv' });
    const fileName = 'budget.csv';
    const objectUrl: string = URL.createObjectURL(blob);
    const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
    a.id= "download"
    a.href = objectUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    // console.log(this.csvdata)
    return a;
  }

  ngOnInit(): void {
    
    this.courseService.getCourses().subscribe(
      data => {
        this.dataSource = data as Course[];
        // console.log(this.dataSource)
      }
    )


    //Turns the inputs grey
    // this.checkoutForm.get('Pre_requisite')!.disable();
    // this.checkoutForm.get('Co_requisite')!.disable();

    // this.updateForm.get('Pre_requisite')!.disable();
    // this.updateForm.get('Co_requisite')!.disable();

    this.userService.currentCourse.subscribe((message:any) => {
    
      //uses an observable because this happens async. changing this may lead to no changes due to value changing after expected
      message = message as Course[];
      this.currentReqHolder="";
      for(let i=0;i<message.length;i++){
       if(message[i].Course_Code){//Checks if valid entry
         this.currentReqHolder =this.currentReqHolder.concat(message[i].Course_Code+';')
       }
     }
     if(this.currentForm === '1'){
      this.checkoutForm.patchValue({[this.currentEdit]:this.currentReqHolder}) //changes the form value 
     }
     
     if(this.currentForm === '0'){
      let something =  this.updateForm.value.Course_Code
      this.updateForm.patchValue({[this.currentEdit]:this.currentReqHolder, Course_Code: something}) //changes the form value 
      console.log('hello', something)
     }

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
      this.http.delete('http://localhost:8080/courses', options).subscribe((s) => {

        this.refresh()
      });
      
    }    
  }

// this is for the adding course function
// using checkout form modules to record the user input. 
addCourse(): void {
  // Process checkout data here
  //this.items = this.courseService.clearCart();
  this.checkoutForm.get('Pre_requisite')!.enable();
  this.checkoutForm.get('Co_requisite')!.enable();

  if(this.checkoutForm.value.Course_Code === '' || this.checkoutForm.value.Course_Name === '' || this.checkoutForm.value.Year === '' || this.checkoutForm.value.NQF === '' || this.checkoutForm.value.Slot === '' || this.checkoutForm.value.Semester === ''){
    alert('please fill in required information')
    return;
  }
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
      Co_requisite:this.checkoutForm.value.Co_requisite,
      Shareable:this.checkoutForm.value.Shareable
    },
    
  };

  this.courseService.addCourse(options.body).subscribe((s) => {
    // console.log(s);
  });

  this.checkoutForm.reset();
}

  refresh(): void {
    window.location.reload();
}


  close(){    
    // console.log('Close button clicked');
    window.location.reload();
  }

  years: string[] = [
    'First year',
    'Second Year',
    'Third Year'
  ];


  applyFilter(event: any) {

    this.courseService.getCourses().subscribe(
       data => {
         let filteredData;
         if(this.selectedYear!='0'){
           filteredData = data.filter((t: any)=>t.Year ===this.selectedYear)
         }
         else{
           filteredData = data
         }
         
 
         this.dataSource = filteredData as Course[];
 
         this.dataSource = new MatTableDataSource(this.dataSource)
         let filterValue;
         if(event.target){
           filterValue = (event.target as HTMLInputElement).value;
         }else{
           filterValue =""
         }
         this.dataSource.filter = filterValue.trim().toLowerCase();
         // this.dataSource.Year.filter= this.selectedYear;
       }
     )
 
   }
   selectedYear?:string;
   displayYearCourse(year:string){
     if(year===this.years[0]){
       this.selectedYear= '1'
     }
     if(year===this.years[1]){
      this.selectedYear= '2'
    }
    if(year===this.years[2]){
      this.selectedYear= '3'
    }
    this.applyFilter("")
   }
 
   updateForm = this.formbuilder.group({
    Course_Code:'',
    Course_Name:'',
    Credits:'',
    NQF:'',
    Slot:'',
    Semester:'',
    Year:'',
    Pre_requisite:'',
    Co_requisite:'',
    Shareable:''
  });
  
  updateCourse():void{
    var body=
    {
      oldCourseCode:this.updateForm.value.Course_Code, //means never changes the course code right now 
      newCourseCode:this.updateForm.value.Course_Code,//but add one for field new name
      newCourseName:this.updateForm.value.Course_Name,
      newCred:this.updateForm.value.Credits,
      newNQF:this.updateForm.value.NQF,
      newSlot:this.updateForm.value.Slot,
      newSem:this.updateForm.value.Semester,
      newYear:this.updateForm.value.Year,
      newCoReq:(this.updateForm.value.Co_requisite),
      newPreReq:this.updateForm.value.Pre_requisite,
      newShareable:this.updateForm.value.Shareable
    };
    this.courseService.updateCourse(body);
    
    //this.updateForm.reset();
  }
}
