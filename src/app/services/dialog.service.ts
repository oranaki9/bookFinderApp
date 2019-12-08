import { MassageComponent } from "./../modals/massage/massage.component";
import { Injectable, TemplateRef } from "@angular/core";
import { MatDialog } from "@angular/material";
import { BookInfoComponent } from "../modals/book-info/book-info.component";

@Injectable({
  providedIn: "root"
})
export class DialogService {
  constructor(private matDialog: MatDialog) {}
  openDialog(dialogName: string, payload?): void {
    const dialogOption = this.dialogOptions(dialogName);
    this.matDialog.open(dialogOption, {
      width: "33rem",
      data: { payload }
    });
  }
  dialogOptions(dialogName: string): TemplateRef<any> {
    const DIALOGS = {
      bookInfo: BookInfoComponent,
      massage: MassageComponent
    };
    return DIALOGS[dialogName];
  }
  close(): void {
    this.matDialog.closeAll();
  }
}
