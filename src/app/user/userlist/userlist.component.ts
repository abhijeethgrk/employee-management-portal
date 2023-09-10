import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UpdatepopupComponent } from 'src/app/components/updatepopup/updatepopup.component';
import * as alertify from 'alertifyjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserpopupComponent } from '../userpopup/userpopup.component';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent {
  constructor(private builder: FormBuilder, private service: AuthService, private dialog: MatDialog) {
    this.LoadUser();
  }
  userlist: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {

  }
  LoadUser() {
    this.service.Getall().subscribe(res => {
      this.userlist = res;
      this.userlist = this.userlist.filter((val:any)=>val.id!='admin');
      this.dataSource = new MatTableDataSource(this.userlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource)
    });
  }

  displayedColumns: string[] = [ 'id', 'name', 'email', 'balance'];

  addUser(){
    this.OpenDialog('1000ms', '600ms', '');
  }

  addMoney(code: any) {
    this.OpenDialog('1000ms', '600ms', code);
  }
  applyFilter(event:any){
    let value = event.target.value
     this.dataSource.filter=value.trim().toLowerCase()
   }

  OpenDialog(enteranimation: any, exitanimation: any, code: string) {
    const popup = this.dialog.open(UserpopupComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '30%',
      data: {
        id: code
      }
    });
    popup.afterClosed().subscribe(res => {
      this.LoadUser();
    });
  }
}