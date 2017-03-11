import { Injectable } from '@angular/core';
import { APPLICATIONS, OPERATOR } from '../../MockData/user-mock';


@Injectable()
export class SidebarService {
  applications = APPLICATIONS;
  operator = OPERATOR;

  constructor( ) { }

}

// tslint:disable-next-line:no-unused-variable