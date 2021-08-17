import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@Component({
  selector: 'app-offer-page',
  templateUrl: './offer-page.component.html',
  styleUrls: ['./offer-page.component.scss']
})
export class OfferPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  data = [
    {
      id: 4,
      name: 'Patricia Lebsack',
      email: 'Julianne.OConner@kory.org',
      passed: 'Yes',
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      email: 'Lucio_Hettinger@annie.ca',
      passed: 'No',
    },
    {
      id: 6,
      name: 'Mrs. Dennis Schulist',
      email: 'Karley_Dach@jasper.info',
      passed: 'Yes',
    },
    {
      id: 7,
      name: 'Kurtis Weissnat',
      email: 'Telly.Hoeger@billy.biz',
      passed: 'No',
    },
    {
      id: 8,
      name: 'Nicholas Runolfsdottir V',
      email: 'Sherwood@rosamond.me',
      passed: 'Yes',
    },
    {
      id: 9,
      name: 'Glenna Reichert',
      email: 'Chaim_McDermott@dana.io',
      passed: 'No',
    },
    {
      id: 10,
      name: 'Clementina DuBuque',
      email: 'Rey.Padberg@karina.biz',
      passed: 'No',
    },
    {
      id: 11,
      name: 'Nicholas DuBuque',
      email: 'Rey.Padberg@rosamond.biz',
      passed: 'Yes',
    },
  ];

  settings = {
    hideSubHeader: false,
    confirmCreate: false,
    columns: {
      id: {
        title: 'ID',
        filter: false,
      },
      name: {
        title: 'Full Name',
        filter: false,          
          editor: {
            type: 'list',
            config: {
              list: [
                { value: 'Glenna Reichert', title: 'Glenna Reichert' },
                { value: 'Kurtis Weissnat', title: 'Kurtis Weissnat' },
                { value: 'Chelsey Dietrich', title: 'Chelsey Dietrich' },
              ],
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
      passed: {
        title: 'Passed',
        filter: false,
          type: 'checkbox',
          config: {
            true: 'Yes',
            false: 'No',
            resetText: 'clear',
          },
      },
    },
  };

  
}
