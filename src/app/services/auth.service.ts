import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import {environment} from "../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http:HttpClient
  ) { }

  login(data){
      return this.http.post(`${environment.url}dashboard/login`,data)
    }

  addUser(user){
    return this.http.post(`${environment.url}dashboard/adduser`,user)
  }
}
