import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FeedService } from '../feed.service';

@Component({
  selector: 'radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css']
})
export class RadioComponent implements OnInit {
  @Input() config: RadioConfig;
  @Input() bind: string;
  @Output() update = new EventEmitter();
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
export class RadioConfig {
  label: { text: string; };
  input: { readonly?: boolean; name: string; options: { value: any; text: string; } []};
  feed?: string;
};
