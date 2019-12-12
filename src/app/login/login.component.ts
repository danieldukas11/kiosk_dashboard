import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service"
import {Router} from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginData = {
    userName: "",
    password: ""
  }

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  login() {
    let log = this.auth.login(this.loginData).subscribe(
      (data) => {
        localStorage.setItem("usr", data.toString())
        this.router.navigate(["admin"])
      },
      (err) => {
        console.log(err)
      }
    )

  }

}
