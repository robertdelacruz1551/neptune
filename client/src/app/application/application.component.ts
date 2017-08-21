import { Component, OnInit } from '@angular/core';
import { ApplicationService, Application } from './application.service';

@Component({
  selector: 'app-application',
  template: `
  <div id="wrapper">
    <app-sidebar 
      *ngIf="application && application.sidebar" 
      [operator]="application.sidebar.operator"
      [links]="application.sidebar.links">
    </app-sidebar>
    <div id="page-wrapper" class="gray-bg">
      <app-navigation *ngIf="application"
        [navigation]="application.navigation">
      </app-navigation>
      <div class="wrapper wrapper-content animated fadeIn"> 
        <div class="container">
          <ibox></ibox>
        </div>
      </div>
      <app-footer></app-footer>
    </div>
  </div>
  `
})
export class ApplicationComponent implements OnInit {
  private application: Application
  constructor(private service: ApplicationService) { }
  ngOnInit() {
    let jwt = JSON.parse(localStorage.getItem('client'));
    let getApplicationSettings = this.service.getApplicationSettings(jwt);
    getApplicationSettings.subscribe(res=> {
      this.application = res
    });
  } 
}
