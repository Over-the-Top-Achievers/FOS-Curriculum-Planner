import { Component, OnInit } from '@angular/core';
import { LocalDataSource, Ng2SmartTableModule } from 'ng2-smart-table';
import { SubjectService } from 'src/app/shared/services/subject.services';
import { Subject } from 'src/app/shared/models';
import { DegreeRequirement } from 'src/app/shared/models';

@Component({
  selector: 'app-offer-page',
  templateUrl: './offer-page.component.html',
  styleUrls: ['./offer-page.component.scss']
})
export class OfferPageComponent implements OnInit {

  constructor(
    public subjectService: SubjectService
  ) { }  

  ngOnInit(): void {
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
    this.dataSource = [
      {Subject:"Mathematics",Mark:"65",APS:"42"},
      {Subject:"Mathematics",Mark:"65",APS:""},
      {Subject:"Mathematics",Mark:"65",APS:""},
      {Subject:"Mathematics",Mark:"65",APS:""},


    ]
 
  }

  add(event: any){
    //console.log(event);   

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

    if (numberOfSubjects ===7 )
    {
      this.updateQualifiedCoursese();
    }
  }
  updateQualifiedCoursese()
  {
    this.qualifiedCourses=[];
    this.qualifiedCoursesII= [];
    this.APSCheck();
    this.subjectCheckI();
    this.subjectCheckII();
    this.qualifiedCoursesIII.refresh();
  }
  APSCheck()
  {
    this.addAPS();
    for (let i = 0; i < this.degreeReqs.length; ++i)
    {
      let APS = Number(this.degreeReqs[i].Firm_Offer.split(';')[3]);

      if (this.totalAPS >= APS)
      {
        this.qualifiedCourses.push(this.degreeReqs[i]);        
      }
    }
    //console.log(this.qualifiedCourses);
  }
  updateOffers()
  {
    for(let i=0;i<this.degreeReqs.length;i++)
    {
      console.log(this.getOffer(this.degreeReqs[i]))
      this.offerList[i].Offer = this.getOffer(this.degreeReqs[i]);
    }
    this.qualifiedCoursesIII.load(this.offerList);
    this.qualifiedCoursesIII.refresh();
    // console.log(this.qualifiedCourses);
  }
  getOfferAPS(course:DegreeRequirement):Number //0 reject 1 wait 2 firm
  {
    console.log(course);
    let firm = Number(course.Firm_Offer.split(";")[3]);
    let waitlist = Number(course.Waitlist.split(";")[3]);
    let reject = Number(course.Reject.split(";")[3]);
    if(this.totalAPS >=firm) return 2;
    else if(this.totalAPS >=waitlist) return 1;
    else if(this.totalAPS >=reject) return 0;
    return -1;
  }
  getOffer(course:DegreeRequirement):string //returns "Firm Offer"
  {
    let apsOffer = this.getOfferAPS(course);

    if(apsOffer===0) return "Reject";
    else if (apsOffer===1) return "Waitlist";
    else if (apsOffer===2) return "Firm Offer";
    return "";
  }
 
  getOfferSubject(course: DegreeRequirement)
  {
    
  }
  subjectCheckI()
  {
    for (let i = 0; i < this.degreeReqs.length; ++i)
    {
      let reqMarkMaths;
      let reqMarkPhysics;
      let reqMarkEngHL;

      let maths: any;
      let engHL: any;
      let physics: any;

      let engHLBool = true;
      let mathsBool = true;
      let physicsBool = true;

      if(this.degreeReqs[i].Firm_Offer.split(';')[0] !== '-')
      {
        maths = this.dataSource.find((d: any) => 
          d.Subject === 'Mathematics'
        )!;
        reqMarkMaths = Number(this.degreeReqs[i].Firm_Offer.split(';')[0]);   
        if (maths !== undefined)
        {
          if (reqMarkMaths <= maths.Mark)
          {
            mathsBool = true;
          }
          else{
            mathsBool = false;
          }
        }
        else{
          mathsBool = false;
        }        
      }      
      
      if(this.degreeReqs[i].Firm_Offer.split(';')[1] !== '-')
      {
        physics = this.dataSource.find((d: any) => 
          d.Subject === 'Physical Science'
        )!;
        reqMarkPhysics = Number(this.degreeReqs[i].Firm_Offer.split(';')[1]);  
        
        if (physics !== undefined)
        {
          if (reqMarkPhysics <= physics.Mark)
          {
            physicsBool = true;
          }
          else {
            physicsBool = false;
          }
        }
        else{
          physicsBool = false;
        }    
          
      }   
      
      if(this.degreeReqs[i].Firm_Offer.split(';')[2] !== '-')
      {
        engHL = this.dataSource.find((d: any) => 
          d.Subject === 'English First Language'
        )!;
        reqMarkEngHL = Number(this.degreeReqs[i].Firm_Offer.split(';')[2]);  
        
        if (engHL !== undefined)
        {
          if (reqMarkEngHL <= engHL.Mark)
          {
            engHLBool = true;
          }
          else{
            engHLBool = false;
          }
        }
        else{
          engHLBool = false;
        }    
      }          
     
      if (engHLBool === true && mathsBool === true && physicsBool === true)
      {
        this.qualifiedCoursesII.push(this.degreeReqs[i]);
      }
    }
  }

  subjectCheckII()
  {
    this.qualifiedCoursesIII.load(this.qualifiedCourses.filter((x: any) => this.qualifiedCoursesII.includes(x)));
    // console.log(this.qualifiedCoursesIII);
  }

  addAPS(){
    const sum = this.dataSource.reduce((sum: any, subject: { APS: any; }) => sum + Number(subject.APS), 0);
    console.log('APS ' + sum);
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
      delete: false,
      edit: false,
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
