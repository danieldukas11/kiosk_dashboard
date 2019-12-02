import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.scss']
})
export class SuperAdminComponent implements OnInit {

  constructor(
    private router:Router
  ) { }
  menu=[
    {
      title:"Manage Users ",
      icon:"fas fa-users",
      link:""
    },
    {
      title:"Profile",
      icon:"fas fa-address-card",
      link:"/profile"
    },    
  ]

  

  ngOnInit() {
  }
  logout(){
    localStorage.removeItem("usr")
    this.router.navigate([""])
  }

}
