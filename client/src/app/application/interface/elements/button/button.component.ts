import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ButtonService } from './button.service';
import { UtilityService } from '../../utility.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() host: string;
  @Input() config: ButtonConfig;
  @Input() data: any;
  @Output() result = new EventEmitter();


  private showDialog = false;
  private state = 'btn-primary'
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

  constructor(
    private service: ButtonService,
    private utility: UtilityService
  ) {
    this.clearResponse();
  }

  buttonAction() {
    // create the body object
    if (this.config.api.body && this.config.api.body.length > 0) {
      this.config.api.body.forEach(property => {
        this.body[property.to || property.from] = this.utility.pair(this.data, property.from);
      })
    };

    // the button should change to read-only while it's
    // executing and present change in css class
    this.response.code = 1;

    // console.log('Password reset called ' + this.url)
    let action = this.service.execute(this.url, this.body);
    action.subscribe(response => {
      setTimeout(() => {
        // testing
        console.log(response);

        // set the response
        this.response = response;

        // set state
        switch (this.response.code) {
          case 200:
            this.state = 'btn-primary';
            break;
          case 400:
            this.state = 'btn-warning';
            break;
          case 403:
            this.state = 'btn-warning';
            break;
          default:
            this.state = 'btn-danger';
            break;
        }
        
        // expose the response through the output
        if (this.response.code === 200) {
          this.result.emit(this.response.data);
        }
      }, 2000);
    });

    // reset to 0 after 30 seconds
    setInterval(() => {
      if (this.response.code === 1) {
        this.response.code = 0;
        this.state = 'btn-primary';
      }
    }, 60000);
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
      from: string;
      to?: string;
    } [];
  }
}
