import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { global } from '../globalVars';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  rememberMe: boolean = false;
  email: any = "";
  password: any = "";

  constructor(private router: Router, private globalvar: global) {
  }

  ngOnInit() {
    if (this.globalvar.loggedIn) {
      this.router.navigateByUrl('/home');
    }
    else {
      if (localStorage.getItem("rememberMe") === "true" && localStorage.getItem("loginData")) {
        this.email = JSON.parse(localStorage.getItem("loginData")).email;
        this.password = JSON.parse(localStorage.getItem("loginData")).password;
        this.rememberMe = true;
      }
    }

  }

  login(isValidData, value) {
    if (isValidData) {
      let lastLoginDate = formatDate(new Date(), 'dd-MM-yyyy hh:mm:ss a', 'en-US');
      localStorage.setItem("lastLoginDate", JSON.stringify(lastLoginDate));
      localStorage.setItem("loginData", JSON.stringify(value));
      localStorage.setItem("rememberMe", JSON.stringify(value.remember));
      localStorage.setItem("loggedIn", "true");
      this.globalvar.loggedIn = true;
      this.router.navigateByUrl('/home');
    }
  }

}
