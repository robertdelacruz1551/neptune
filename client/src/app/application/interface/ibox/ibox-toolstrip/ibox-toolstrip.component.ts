import { Component, OnInit, Input } from '@angular/core';
import { Toolstrip } from '../../interface.service';

@Component({
  selector: 'ibox-toolstrip',
  templateUrl: './ibox-toolstrip.component.html',
  styleUrls: ['./ibox-toolstrip.component.css']
})
export class IboxToolstripComponent implements OnInit {
  @Input() toolstrip: Toolstrip;
  @Input() interface;

  constructor() { }
  ngOnInit() {
  }
}
