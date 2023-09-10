import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-userpopup',
  templateUrl: './userpopup.component.html',
  styleUrls: ['./userpopup.component.css']
})
export class UserpopupComponent {
  editdata: any;
  addMoney = false
  constructor(private builder: FormBuilder, private dialog: MatDialog, private api: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,private toast:ToastrService) { }

  ngOnInit(): void {
    if (this.data.id != '' && this.data.id != null) {
      this.addMoney = true
      this.api.GetUserbyCode(this.data.id).subscribe(response => {
        this.editdata = response;
        this.adduserform.setValue({
          id: this.editdata.id, name: this.editdata.name, password: this.editdata.password,
          email: this.editdata.email,role:this.editdata.role,isactive:this.editdata.isactive, balance: this.editdata.balance,credit:0
        });
      });
    }
  }

  adduserform = this.builder.group({
    id: this.builder.control({value:'',disabled: this.data.id != '' && this.data.id != null },
      Validators.compose([Validators.required, Validators.minLength(5)]),
    ),
    name: this.builder.control({value:'',disabled: this.data.id != '' && this.data.id != null }, Validators.required),
    password: this.builder.control(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
      ])
    ),
    email: this.builder.control(
      {value:'',disabled: this.data.id != '' && this.data.id != null },
      Validators.compose([Validators.required, Validators.email])
    ),
    role: this.builder.control('user'),
    isactive: this.builder.control(false),
    balance:this.builder.control({value:0,disabled: this.data.id != '' && this.data.id != null }),
    credit:this.builder.control(0)
  });

  saveUser() {
    if (this.adduserform.valid) {
      if(this.addMoney){
        const Editid = this.adduserform.getRawValue().id;
        this.adduserform.getRawValue().balance=Number(this.adduserform.getRawValue().credit)+ Number(this.adduserform.getRawValue().balance)
      let rawValue = this.adduserform.getRawValue()
      rawValue.balance=Number(this.adduserform.getRawValue().credit)+ Number(this.adduserform.getRawValue().balance)
        this.api.updateuser(Editid,rawValue).subscribe(response => {
          this.closepopup();
          this.toast.success(
          "Save Successfully"
          );
        });
      }else{
        const Editid = this.adduserform.getRawValue().id;
        if (Editid != '' && Editid != null) {
          this.api.RegisterUser(this.adduserform.getRawValue()).subscribe(response => {
            this.closepopup();
            this.toast.success(
            "Save Successfully"
            );
          });
        } else {
          this.toast.warning('Please enter valid data.');
        }
      }
    }
  }

  closepopup() {
    this.dialog.closeAll();
  }
}
