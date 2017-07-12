import { Injectable } from '@angular/core';
import { Elements, ModalConfig } from './templates.component';
import { KYC } from '../../MockData/interface-mock';

export class Interfaces {
  id: string;
  name: string;
  description?: string;
  sidebar: {
    enable: boolean;
    label: string;
  };
  toolstrip?: Toolstrip;
  panels: Panels [];
  data: {
    workitem?: Workitem;
    subject: any;
  };
};

export class Toolstrip {
  enable: boolean;
  save?: {
    enable: boolean;
  };
  attachment?: {
    enable: boolean;
    model: ModalConfig;
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
  Workflow?: Workflow;
};

export class Workflow {
  enable: boolean;
  id: string;
  statuses: {
    id: string;
    name: string;
    next: { id: string; name: string } [];
  } [];
}

class Workitem {
  id: string;
  name: string;
  type: string;
  created: Date;
  status: string;
  entity: string;
  source: string;
}

class Panels {
  id: string;
  name: string;
  header?: Header;
  containers: Containers [];
}

class Containers {
  header?: Header;
  elements: Elements [];
}

class Header {
  align: string;
  text?: string;
  subtext?: string;
}

@Injectable()
export class InterfaceService {
  interface = KYC;
  constructor() { }
}
