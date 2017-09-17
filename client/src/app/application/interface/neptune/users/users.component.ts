import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { Interfaces } from '../../../../application/interface/interface.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  private ui: Interfaces;

  constructor( private service: UsersService ) { }
  ngOnInit() {
    let jwt = localStorage.getItem('client');
    let getListOfUsers = this.service.getUsers(jwt);
    getListOfUsers.subscribe(ui=>{
      this.ui = ui;
    });
  }
}



const UI: Interfaces = {
  id: 'neptune-users',
  title: 'Users',
  __v: '1.0',
  description: null,
  panels: [
    {
      active: true,
      name: 'Users',
      containers: [
        {
          elements: [
            {
              type: 'datatable',
              bind: 'users',
              datatable: {
                headers: [
                  { key: '_id', text: 'Username' },
                  { key: 'name', text: 'Name' },
                  { key: 'email', text: 'Email' },
                  { key: 'title', text: 'Title' },
                  { key: 'status', text: 'Status'},
                  { key: 'created', text: 'Created'}
                ],
                action: {
                  enable: true,
                  link: {
                    url: 'secure/user/',
                    id: '_id'
                  },
                  edit: true,
                  add: true
                }
              }
            }
          ]
        }
      ]
    }
  ],
  data: {
    users: []
  }
}