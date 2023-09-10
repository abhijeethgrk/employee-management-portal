import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserlistComponent } from './userlist/userlist.component';
import { MaterialModule } from 'src/material.module';
import { AppRoutingModule } from '../app-routing.module';
import { UserpopupComponent } from './userpopup/userpopup.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserlistComponent,
    UserpopupComponent
  ],
  imports: [
    CommonModule, MaterialModule, AppRoutingModule,ReactiveFormsModule
  ]
})
export class UserModule { }
