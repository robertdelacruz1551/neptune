import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-application',
  template: `
  <div id="wrapper">
      <app-sidebar></app-sidebar><!-- sidebar -->
      <div id="page-wrapper" class="gray-bg">
          <app-navigation></app-navigation><!-- navigation -->
          <div class="wrapper wrapper-content animated fadeIn"> 
              <div class="container">
                  <router-outlet></router-outlet>
              </div>
          </div>
          <app-footer></app-footer><!-- footer -->
      </div>
  </div>
  `
})
export class ApplicationComponent implements OnInit {
  constructor() { }
  ngOnInit() {
  }
}
