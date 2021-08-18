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
        this.settings = Object.assign({},this.settings);
      }
    )
  }

  data: Subject[] = [];
  subjectSelection: any = [];

  settings = {
    hideSubHeader: false,
    confirmCreate: false,
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
      email: {
        title: 'Email',
        filter: false,
          type: 'completer',
          config: {
            completer: {
              data: this.data,
              searchFields: 'email',
              titleField: 'email',
            },
          },
      },
    },
  };

  
}
