import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

class User {
  _id: string;
  fullname: string;
};

export class Messages {
  _id: string;
  tenant: string;
  recipient: User;
  sender: User;
  subject: string;
  sent: Date;
  read: Boolean;
  body: string;
}[];

@Injectable()
export class MessageService {
  constructor(private http: Http) { }

  getMessages( jwt: string ): Observable<Messages> {
    let url = 'http://127.0.0.1:1337/api/secure/messages';
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': jwt });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(url, options)
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
