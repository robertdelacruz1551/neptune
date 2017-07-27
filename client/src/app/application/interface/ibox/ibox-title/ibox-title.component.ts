import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ibox-title',
  templateUrl: './ibox-title.component.html',
  styleUrls: ['./ibox-title.component.css']
})
export class IboxTitleComponent implements OnInit {
  @Input() title: string;
  @Input() version: string;
  constructor() { }
  ngOnInit() {
  }
}
