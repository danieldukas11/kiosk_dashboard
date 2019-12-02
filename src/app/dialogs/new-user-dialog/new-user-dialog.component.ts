import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-new-user-dialog',
  templateUrl: './new-user-dialog.component.html',
  styleUrls: ['./new-user-dialog.component.scss']
})
export class NewUserDialogComponent implements OnInit {
  @Output() onClose=new EventEmitter
  user={
    firstName:"",
    lastName:"",
    email:"",
    password:""
  }
  constructor(
    private AS:AuthService
  ) { }

  ngOnInit() {
  }

  close(){
    this.onClose.emit()
  }

  addUser(){
    
    this.validate(this.user)
    this.AS.addUser(this.user).subscribe(data=>{
      console.log(data)
      this.close()
    })
    
  }
  validate(user){
    if(user.firstName.length<3||user.lastName.length<3){
      return false
    }

  }
}
