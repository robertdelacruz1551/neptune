import { Component, OnInit, Input } from '@angular/core';
import { Toolstrip } from '../ibox.service';

@Component({
  selector: 'ibox-toolstrip',
  templateUrl: './ibox-toolstrip.component.html',
  styleUrls: ['./ibox-toolstrip.component.css']
})
export class IboxToolstripComponent implements OnInit {
  @Input() toolstrip: Toolstrip;
  @Input() interface;
  @Input() save: boolean;

  saveData() {
    console.log(this.interface.data);
  };
  constructor() { }
  ngOnInit() {
  }
}
