import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  template: `
  <li class="dropdown">
    <a class="dropdown-toggle text-primary" data-toggle="dropdown" href="javascript:;">
      <i class="fa fa-envelope-o fa-lg"></i>
    </a>
    <ul class="dropdown-menu dropdown-messages">
      <li>
        <div class="dropdown-messages-box">
          <a href="profile.html" class="pull-left">
            <!-- <img alt="image" class="img-circle" src="img/a7.jpg"> -->
          </a>
          <div class="media-body">
            <small class="pull-right">46h ago</small>
            <strong>Mike Loreipsum</strong> started following <strong>Monica Smith</strong>. <br>
            <small class="text-muted">3 days ago at 7:58 pm - 10.06.2014</small>
          </div>
        </div>
      </li>
      <li class="divider"></li>
      <li>
        <div class="dropdown-messages-box">
          <a href="profile.html" class="pull-left">
            <!-- <img alt="image" class="img-circle" src="img/a7.jpg"> -->
          </a>
          <div class="media-body ">
            <small class="pull-right text-navy">5h ago</small>
            <strong>Chris Johnatan Overtunk</strong> started following <strong>Monica Smith</strong>. <br>
            <small class="text-muted">Yesterday 1:21 pm - 11.06.2014</small>
          </div>
        </div>
      </li>
    </ul>
  </li>
  `
})
export class MessageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
