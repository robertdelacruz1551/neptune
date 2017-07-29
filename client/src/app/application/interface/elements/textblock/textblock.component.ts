import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'textblock',
  templateUrl: './textblock.component.html',
  styleUrls: ['./textblock.component.css']
})
export class TextblockComponent implements OnInit {
  @Input() config: TextBlockConfig;
  @Input() bind: string;
  @Input() readonly: boolean;
  @Output() update = new EventEmitter();
  constructor() { }
  ngOnInit() {
  }
}
export class TextBlockConfig {
  label: { text?: string; };
  input: { readonly?: boolean; name: string; placeholder?: string; rows?: number};
  rules?: { showIf?: string; };
};
