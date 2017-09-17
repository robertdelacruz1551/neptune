import { Component, OnInit } from '@angular/core';
import { Interfaces } from '../../../../application/interface/interface.service';
import { UserService } from './user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private ui: Interfaces = UI;
  private userId: string;
  private userCache: string = JSON.stringify({});
  private user: any = {};
  private jwt: string;

  constructor( private service: UserService, private router: ActivatedRoute ) {
    this.userId = this.router.snapshot.params['id'];
    this.jwt  = localStorage.getItem('client');
  }
  

  canSave(): boolean {
    let userChange = JSON.stringify(this.user);
    return userChange != this.userCache;
  }


  saveUser() {
    if(this.canSave()) {
      console.log('Changed');
    } else {
      console.log('No Change');
    }
  }

  ngOnInit() {
    let getUser = this.service.getUser(this.jwt, this.userId);
    getUser.subscribe(ui=>{
      this.ui = ui;
      //The user property will store the data to check for updates later
      if(this.ui.data) {
        this.user = this.ui.data;
        this.userCache = JSON.stringify(this.user);
      }
    });
  }
}

const UI: Interfaces = {
  id: 'neptune-user',
  title: 'User',
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
              type: 'textbox',
              bind: '_id',
              textbox: {
                label: { text: 'Username' },
                input: { name: 'user.username', size: '3' }
              }
            },
            {
              type: 'dropdown',
              bind: 'status',
              dropdown: {
                label: { text: 'Status' },
                input: {
                  size: 'small',
                  name: 'user.status',
                  options: [
                    { value: 'Active', text: 'Active' },
                    { value: 'Locked', text: 'Locked' },
                    { value: 'Suspended', text: 'Suspended' },
                    { value: 'Terminated', text: 'Terminated' }
                  ]
                }
              }
            }
          ]
        },
        {
          elements: [
            {
              type: 'textbox',
              bind: 'fname',
              textbox: {
                label: { text: 'First Name' },
                input: { name: 'user.fname', size: '3' }
              }
            },
            {
              type: 'textbox',
              bind: 'mname',
              textbox: {
                label: { text: 'Middle Initial' },
                input: { name: 'user.mname', size: '1' }
              }
            },
            {
              type: 'textbox',
              bind: 'lname',
              textbox: {
                label: { text: 'Last Name' },
                input: { name: 'user.lname', size: '3' }
              }
            },
            {
              type: 'textbox',
              bind: 'email',
              textbox: {
                label: { text: 'Email' },
                input: { name: 'user.email', size: '3' }
              }
            }
          ]
        },
        {
          elements: [
            {
              type: 'dropdown',
              bind: 'department',
              dropdown: {
                label: { text: 'Department' },
                feed: 'departments-for-userform',
                input: {
                  size: 'medium',
                  name: 'user.department',
                  options: [
                    // { value: 'Onboarding', text: 'Onboarding' },
                    // { value: 'Client Services', text: 'Client Services' },
                    // { value: 'Assurance', text: 'Assurance' }
                  ]
                }
              }
            },
            {
              type: 'checkbox',
              bind: 'roles',
              checkbox: {
                label: { text: 'User Roles' },
                input: {
                  name: 'user.roles',
                  feed: 'roles-for-userform',
                  options: [
                    // { value: 'Onboarding', text: 'Onboarding' },
                    // { value: 'Quality Assurance', text: 'Quality Assurance' },
                    // { value: 'Manager', text: 'Manager' }
                  ]
                }
              }
            }
          ]
        }
      ]
    }
  ],
  data: {
    user: null
  }
};
