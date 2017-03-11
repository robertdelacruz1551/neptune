import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})

export class SigninComponent implements OnInit {
    username: string;
    password: string;
    message: string;

    constructor() { }

    ngOnInit() {
    }

    private signin(event){
      event.preventDefault();

      // todo: setup signin function
    }
}
