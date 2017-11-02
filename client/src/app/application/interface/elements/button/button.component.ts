import { Component, OnInit, Input } from '@angular/core';
import { ButtonService } from './button.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() host: string;
  @Input() config: ButtonConfig;
  @Input() data: any;

  private url: string;
  private body: any = {};
  private response: {
    text: string;
    code: number;
    data: any;
  };

  constructor(private service: ButtonService) { }

  ButtonAction() {
    // console.log('Password reset called ' + this.url)
    let action = this.service.execute(this.url, this.body);
    action.subscribe(response => {
      console.log(response);
      this.response = response;
    });
  }

  ngOnInit() {
    // instantiate the url property
    this.url = this.config.api.url;

    // set params
    if (this.config.api.params && this.config.api.params.length > 0) {
      this.config.api.params.forEach(param => {
        this.url += '/' + param.key + '/' + this.data[param.value];
      });
    };
    // create the body object
    if (this.config.api.body && this.config.api.body.length > 0) {
      this.config.api.body.forEach(property => {
        this.body[property.key] = this.data[property.value] || null
        console.log(this.body);
      });
    };
  }
}

export class ButtonConfig {
  text: string;
  style?: {
    position: number;
    color: string;
  };
  api: {
    url: string;
    onSuccessMessage?: string [];
    onFailureMessage?: string [];
    protocal?: string;
    params?: {
      key: string;
      value: string;
    } [];
    body?: {
      key: string;
      value: string;
    } [];
  }
}
