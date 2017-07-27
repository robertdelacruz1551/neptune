import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  @Input() elements: any[] = [];
  constructor() { }
  ngOnInit() {
  }
}
