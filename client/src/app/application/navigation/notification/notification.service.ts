import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

export class Notifications {
  _id: string;
  from: string;
  subject: string;
  note: string;
  created: Date;
} [];

@Injectable()
export class NotificationService {
  constructor(private http: Http) { }

  getNotifications( jwt: string ): Observable<Notifications> {
    let url = 'http://127.0.0.1:1337/api/secure/notifications';
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': jwt });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(url, options)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
