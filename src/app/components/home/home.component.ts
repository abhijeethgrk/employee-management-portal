import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  user:any
  title:any
  isadmin=false;
  isMenuVisible=false;
  isLoggedIn=false
  constructor(private authService:AuthService,private route:Router){
    this.user=this.authService.getUserid();
    this.title=this.authService.isAdmin()?"Employee Management Portal":"";
    let role=sessionStorage.getItem('role');
    if(role=='admin'){
      this.isadmin=true;
    }
  }
 
  ngDoCheck(): void {
    let currentroute = this.route.url;
    let role=sessionStorage.getItem('role');
    if (currentroute == '/login' || currentroute == '/register' || role === null) {
      this.isMenuVisible = false
    } else {
      this.isMenuVisible = true
      this.isLoggedIn = true
    }

    if (role == 'admin') {
      this.isadmin = true;
    }else{
      this.isadmin = false;
    }
  }
}
