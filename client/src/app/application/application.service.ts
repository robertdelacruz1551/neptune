import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

export class Application {
  sidebar: {
    operator: {
      name: string;
      jobtitle: string;
      username: string;
    };
    links: {
      name: string;
      icon: string;
      apps: { 
        name: string;
        url: string;
      } [];
    } [];
  }
  navigation: {
    search: {};
    notifications: {};
    messages: {};
  };
};

@Injectable()
export class ApplicationService {

}
