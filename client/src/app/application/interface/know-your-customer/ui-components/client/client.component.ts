import { Component, Input, OnInit } from '@angular/core';
import { Client, FormDefaultConfig } from './client';

@Component({
  selector: 'client-module',
  templateUrl: 'client.component.html'
})
export class ClientComponent implements OnInit{
  @Input() FormCustomConfig: any;
  client: Client;
  private form;

  ngOnInit() {
    this.form = this.FormCustomConfig || FormDefaultConfig;
  };
};
