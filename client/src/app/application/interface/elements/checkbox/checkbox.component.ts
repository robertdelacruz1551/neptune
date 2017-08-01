import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {
  @Input() config: CheckboxConfig;
  @Input() bind: any [] = [];
  @Output() update = new EventEmitter();
  private id: string;

  updateArray(value, checked) {
    if ( checked ) {
      this.bind.push( value );
    } else if ( !checked ) {
      let i = this.bind.indexOf(value);
      this.bind.splice(i, 1);
    }
  }

  isChecked(value): boolean {
    if (!this.bind || this.bind.indexOf(value) === -1) {
      return false;
    } else { return true; };
  }

  ngOnInit() {
    this.id = Math.random().toString(36).substring(7);
  };
}
export class CheckboxConfig {
  label: { text: string; };
  input: { readonly?: boolean; options: { name?: string; value?: any; text: string }[]; };
}
