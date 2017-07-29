import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ibox-content',
  templateUrl: './ibox-content.component.html',
  styleUrls: ['./ibox-content.component.css']
})
export class IboxContentComponent implements OnInit {
  @Input() panels;
  @Input() data;
  constructor() { }
  ngOnInit() {
  }
}
