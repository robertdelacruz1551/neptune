import { Component, OnInit, Input } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @Input() navigation;
  constructor() { }

  ngOnInit() {
    
  }

  toggleNavigation() {
    jQuery('#side-menu').metisMenu();
  };

}
