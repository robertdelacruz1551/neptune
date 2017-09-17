import { Component, OnInit } from '@angular/core';
import { ApplicationService, Application } from './application.service';

@Component({
  selector: 'app-application',
  template: `
  <div id="wrapper">
    <app-sidebar></app-sidebar>
    <div id="page-wrapper" class="gray-bg">
      <app-navigation></app-navigation>
      <div class="wrapper wrapper-content animated fadeIn"> 
        <div class="container">
          <router-outlet></router-outlet>
        </div>
      </div>
      <app-footer></app-footer>
    </div>
  </div>
  `
})
export class ApplicationComponent implements OnInit {
  ngOnInit() {
  } 
}
