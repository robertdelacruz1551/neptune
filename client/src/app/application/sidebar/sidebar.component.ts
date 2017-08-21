import { Component, OnInit, Input } from '@angular/core';
import { SidebarService } from './sidebar.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  @Input() operator;
  @Input() links

  constructor() {};
  ngOnInit() {
  }
}
