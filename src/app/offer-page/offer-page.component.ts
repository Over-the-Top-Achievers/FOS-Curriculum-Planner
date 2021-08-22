import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SubjectService } from 'src/app/shared/services/subject.services';
import { Subject } from 'src/app/shared/models';

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
        console.log(this.data && this.data.map((grp) => {return {'value': grp.Subject, 'title': grp.Subject}}));
        this.subjectSelection = this.data && this.data.map((grp) => {return {'value': grp.Subject, 'title': grp.Subject}});
        this.settings.columns.Subject.editor.config.list = this.subjectSelection;
        this.settings.confirmCreate = true; 
        this.settings = Object.assign({},this.settings);        
      }
    )
  }

  add(event: any){
    let numberOfSujects = this.dataSource.length;
    if (numberOfSujects <= 7)
    {
      console.log('This maybe works');  
      this.setAPS(event);
      this.addAPS()
    }
    else
    {
      console.log('Only 7 subjects required for APS calculation');
    }
    
  }

  addAPS(){
    const sum = this.dataSource.reduce((sum: any, subject: { APS: any; }) => sum + Number(subject.APS), 0);
    console.log(sum);
  }
  setAPS(event: any){
    let mark = Number(this.dataSource[0].Mark);
    let subjectName = this.dataSource[0].Subject;
    let subject:Subject = {} as Subject
    subject = this.data.find((d) => 
      d.Subject === subjectName
    )!;
    // console.log(subject);
    let APS = '0';

    if(mark < 29 )
    {
      APS = subject.Level_29_0;
    }
    else if (mark < 39)
    {
      APS = subject.Level_39_30;
    }
    else if (mark < 49)
    {
      APS = subject.Level_49_40;
    }
    else if (mark < 59)
    {
      APS = subject.Level_59_50;
    }
    else if (mark < 69)
    {
      APS = subject.Level_69_60;
    }
    else if (mark < 79)
    {
      APS = subject.Level_79_70;
    }
    else if (mark < 89)
    {
      APS = subject.Level_89_80;
    }
    else if (mark < 100)
    {
      APS = subject.Level_100_90;
    }

    this.dataSource[0].APS = APS;
    event.source.update(this.dataSource[0], this.dataSource[0]);
  }

  data: Subject[] = [];
  subjectSelection: any = [];
  dataSource: any = [];

  settings = {
    hideSubHeader: false,
    confirmCreate: true,
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
    },
  };

  
}
