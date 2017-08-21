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

  constructor(private http: Http) { }

  getApplicationSettings( jwt: string ): Observable<Application> {
    let url = 'http://127.0.0.1:1337/api/secure/application';
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': jwt }); 
    let options = new RequestOptions({ headers: headers }); 

    return this.http.get(url, options) 
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  } 
}
