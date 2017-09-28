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
    private interfaceService: InterfaceService
  ) { };

  ngOnInit() {
    // clears the template
    // once the component is initialized
    // set this variable to false
    this.ready = false;

    // retrive the jwt from local storage
    let jwt = localStorage.getItem('client');

    // get the url parameters from the router
    // then execute the query
    this.route.params.subscribe((params: Params) => {
      // if the inteface identifier is present
      // then execute a search for the interface
      if ( params['interface'] ) {
        let url = this.router.url;
        let gui = this.interfaceService.getInterface(url, jwt);
        gui.subscribe(res => {
          this.interface  = res;
          this.ready      = true;
        });
      };

    });
  }
}


// query for the interface
// console.log(this.router);
// this.route.params.subscribe((params: Params) => {
//   let id  = params['id'];
//   let jwt = localStorage.getItem('client');
//   let _interface = this.service.getInterface(id, jwt);
//   _interface.subscribe(res => {
//     console.log(res);
//     this.interface = res;
//     this.ready = true;
//   });
// });
