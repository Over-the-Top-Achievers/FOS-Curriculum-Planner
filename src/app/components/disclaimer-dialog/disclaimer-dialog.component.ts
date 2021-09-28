import { Component, Injectable, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';

@Injectable()
@Component({
  selector: 'app-disclaimer-dialog',
  templateUrl: './disclaimer-dialog.component.html',
  styleUrls: ['./disclaimer-dialog.component.scss']
})

export class DisclaimerDialogComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    ) {}

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(DisclaimerDialogComponent);
  }
}
