import { Component, OnInit, Input } from '@angular/core';
import { IboxService } from './ibox.service';

@Component({
  selector: 'ibox',
  templateUrl: './ibox.component.html',
  styleUrls: ['./ibox.component.css']
})
export class IboxComponent implements OnInit {
  private interface;
  constructor(
    private service: IboxService
  ) { }
  ngOnInit() {
    this.interface = this.service.interface;
  }
}
