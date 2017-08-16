import { Injectable } from '@angular/core';
import { ModalConfig } from '../elements/modal/modal.component';
import { GROUPS, USERS, CUSTOMFORM } from '../../../MockData/interface-mock';


export class Interfaces {
  id: string;
  version?: string;
  title: string;
  description?: string;
  toolstrip?: Toolstrip;
  save?: {
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

@Injectable()
export class IboxService {
  interface: Interfaces;

  getInterface(item: string): Interfaces {
    this.interface = GROUPS || USERS || CUSTOMFORM;
    return this.interface;
  }
  constructor() { }
};
