import { Component, OnInit, Input } from '@angular/core';
import { Panels } from '../../ibox/ibox.service';
import { FeedService } from '../feed.service';

@Component({
  selector: 'accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent implements OnInit {
  @Input() config: AccordionConfig;
  @Input() dataset: any [];

  constructor(private Feed: FeedService) {}
  
  ngOnInit() {
    if ( this.dataset ) {
      this.dataset.forEach(data => {
        if (!data._id) {
          data._id = Math.random().toString(36).substring(7);
        };
      });
    }

    // if the checkbox requires a feed then 
    // perform a search for the data
    if(this.config.feed) {
      let feed = this.Feed.datafeed(this.config.feed);
      feed.subscribe(dataset=>{
        this.dataset = dataset;
      });
    }
  }
}
export class AccordionConfig {
  title: string;
  subtitle: string;
  panels: Panels [];
  feed?: string;
};

