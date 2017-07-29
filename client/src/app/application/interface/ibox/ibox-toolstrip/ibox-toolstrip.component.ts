import { Component, OnInit, Input } from '@angular/core';
import { Toolstrip } from '../ibox.service';

@Component({
  selector: 'ibox-toolstrip',
  templateUrl: './ibox-toolstrip.component.html',
  styleUrls: ['./ibox-toolstrip.component.css']
})
export class IboxToolstripComponent implements OnInit {
  @Input() toolstring: Toolstrip;
  @Input() ibox;
  constructor() { }
  ngOnInit() {
  }
  view() {
    console.log(this.ibox);
  }
}
