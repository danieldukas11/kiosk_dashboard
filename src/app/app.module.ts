import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http"
import {FormsModule, ReactiveFormsModule } from "@angular/forms"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { ManageUserComponent } from './super-admin/manage-user/manage-user.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewUserDialogComponent } from './dialogs/new-user-dialog/new-user-dialog.component';
import { ProductManagementComponent } from './admin/product-management/product-management.component'
import {MaterialModule} from './material-module';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SuperAdminComponent,
    DashboardComponent,
    AdminComponent,
    ManageUserComponent,
    NewUserDialogComponent,
    ProductManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
