import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FeedService } from '../feed.service';

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
  @Input() config: DropdownConfig;
  @Input() bind: string;
  @Output() update = new EventEmitter();
  otherSelected: boolean;
  private id: string;

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
export class DropdownConfig {
  label: { text: string; };
  input: {
    readonly?: boolean;
    size?: string;
    name: string;
    emptyOption?: boolean;
    otherOption?: boolean;
    options: { value: string; text: string; }[]
  };
  feed?: string;
};
