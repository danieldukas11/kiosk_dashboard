import { Component, OnInit } from '@angular/core';
import {ManageUsersService} from '../../services/manage-users.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
  users;
  opendialog=false;
 
  constructor(
    private mannageUser:ManageUsersService,
  ) { }

  ngOnInit() {
    this.mannageUser.getUsers().subscribe(data=>{
      this.users=data
      console.log(data)
    })
  }

  addUser(){
    this.opendialog=true
  }
  close(){
    this.opendialog=false
  }

}
