import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material";

@Component({
  selector: "app-massage",
  templateUrl: "./massage.component.html",
  styleUrls: ["./massage.component.scss"]
})
export class MassageComponent implements OnInit {
  massage: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { payload: string },
    private matDialog: MatDialog
  ) {}
  ngOnInit() {
    this.massage = this.data.payload;
  }
  closeModal() {
    this.matDialog.closeAll();
  }
}
