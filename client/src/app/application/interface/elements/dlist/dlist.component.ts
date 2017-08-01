import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dlist',
  templateUrl: './dlist.component.html',
  styleUrls: ['./dlist.component.css']
})
export class DlistComponent implements OnInit {
  @Input() config: DlistConfig;
  @Input() data;

  pair (object, bind, value) {
    if (typeof bind === 'string') {
      return this.pair(object, bind.split('.'), value);
    } else if (bind.length === 1 && value !== undefined) {
       return object[bind[0]] = value;
    } else if (bind.length === 0) {
      return object;
    } else {
      return this.pair(object[bind[0]], bind.slice(1), value);
    }
  }

  constructor() { }
  ngOnInit() {
  }
};
export class DlistConfig {
  terms: { text: string, bind: string } [];
};
