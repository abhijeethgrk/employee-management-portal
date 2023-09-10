import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { LoginComponent } from './entry/login/login.component';
import { RegisterComponent } from './entry/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { ItemtableComponent } from './item/itemtable/itemtable.component';
import { UserlistComponent } from './user/userlist/userlist.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'item',
    component: ItemtableComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'userList',
    component: UserlistComponent,
    canActivate: [AuthGuard],
  },
  //Wild Card Route for 404 request
  { path: '**', pathMatch: 'full', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
