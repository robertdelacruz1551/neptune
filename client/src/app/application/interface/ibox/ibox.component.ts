import { Component, OnInit, Input } from '@angular/core';
import { InterfaceService } from '../interface.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'ibox',
  templateUrl: './ibox.component.html',
  styleUrls: ['./ibox.component.css']
})
export class IboxComponent implements OnInit {
  private interface;
  private ready: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: InterfaceService
  ) { };

  ngOnInit() {
    // clears the template
    this.ready = false;
    // query for the interface
    this.route.params.subscribe((params: Params) => {
      let id  = params['id'];
      let jwt = localStorage.getItem('client');
      let _interface = this.service.getInterface(id, jwt);
      _interface.subscribe(res=> {
        console.log(res);
        this.interface = res;
        this.ready = true;
      });
    });
  }
}
