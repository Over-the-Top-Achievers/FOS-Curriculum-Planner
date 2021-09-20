import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { DisclaimerDialogComponent } from "src/app/components/disclaimer-dialog/disclaimer-dialog.component";

@Injectable()

export class DisclaimerService{
    constructor(private dialog: MatDialog,
        public disclaimer: DisclaimerDialogComponent){}

    openDialog(){
        this.dialog.open(DisclaimerDialogComponent);
    }
}