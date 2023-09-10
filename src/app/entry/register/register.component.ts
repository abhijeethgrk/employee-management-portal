import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  registerform = this.builder.group({
    id: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.minLength(5),Validators.min(1)])
    ),
    name: this.builder.control('', Validators.required),
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
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    role: this.builder.control('user'),
    isactive: this.builder.control(false),
    balance:this.builder.control(0),
  });
  
  proceedregister() {
    if (this.registerform.valid) {
      this.service.RegisterUser(this.registerform.value).subscribe((result) => {
        this.toastr.success(
          'Registered successfully'
        );
        this.router.navigate(['login']);
      });
    } else {
      this.toastr.warning('Please enter valid data.');
    }
  }
}
