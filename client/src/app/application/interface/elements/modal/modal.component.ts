import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Panels } from '../../ibox/ibox.service';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() id: string;
  @Input() datarow: any = {};
  @Input() config: ModalConfig;
  @Output() commit = new EventEmitter();

/**
 * Will contain the updated object
 */
  private editableDatarow: {} = {};
  private setEditableDatarow() {
    this.datarow['neptune.metadata'] = {};
    this.editableDatarow = JSON.parse(JSON.stringify(this.datarow));
  }
/**
 * If the user cancels the change we 
 * need to reset the updateDatarow object 
 * back to it's unchanged state
 */
  public cancelChange() {
    this.setEditableDatarow();
  }

  public commits() {
    if (!this.editableDatarow['neptune.metadata'].created ) {
      this.editableDatarow['neptune.metadata'].created = new Date().toString();
    };
    this.editableDatarow['neptune.metadata'].modified = new Date().toString();
    let editableDatarowToCommit = this.editableDatarow;
    this.setEditableDatarow();
    return this.commit.emit(editableDatarowToCommit);
  }

/**
 * On init make a copy of the datarow 
 * property to prevent update if user 
 * cancels change.
 */
  constructor() {
  }
  ngOnInit() {
    this.setEditableDatarow();
  }
}

export class ModalConfig {
  button?: {
    enable: boolean;
    text: string;
  };
  labelBy?: string;
  size?: string;
  header: {
    enable: boolean;
    text: string;
  };
  form: {
    panels: Panels;
  };
  footer: {
    enable: boolean;
    commit?: {
      enable: boolean;
      text: string;
      clearFormAfterSubmit?: boolean;
    }
  };
}
