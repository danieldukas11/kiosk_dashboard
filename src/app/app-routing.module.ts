import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {DashboardComponent} from "./dashboard/dashboard.component"
import {AuthGuard} from "./guards/auth.guard";
import {RoleGuard,SRoleGuard} from "./guards/role.guard";
import {LogGuard} from "./guards/log.guard"
import { ManageUserComponent } from './super-admin/manage-user/manage-user.component';
import { ProductManagementComponent } from './admin/product-management/product-management.component'

const routes: Routes = [
  {
    path:"",
    component:LoginComponent,
    canActivate:[LogGuard]
  },
  {
    path:"admin",
    component:DashboardComponent,
    canActivate:[AuthGuard],
    children:[
      {
        path:"",
        canActivate:[RoleGuard],
        component:ManageUserComponent

      },
      {
        path:"product_management",
        component:ProductManagementComponent,
        canActivate:[SRoleGuard],

      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
