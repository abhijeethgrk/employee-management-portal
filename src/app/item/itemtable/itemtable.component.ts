import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UpdatepopupComponent } from 'src/app/components/updatepopup/updatepopup.component';
import { EmployeeService } from 'src/app/services/item.service';
import * as alertify from 'alertifyjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-itemtable',
  templateUrl: './itemtable.component.html',
  styleUrls: ['./itemtable.component.css'],
})
export class ItemtableComponent {
  isAdmin = false;
  displayedColumns: string[] = [];

  constructor(
    private builder: FormBuilder,
    private service: EmployeeService,
    private dialog: MatDialog,
    private authService: AuthService
  ) {
    this.LoadUser();
    this.isAdmin = this.authService.isAdmin();
    this.displayedColumns = ['id', 'name', 'email', 'action'];
  }
  userlist: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {}
  LoadUser() {
    this.service.getAll().subscribe((res) => {
      this.userlist = res;
      this.dataSource = new MatTableDataSource(this.userlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  addEmployee() {
    this.OpenDialog('1000ms', '600ms', '');
  }

  updateitem(code: any) {
    this.OpenDialog('1000ms', '600ms', code);
  }

  deleteitem(id: any) {
    alertify.confirm(
      'Delete Employee',
      'Do you want to delete this Employee?',
      () => {
        this.service.delete(id).subscribe((result) => {
          this.LoadUser();
        });
      },
      function () {}
    );
  }

  applyFilter(event: any) {
    let value = event.target.value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  OpenDialog(enteranimation: any, exitanimation: any, code: string) {
    const popup = this.dialog.open(UpdatepopupComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '30%',
      data: {
        id: code,
      },
    });
    popup.afterClosed().subscribe((res) => {
      this.LoadUser();
    });
  }
}
