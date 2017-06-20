import { Injectable } from '@angular/core';
import { TextBoxConfig, CheckboxConfig, RadioConfig, DropdownConfig, DatatableConfig } from './templates.component';
import { KYC } from '../../MockData/interface-mock';

export class Interfaces {
  id: string;
  name: string;
  description?: string;
  workflow?: Workflow;
  panels: Panels [];
  data: {
    workitem?: Workitem;
    subject: any;
  };
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

class Elements {
  type: string; // textbox/checkbox/radio/dropdown/datatable
  textbox?: { bind: string; config: TextBoxConfig };
  checkbox?: { bind: string; config: CheckboxConfig };
  radio?: { bind: string; config: RadioConfig };
  dropdown?: { bind: string; config: DropdownConfig };
  datatable?: { bind: string; config: DatatableConfig };
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
