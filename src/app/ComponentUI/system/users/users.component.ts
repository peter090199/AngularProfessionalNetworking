import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
searchKey:string = "";
placeHolder: any;
pageSizeOptions   : number[] = [5, 10, 25, 100];

applyFilter() {
throw new Error('Method not implemented.');
}
clearSearch() {
throw new Error('Method not implemented.');
}
onClickNew() {
throw new Error('Method not implemented.');
}
listData: any;
editEmployee(_t65: any) {
throw new Error('Method not implemented.');
}
deleteEmployee(_t65: any) {
throw new Error('Method not implemented.');
}
isLoading: true;
users: any;


  constructor() { }

  ngOnInit(): void {
  }

}
