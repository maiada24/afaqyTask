import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { global } from "../globalVars";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  lastLoginDate: any;
  constructor(private router: Router, private globalvar: global) { }

  ngOnInit() {
    if (localStorage.getItem("loggedIn") === "true") {
      this.lastLoginDate = localStorage.getItem("lastLoginDate");
      this.globalvar.loggedIn = true;
    }
    else {
      this.router.navigateByUrl('/');
    }
  }

}
