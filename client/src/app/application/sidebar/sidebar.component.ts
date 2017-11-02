import { Component, OnInit, Input } from '@angular/core';
import { SidebarService } from './sidebar.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  private operator;
  private links;

  constructor(private sidebarService: SidebarService) {};

  ngOnInit() {
    let jwt = localStorage.getItem('client');
    let sidebar = this.sidebarService.getSidebar(jwt);
    sidebar.subscribe(res => {
      this.operator = res.operator;
      this.links    = res.links;
    });
  }
}
