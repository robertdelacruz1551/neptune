import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() id: string;
  @Input() datarow: any = {};
  @Input() feed: any [] = []; // used to feed data into a data displaying element like the app-comments element
  @Input() config: ModalConfig;
  @Output() commit = new EventEmitter();
/**
 * Will contain the updated object
 */
  private editableDatarow: {} = {};

  private setEditableDatarow() {
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
    let editableDatarowToCommit = this.editableDatarow;
    this.editableDatarow = {};
    return this.commit.emit(editableDatarowToCommit);
  }

/**
 * On init make a copy of the datarow 
 * property to prevent update if user 
 * cancels change.
 */
  ngOnInit() {
    this.setEditableDatarow();
  }
}

export class ModalConfig {
  labelBy?: string;
  size?: string;
  header: {
    enable: boolean;
    text: string;
  };
  form: {
// add the wizord object
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
