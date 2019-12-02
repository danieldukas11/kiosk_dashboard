import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http:HttpClient
  ) { }

  login(data){
      return this.http.post("dashboard/login",data)
    }
  
  addUser(user){
    return this.http.post("dashboard/adduser",user)
  }
}
