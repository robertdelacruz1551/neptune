import { Injectable } from '@angular/core';
import { TextBoxConfig, CheckboxConfig, RadioConfig, DropdownConfig, DatatableConfig } from './templates.component';
import { KYC } from '../../MockData/interface-mock';

export class Interfaces {
  name: string;
  description?: string;
  url?: string;
  panels: Panels [];
  data: any;
};

class Panels {
  id: string;
  name: string;
  header?: {
    align: string;
    text?: string;
    subtext?: string;
  };
  containers: Containers [];
}

class Containers {
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

@Injectable()
export class InterfaceService {
  interface = KYC;
  constructor() { }
}
