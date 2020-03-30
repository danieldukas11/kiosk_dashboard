import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http"
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {SuperAdminComponent} from './super-admin/super-admin.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AdminComponent} from './admin/admin.component';
import {ManageUserComponent} from './super-admin/manage-user/manage-user.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NewUserDialogComponent} from './dialogs/new-user-dialog/new-user-dialog.component';
import {ProductManagementComponent} from './admin/product-management/product-management.component'
import {MaterialModule} from './material-module';
import {SaveIngredientMenuDialogComponent} from './dialogs/save-ingredient-menu-dialog/save-ingredient-menu-dialog.component';
import {SaveProductMenuDialogComponent} from './dialogs/save-product-menu-dialog/save-product-menu-dialog.component';
import {SaveComboMenuDialogComponent} from './dialogs/save-combo-menu-dialog/save-combo-menu-dialog.component';
import {SaveIngredientDialogComponent} from './dialogs/save-ingredient-dialog/save-ingredient-dialog.component';
import {SaveProductDialogComponent} from './dialogs/save-product-dialog/save-product-dialog.component';
import {SaveComboProductDialogComponent} from './dialogs/save-combo-product-dialog/save-combo-product-dialog.component';
import {ProfileComponent} from './admin/profile/profile.component';
import {SaveComboDialogComponent} from './dialogs/save-combo-dialog/save-combo-dialog.component';
import {ProgressManagementMonitorComponent} from './admin/progress-management-monitor/progress-management-monitor.component';

import {DropzoneModule} from 'ngx-dropzone-wrapper';
import {DROPZONE_CONFIG} from 'ngx-dropzone-wrapper';
import {DropzoneConfigInterface} from 'ngx-dropzone-wrapper';
import {environment} from '../environments/environment';
import {ToastrModule} from 'ngx-toastr';
import {RequestInterceptor} from './interceptors/http.interceptor';
import {ConfirmationDialogComponent} from './dialogs/confirmation-dialog/confirmation-dialog.component';
import { NotFoundComponent } from './admin/not-found/not-found.component';
import { ManageKiosksComponent } from './admin/manage-kiosks/manage-kiosks.component';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  url: `${environment.url}dashboard/admin/ads/video/add`,
  maxFilesize: 50,
  maxFiles: 1
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SuperAdminComponent,
    DashboardComponent,
    AdminComponent,
    ManageUserComponent,
    NewUserDialogComponent,
    ProductManagementComponent,
    SaveIngredientMenuDialogComponent,
    SaveProductMenuDialogComponent,
    SaveComboMenuDialogComponent,
    SaveIngredientDialogComponent,
    SaveProductDialogComponent,
    SaveComboProductDialogComponent,
    ProfileComponent,
    SaveComboDialogComponent,
    ProgressManagementMonitorComponent,
    ConfirmationDialogComponent,
    NotFoundComponent,
    ManageKiosksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    DropzoneModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },

    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    SaveIngredientMenuDialogComponent,
    SaveProductMenuDialogComponent,
    SaveComboMenuDialogComponent,
    SaveIngredientDialogComponent,
    SaveProductDialogComponent,
    SaveComboProductDialogComponent,
    SaveComboDialogComponent,
    ConfirmationDialogComponent
  ]
})

export class AppModule {


}

console.log(`${environment.staticUrl}dashboard/admin/ads/video/add`);
