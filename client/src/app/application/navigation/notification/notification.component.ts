import { Component, OnInit } from '@angular/core';
import { NotificationService, Notifications } from './notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html'
})
export class NotificationComponent implements OnInit {
  private notifications: Notifications;

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    let jwt = localStorage.getItem('client');
    let notification = this.notificationService.getNotifications(jwt);
    notification.subscribe(res => {
      this.notifications = res;
    });
  }
}
