import { Component, OnInit, Input } from '@angular/core';
import { ModalConfig } from '../modal/modal.component';

@Component({
  selector: 'datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {
  @Input() config: DatatableConfig;
  @Input() dataset: any [];
/**
 * if the user clicks on selected all then set all 
 * the checkboxes in the table to checked
 */
  private allSelected: boolean;

/**
 * The unique identifier for the dataset
 */
  public datasetId = Math.random().toString(36).substring(7);

/**
 * This property will have the modal key 
 * to delete records from the datatable
 */
  public deleteModalId = Math.random().toString(36).substring(7);

/**
 * This property is an array 
 * containing the rows selected
 */
  private rowsSelected: any [] = [];
  public select(state: boolean) {
    this.allSelected = state;
    if (state) {
      this.dataset.forEach(row => {
        this.selectedRow(row, true);
      });
    } else {
      this.rowsSelected = [];
    }
  };

/**
 * This method sets the row in focus to 
 * view, edit or delete from the dataset
 * @param row: is initialized on click
 */
  rowSelectionChange(row: number, state: boolean ) {
    let data = this.dataset[row];
    this.selectedRow(data, state);
  };

/**
 * This method sets the row in focus to 
 * view, edit or delete from the dataset
 * @param row: is initialized on click
 */
  selectedRow(data: any, state: boolean) {
    let row = this.rowsSelected.indexOf(data);
    if (state) {
      this.rowsSelected.push(data);
    } else {
      this.rowsSelected.splice(row, 1);
    }
  };

/**
 * Deletes the row in focus from the dataset
 */
  deleteRow() {
    this.rowsSelected.forEach(row => {
      let datasetIndex = this.dataset.indexOf(row);
      this.dataset.splice(datasetIndex, 1);
    });
    this.allSelected = false;
    this.rowsSelected = [];
  };

  ngOnInit() {
  }
}
export class DatatableConfig {
  size?: string;
  label?: { text: string; };
  headers: {
    key: string;
    text: string;
  } [];
  action: {
    enable: boolean;
    modal?: ModalConfig;
    edit: boolean;
    add: boolean;
    button?: {
      add?:  { enable: boolean; modal: ModalConfig; };
      edit?: { enable: boolean; modal: ModalConfig; };
      delete?: { enable: boolean; message?: string; };
    }
  };
};
