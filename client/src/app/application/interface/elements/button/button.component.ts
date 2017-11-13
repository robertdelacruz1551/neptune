import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
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

  private showDialog = false;
  private state = 0; // 1: running, 2: finish ok, 3: error, 4: forbidden
  private url: string;
  private body: any = {};
  private response: {
    text: string;
    code: number;
    data: any;
  };

  private clearResponse() {
    this.response = {text: null, code: 0, data: null}
  }

  constructor(private service: ButtonService) {
    this.clearResponse();
  }

  buttonAction() {
    // the button should change to read-only while it's
    // executing and present change in css class
    this.state = 1;

    // console.log('Password reset called ' + this.url)
    let action = this.service.execute(this.url, this.body);
    action.subscribe(response => {
      setTimeout(() => {
        // set the response
        this.response = response;

        // set state
        switch (this.response.code) {
          case 400:
            this.state = 3;
            break;
          case 403:
            this.state = 4;
            break;
          default:
            this.state = 2;
            break;
        }

        // reset to 0 after 30 seconds
        setTimeout(() => {
          this.state = 0;
        }, 30000);

      }, 2000);

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
