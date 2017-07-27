import { Injectable } from '@angular/core';
import { ModalConfig } from '../ibox-modal/ibox-modal.component';

export class Interfaces {
  id: string;
  version: string;
  name: string;
  description?: string;
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
  elements: any []; // Elements [];
};

export class Header {
  align: string;
  text?: string;
  subtext?: string;
}

@Injectable()
export class IboxService {
  constructor() { }
}
