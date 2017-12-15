import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { setInterval } from 'timers';

declare var $: any;

@Component({
  selector: 'app-application',
  template: `
  <div id="wrapper">
    <app-sidebar></app-sidebar>
    <div id="page-wrapper" class="gray-bg">
      <app-navigation></app-navigation>
      <div class="wrapper wrapper-content animated fadeIn">
        <div class="container">
          <router-outlet></router-outlet>
        </div>
      </div>
      <app-footer></app-footer>
    </div>
  </div>

  <div class="modal fade" id="session-expiration-modal" tabindex="-1" role="dialog" aria-labelledby="session-expiration-modal-label">
    <div class="modal-dialog modal-sm" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" id="session-expiration-modal-label">Warning</h4>
        </div>
        <div class="modal-body">
          <p>Your session will end in <strong [ngClass]="(remainingTime <= 5)? 'text-danger':''">{{remainingTime}} seconds.</strong> Would you like to extend this session an additional 15 minutes?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default btn-action" data-dismiss="modal"(click)="endSession()">End Session</button>
          <button type="button" class="btn btn-warning btn-action" data-dismiss="modal">Extend Session</button>
        </div>
      </div>
    </div>
  </div>
  `
})
export class ApplicationComponent implements OnInit {
  remainingTime: number;

  constructor(private router: Router) {}

  private openSessionWarningDialog() {
    $('#session-expiration-modal').modal('show');
  }

  endSession() {
    this.router.navigate(['']);
  }

  private timeDifference(expire: string): number {
    let expireDT = new Date(expire);
    let current = new Date();
    // console.log('Current ' + current);
    // console.log('Expires ' + expireDT);
    // console.log('Time remaining ' + (expireDT.getTime() - current.getTime()));
    return (expireDT.getTime() - current.getTime());
  }

  public startSessionTimer() {
    let expire = localStorage.getItem('expire');
    let millisecondsRemaining = this.timeDifference(expire);

    this.remainingTime = new Date(millisecondsRemaining).getSeconds();

    if (millisecondsRemaining <= 60000 && millisecondsRemaining > 0) {
      this.openSessionWarningDialog();
    } else if (millisecondsRemaining < 0) {
      this.endSession();
    }
  };
/**
 * 1. in 1 minute intervals check for updates to update the clients session in the local variable "expire"
 * 2. if current time is within 5 minutes of end of session open session-expiration-modal
 *    a. if user decides to end session, then kill session
 *    b. if user decides to extend then call the verify function in signin.guard.ts.verify
 */
  ngOnInit() {
    this.startSessionTimer()

    setInterval(() => {
      this.startSessionTimer();
    }, 1000);
  }
}
