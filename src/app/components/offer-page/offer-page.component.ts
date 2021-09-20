import { Component, OnInit } from '@angular/core';
import { LocalDataSource, Ng2SmartTableModule } from 'ng2-smart-table';
import { SubjectService } from 'src/app/shared/services/subject.services';
import { Subject } from 'src/app/shared/models';
import { DegreeRequirement } from 'src/app/shared/models';
import { DisclaimerDialogComponent } from '../disclaimer-dialog/disclaimer-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DisclaimerService } from 'src/app/shared/services/disclaimer.service';

@Component({
  selector: 'app-offer-page',
  templateUrl: './offer-page.component.html',
  styleUrls: ['./offer-page.component.scss'],
})

export class OfferPageComponent implements OnInit {
  

  constructor(
    private dialog:MatDialog,
    public subjectService: SubjectService,
    public disclaimer: DisclaimerDialogComponent,
    public viewDialog: DisclaimerService
  ) { }  


  initSubjectSelection(){
    this.subjectService.getSubjects().subscribe(
      data => {
        this.data = data as Subject[];
        //console.log(this.data && this.data.map((grp) => {return {'value': grp.Subject, 'title': grp.Subject}}));
        this.subjectSelection = this.data.map((grp) => {return {'value': grp.Subject, 'title': grp.Subject}}); 
        this.settings.columns.Subject.editor.config.list = this.subjectSelection;
        this.settings = Object.assign({},this.settings);   

        // setInterval(()=> { this.updateQualifiedCoursese()}, 3 * 1000);
        setInterval(()=> { this.addAPS()}, 1 * 1000);
        setInterval(()=> { this.updateOffers()}, 1 * 1000);
      }
    )
  }

  initDegreeReqs(){
    this.subjectService.getDegreeReq().subscribe(
      data => {
        this.degreeReqs = data as DegreeRequirement[];
        this.qualifiedCoursesIII = new LocalDataSource();
        for(let i =0 ;i<this.degreeReqs.length;i++)
        {
          this.offerList.push({Degree_Name:this.degreeReqs[i].Degree_Name,Offer:"Reject"});
        }
        this.qualifiedCoursesIII.load(this.offerList);
        this.qualifiedCoursesIII.refresh();
      }
    )
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.viewDialog.openDialog();
    }, 1);
    //this.disclaimer.openDialog();
    this.initSubjectSelection();
    this.initDegreeReqs();
    
    // this.dataSource = [
    //   {Subject:"Mathematics",Mark:"65",APS:"42"},
    //   {Subject:"Mathematics",Mark:"65",APS:""},
    //   {Subject:"Mathematics",Mark:"65",APS:""},
    //   {Subject:"Mathematics",Mark:"65",APS:""},
    // ]
 
  }

  add(event: any){

    this.subjectSelection = this.subjectSelection.filter((a: any) => {
      return (a.value !== event.newData.Subject)
    })
    this.settings.columns.Subject.editor.config.list = this.subjectSelection;
    this.settings = Object.assign({},this.settings);  

    let numberOfSubjects = this.dataSource.length;
    if (numberOfSubjects < 7)
    {       
      event.newData.APS = this.getAPS(event.newData.Subject, event.newData.Mark);         
      event.confirm.resolve(event.newData);
      numberOfSubjects += 1;
    }
    else
    {
      alert('Only 7 subjects required for APS calculation');
    }    
  }


  updateOffers()
  {
    for(let i=0;i<this.degreeReqs.length;i++)
    {
      // console.log(this.getOffer(this.degreeReqs[i]))
      this.offerList[i].Offer = this.getOffer(this.degreeReqs[i]);
    }
    
    this.qualifiedCoursesIII.load(this.offerList);
    this.qualifiedCoursesIII.refresh();
  }
  getOfferAPS(course:DegreeRequirement):number //0 reject 1 wait 2 firm
  {
    //console.log(course);
    let firm = Number(course.Firm_Offer.split(";")[3]);
    //let waitlist = Number(course.Waitlist.split(";")[3]);
    let reject = Number(course.Reject.split(";")[3]);
    if(this.totalAPS >=firm) return 2;
    else if(this.totalAPS <=reject) return 0;
    else if(this.totalAPS >reject && this.totalAPS<firm) return 1;
    return -1;
  }
  getOffer(course:DegreeRequirement):string //returns "Firm Offer"
  {
    let apsOffer = this.getOfferAPS(course);
    let offer = 0;
    let physMark=0,mathMark=0,engMark=0;
    let physics = [course.Reject.split(";")[0],course.Waitlist.split(";")[0],course.Firm_Offer.split(";")[0]];
    let math =    [course.Reject.split(";")[1],course.Waitlist.split(";")[1],course.Firm_Offer.split(";")[1]];
    let eng =     [course.Reject.split(";")[2],course.Waitlist.split(";")[2],course.Firm_Offer.split(";")[2]];
    let physObj =  this.dataSource.find((d: any) => d.Subject === 'Physical Science')!;
    let mathObj =  this.dataSource.find((d: any) => d.Subject === 'Mathematics')!;
    let engObj =  this.dataSource.find((d: any) => d.Subject === 'English First Language')!;
    if(physObj) physMark = Number(physObj.Mark);
    if(mathObj) mathMark = Number(mathObj.Mark);
    if(engObj) engMark = Number(engObj.Mark);

    let physLevel = this.checkSubjectOffer(physics,physMark);
    let mathLevel = this.checkSubjectOffer(math,mathMark);
    let engLevel =  this.checkSubjectOffer(eng,engMark);
    offer = Math.min(physLevel,mathLevel,engLevel,apsOffer);
    //console.log(course.Degree_Name,physMark,mathMark,engMark,apsOffer);
    if(offer===0) return "Reject";
    else if (offer===1) return "Waitlist";
    else if (offer===2) return "Firm Offer";
    return "";
  }
  checkSubjectOffer(subjectValues:string[],subjectMark:Number):number //0 reject 1 wait 2 firm
  {
    if(subjectValues[2]=='-'||subjectValues[1]=='-' ||subjectValues[0]=='-'  ) return 2;
    if(subjectMark>=Number(subjectValues[2])) return 2;//firm check
    else if(subjectMark>=Number(subjectValues[1])) return 1;//waitlist check
    else if(subjectMark>=Number(subjectValues[0])) return 0;//reject
    return 0;
  }


  addAPS(){
    const sum = this.dataSource.reduce((sum: any, subject: { APS: any; }) => sum + Number(subject.APS), 0);
    //console.log('APS ' + sum);
    this.totalAPS = sum;
  }

  getAPS(subjectName: string, mark: Number){
    let subject:Subject = {} as Subject
    subject = this.data.find((d) => 
      d.Subject === subjectName
    )!;
    
    // console.log(subject);
    let APS = '0';

    if(mark <= 29 )
    {
      APS = subject.Level_29_0;
    }
    else if (mark <= 39)
    {
      APS = subject.Level_39_30;
    }
    else if (mark <= 49)
    {
      APS = subject.Level_49_40;
    }
    else if (mark <= 59)
    {
      APS = subject.Level_59_50;
    }
    else if (mark <=69)
    {
      APS = subject.Level_69_60;
    }
    else if (mark <= 79)
    {
      APS = subject.Level_79_70;
    }
    else if (mark <= 89)
    {
      APS = subject.Level_89_80;
    }
    else if (mark <= 100)
    {
      APS = subject.Level_100_90;
    }

    return APS;
  }

  editSubjectSelection(event: any){
    this.subjectSelection = this.subjectSelection.filter((a: any) => {
      return (a.value !== event.newData.Subject)
    })
    this.settings.columns.Subject.editor.config.list = this.subjectSelection;
    this.settings = Object.assign({},this.settings);     
    event.newData.APS = this.getAPS(event.newData.Subject, event.newData.Mark);         
    event.confirm.resolve(event.newData);
    
    //console.log(this.subjectSelection);
  }

  deleteSubjectSelection(event: any){
    
    if (this.subjectSelection === null){
    }
    this.subjectSelection = this.subjectSelection.filter((a: any) => {
      return (a.value !== event.data)
    })
    this.settings.columns.Subject.editor.config.list = this.subjectSelection;
    this.settings = Object.assign({},this.settings);     
    event.data.APS = 0;    

    event.confirm.resolve(event.data);    
  }

  data: Subject[] = [];
  subjectSelection: any = [];
  dataSource: any = [];
  totalAPS: Number = 0;
  degreeReqs: DegreeRequirement[] = [];
  qualifiedCourses: any = [];
  qualifiedCoursesII: any = [];
  qualifiedCoursesIII!: LocalDataSource;
  offerList:any = [];


  settings = {
    actions: {
      delete: true,
      edit: true,
    },   
    delete: {
      confirmDelete: true
    },
    edit:{
      confirmSave: true
    },  
    add: {
      confirmCreate: true,
    }, 
    hideSubHeader: false,    
    mode: 'inline',    
    columns: {
      // _id: {
      //   title: 'Subject',
      //   filter: false,
      // },
      Subject: {
        title: 'Subject',
        filter: false,          
          editor: {
            type: 'list',
            config: {
              list: this.subjectSelection,
            },            
          },
      },
      Mark: {
        title: 'Mark',
        filter: false,
          type: 'completer',
          // config: {
          //   completer: {
          //     data: this.data,
          //     searchFields: 'email',
          //     titleField: 'email',
          //   },
          // },
      },
      APS: {
        title: 'APS',
        filter: false,
        addable: false,
      },      
    }
  }

  qualifiedSettings = {
    actions: {
      delete: false,
      edit: false,
      add: false,
    },  
    hideSubHeader: false,   

    columns: {
      Degree_Name: {
        title: 'Degree',
        filter: false,  
      },
      Offer: {
        title: 'Offer',
        filter:false,
      }
    }
  }
  
}
