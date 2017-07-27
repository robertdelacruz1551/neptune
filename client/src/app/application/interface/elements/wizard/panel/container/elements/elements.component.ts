import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'elements',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.css']
})
export class ElementsComponent implements OnInit {
  @Input() data: any;
  @Input() elements: Elements [] = [];

  pair(object, bind, value) {
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
/** 
  type: string; // textbox/checkbox/radio/dropdown/datatable
  bind?: string;
  textbox?: TextBoxConfig;
  checkbox?: CheckboxConfig;
  radio?: RadioConfig;
  dropdown?: DropdownConfig;
  datatable?: DatatableConfig;
  textblock?: TextBlockConfig;
  attachment?: AttachmentConfig;
  comment?: CommentConfig;
 */
}
