import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageUsersService {

  constructor(
    private http:HttpClient
  ) { }
  getUsers(){
    return this.http.get("dashboard/users")
  }
}
