import { Injectable } from '@angular/core';
import { Elements, ModalConfig } from './ui-elements.component';
import { CUSTOMFORM } from '../../MockData/interface-mock';
import { USERMANAGER } from '../../MockData/user-management';

export class Interfaces {
  id: string;
  name: string;
  description?: string;
  subject: {
    add: boolean;
    modal: any | ModalConfig;
    id: string;
    object: any;
  };
  toolstrip?: Toolstrip;
  panels: Panels [];
  data?: {
    workitem?: Workitem;
  };
};

export class Toolstrip {
  enable: boolean;
  save?: {
    enable: boolean;
  };
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
}

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
  subjects: any [];
}

export class Panels {
  id: string;
  name: string;
  header?: Header;
  containers: Containers [];
};

export class Containers {
  header?: Header;
  elements: Elements [];
};

export class Header {
  align: string;
  text?: string;
  subtext?: string;
}

@Injectable()
export class InterfaceService {
  interface = USERMANAGER || CUSTOMFORM;
  constructor() { }
}
