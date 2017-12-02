import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

class Sidebar {
  operator: {
    name: string;
    title: string;
    username: string;
  };
  links: {
    _id: string,
    type: string,
    name: string;
    icon: string;
  } [];
}

@Injectable()
export class SidebarService {
  constructor(private http: Http) { }

  getSidebar( jwt: string ): Observable<Sidebar> {
    let url = 'http://127.0.0.1:1337/app/sidebar';
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': jwt });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(url, options)
                    .map((res: Response) => res.json())
                    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}

// tslint:disable-next-line:no-unused-variable
