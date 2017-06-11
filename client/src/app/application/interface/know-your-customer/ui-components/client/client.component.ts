import { Component, Input, OnInit } from '@angular/core';
import { Client,  ClientDefault } from './client';
import { FormDefaultConfig } from './user-interface-config';

@Component({
  selector: 'client-module',
  templateUrl: 'client.component.html'
})
export class ClientComponent implements OnInit {
  @Input() formCustomConfig: any;
  @Input() type: string; // individual or nonindividual

  private client: Client;
  private form: {};

  constructor() {
    this.client = ClientDefault;
    this.type = 'individual';
  }

  ngOnInit() {
    this.form = this.formCustomConfig || FormDefaultConfig;
  };

  test() {
    console.log(this.client);
  }
};
