import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http"
import {environment} from "../../environments/environment"
import {from} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageUsersService {

  constructor(
    private http: HttpClient
  ) {
  }

  getUsers() {
    return this.http.get(`${environment.url}dashboard/users`);
  }

  updateProfile(val) {
    return this.http.put(`${environment.url}dashboard/updateuser`, val);
  }
}
