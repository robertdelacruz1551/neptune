import { Injectable } from '@angular/core';
import { ModalConfig } from './elements/modal/modal.component';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
// import { GROUPS, USERS, CUSTOMFORM } from '../../../MockData/interface-mock';


export class Interfaces {
  id: string;
  __v?: string;
  title: string;
  description?: string;
  toolstrip?: Toolstrip;
  saves?: {
    form?: boolean;
    toolstrip?: boolean;
  };
  panels: Panels [];
  data: any | {
    workitem?: Workitem;
  };
};

export class Toolstrip {
  save: boolean;
  attachment?: {
    enable: boolean;
    modal: ModalConfig;
  };
  comment?: {
    enable: boolean;
    modal: ModalConfig;
  };
  share?: {
    enable: boolean;
  };
  reminder?: {
    enable: boolean;
  };
  watch?: {
    enable: boolean;
  };
  history?: {
    enable: boolean
  };
  workflow?: {
    enable: boolean;
    config: Workflow;
  };
};

export class Workflow {
  id: string;
  statuses: {
    id: string;
    name: string;
    next: { id: string; name: string } [];
  } [];
};

class Workitem {
  id: string;
  type: string;
  description?: string;
  created: Date;
  modified?: Date;
  status: string;
  source: string;
  creator: string;
  modifier?: string;
  comments: any [];
  attachments: any [];
  history: any [];
  subject: {};
}

export class Panels {
  active: boolean;
  id?: string;
  name?: string;
  header?: Header;
  containers: Containers [];
};

export class Containers {
  header?: Header;
  elements: any []; // Elements [];
};

export class Header {
  align: string;
  text?: string;
  subtext?: string;
};

export class DataConfig {
  interface?: string;
  item?: string;
}

class InterfaceResponse {
  status: number;
  interface: Interfaces;
}

@Injectable()
export class InterfaceService {
  constructor( private http: Http, private router: Router ) { }

  getInterface(id: string,  jwt: string ): Observable<Interfaces> {
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': jwt }); 
    let options = new RequestOptions({ headers: headers }); 
    let url = 'http://127.0.0.1:1337/api/secure/interface/' + id;
    return this.http.get(url, options) 
                    .map((res:Response) => res.json())
                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
};