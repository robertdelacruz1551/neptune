import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SigninService } from './signin.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  username: string;
  password: string;
  message: string;

  constructor(private signinService: SigninService, private router: Router) { }

  ngOnInit() {
    this.signinService.jwt = null;
    localStorage.clear();
  }

  clearPassword() {
    this.password = null;
  }

  private signin(event) {
    event.preventDefault();
    if (!this.username || !this.password) {
      this.message = 'Username and password required';
    } else {
      let attemptResults = this.signinService.authenticate(this.username, this.password);
      attemptResults.subscribe(res => {
        this.clearPassword(); // clear the password
        if (!this.signinService.jwt) {
          this.message = res;
        } else {
          this.router.navigate(['authenticated/home']);
        }
      });
    };
  }
}
