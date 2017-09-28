import { Component, OnInit, Input } from '@angular/core';
import { TextBoxConfig } from '../textbox/textbox.component';
import { CheckboxConfig } from '../checkbox/checkbox.component';
import { RadioConfig } from '../radio/radio.component';
import { DropdownConfig } from '../dropdown/dropdown.component';
import { DatatableConfig } from '../datatable/datatable.component';
import { TextBlockConfig } from '../textblock/textblock.component';
import { DlistConfig } from '../dlist/dlist.component';
import { AccordionConfig } from '../accordion/accordion.component';
import { ButtonConfig } from '../button/button.component';

@Component({
  selector: 'elements',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.css']
})
export class ElementsComponent implements OnInit {
  @Input() data: any;
  @Input() element: Elements [] = [];
// pair(data, element.bind)
  pair (object, bind, value) {
    if (typeof bind === 'string') {
      return this.pair(object, bind.split('.'), value);
    } else if (bind.length === 1 && value !== undefined) {
       return object[bind[0]] = value;
    } else if (bind.length === 0) {
      return object;
    } else {
      return this.pair(object[bind[0]], bind.slice(1), value);
    }
  }

  constructor() { }
  ngOnInit() {
  }
}



export class Elements {
  type?: string;
  bind?: string;
  textbox?: TextBoxConfig;
  checkbox?: CheckboxConfig;
  radio?: RadioConfig;
  dropdown?: DropdownConfig;
  datatable?: DatatableConfig;
  textblock?: TextBlockConfig;
  dlist?: DlistConfig;
  accordion?: AccordionConfig;
  button?: ButtonConfig;
}
