import { Component, OnInit } from '@angular/core';
import { SidebarService } from './sidebar.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  name: string;
  title: string;
  home: string;
  username: string;

  applications: any;

  constructor(
    private sidebar: SidebarService
  ) { }

  ngOnInit() {
    this.name = this.sidebar.operator.name;
    this.title = this.sidebar.operator.title;
    this.home = this.sidebar.operator.home;
    this.username = this.sidebar.operator.username;

    this.applications = this.sidebar.applications;
  }

}
