import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/item.service';
import { ToastrService } from 'ngx-toastr'


@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css']
})
export class UpdatepopupComponent implements OnInit{
  editdata: any;
  iotd = false
  constructor(private builder: FormBuilder, private dialog: MatDialog, private api: EmployeeService,
    @Inject(MAT_DIALOG_DATA) public data: any,private toast:ToastrService) { }

  ngOnInit(): void {
    this.iotd = this.data.id === 'iotd'
    
    if ((this.data.id != '' || typeof(this.data.id)=='number') && this.data.id != null) {
      this.api.getbyID(this.data.id).subscribe(response => {
        this.editdata = response;
        this.itemform.setValue({
          id: this.editdata.id, name: this.editdata.name, email: this.editdata.email
        });
      });
    }
  }

  itemform = this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    name: this.builder.control({ value: '', disabled: this.iotd }, Validators.required),
    email: this.builder.control({ value: '', disabled: this.iotd }, Validators.required),
  });

  saveItem() {
    if (this.itemform.valid) {
      const Editid = this.itemform.getRawValue().id;
      if ((Editid != '' || typeof(this.data.id)=='number') && Editid != null) {
        this.api.updateEmployee(Editid, this.itemform.getRawValue()).subscribe(response => {
          this.closepopup();
          this.toast.success(
          "Saved Successfully"
          );
        });
      } else {
        this.api.addEmployee(this.itemform.value).subscribe(response => {
          this.closepopup();
          this.toast.success(
            "Saved Successfully"
            );
        });
      }
    }
  }

  closepopup() {
    this.dialog.closeAll();
  }
}
