import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemtableComponent } from './itemtable/itemtable.component';
import { MaterialModule } from 'src/material.module';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ItemtableComponent],
  imports: [CommonModule, MaterialModule, AppRoutingModule,ReactiveFormsModule]
})
export class ItemModule {}
