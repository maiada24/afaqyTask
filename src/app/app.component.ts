import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as $ from "jquery";
import { Router } from '@angular/router';
import { global } from "../app/globalVars";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loggedIn: boolean;

  constructor(private router: Router, private translate: TranslateService, private globalvar: global) {
    if (!localStorage.getItem("language")) {
      localStorage.setItem("language", "en");
    }
    translate.setDefaultLang(localStorage.getItem("language"));
    this.translate.currentLang = localStorage.getItem("language");

    setTimeout(() => {
      if (localStorage.getItem("language") === "en") {
        $("body").removeClass("rtl text-right");
        $("mat-form-field").removeClass("text-right");
        $("body").addClass("ltr text-left");
        $("mat-form-field").addClass("text-left");
      }
      else {
        $("body").removeClass("ltr text-left");
        $("mat-form-field").removeClass("text-left");
        $("body").addClass("rtl text-right");
        $("mat-form-field").addClass("text-right");
      }
    }, 0);
  }

  ngOnInit() {
    if (localStorage.getItem("loggedIn") === "true") {
      this.globalvar.loggedIn = true;
      this.router.navigateByUrl('/home');
    }
  }
  switchLanguage() {
    if (this.translate.currentLang === "ar") {
      this.translate.use("en");
      $("body").removeClass("rtl text-right");
      $("mat-form-field").removeClass("text-right");
      $("body").addClass("ltr text-left");
      $("mat-form-field").addClass("text-left");
      localStorage.setItem("language", "en");
    }
    else {
      this.translate.use("ar");
      $("body").removeClass("ltr text-left");
      $("mat-form-field").removeClass("text-left");
      $("body").addClass("rtl text-right");
      $("mat-form-field").addClass("text-right");
      localStorage.setItem("language", "ar");
    }

  }
  clearLoginData() {
    localStorage.setItem("loggedIn", "false");
    this.globalvar.loggedIn = false;
  }
}
