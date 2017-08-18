import { Component, OnInit } from '@angular/core';
import { SigninService } from './signin.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})

export class SigninComponent implements OnInit {
    username: string;
    password: string;
    message: string;

    constructor(private auth: SigninService) { }

    ngOnInit() {
    }

    private signin(event){
      event.preventDefault();
      let user = { username: this.username, password: this.password};
      let res = this.auth.authenticate(user);
      console.log('Credentials provided, username: ' + this.username + ' password: ' + this.password );
      console.log('Resopnse ');
      console.log(res);
    }
}
