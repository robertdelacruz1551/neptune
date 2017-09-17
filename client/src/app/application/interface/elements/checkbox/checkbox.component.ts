import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FeedService } from '../feed.service';

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

  constructor(private Feed: FeedService) {}

  ngOnInit() {
    this.id = Math.random().toString(36).substring(7);
    // if the checkbox requires a feed then 
    // perform a search for the data
    if(this.config.feed) {
      let feed = this.Feed.datafeed(this.config.feed);
      feed.subscribe(options=>{
        this.config.input.options = options;
      });
    }
  };
}

export class CheckboxConfig {
  label: { text: string; };
  input: { readonly?: boolean; name: string; options: { value: any; text: string; } []; };
  feed?: string;
};

