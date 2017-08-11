import { Component, OnInit, Input } from '@angular/core';
import { IboxService } from './ibox.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'ibox',
  templateUrl: './ibox.component.html',
  styleUrls: ['./ibox.component.css']
})
export class IboxComponent implements OnInit {
  @Input() user;
  private interface;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: IboxService
  ) { };

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      let interface_  = params['interface'];
      let workitem_   = params['workitem'];
      let entity_     = params['entity'];
      this.interface = this.service.getInterface(interface_, workitem_, entity_);
    });
  }
}
