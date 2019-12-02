import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getRole(){
    let token=localStorage.getItem("usr");
    if(token){
      let decoded=jwt_decode(token);
    return decoded.data.role
    }
    
  }

}
