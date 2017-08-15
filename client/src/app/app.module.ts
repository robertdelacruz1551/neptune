/**
 * Angular modules
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';

/**
 * Components
 */
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { ApplicationComponent } from './application/application.component';
import { SidebarComponent } from './application/sidebar/sidebar.component';
import { NavigationComponent } from './application/navigation/navigation.component';
import { FooterComponent } from './application/footer/footer.component';
import { SearchComponent } from './application/navigation/search/search.component';
import { MessageComponent } from './application/navigation/message/message.component';
import { NotificationComponent } from './application/navigation/notification/notification.component';
import { IboxComponent } from './application/interface/ibox/ibox.component';
import { IboxTitleComponent } from './application/interface/ibox/ibox-title/ibox-title.component';
import { IboxToolstripComponent } from './application/interface/ibox/ibox-toolstrip/ibox-toolstrip.component';
import { IboxMetadataComponent } from './application/interface/ibox/ibox-metadata/ibox-metadata.component';
import { IboxContentComponent } from './application/interface/ibox/ibox-content/ibox-content.component';
import { WizardComponent } from './application/interface/elements/wizard/wizard.component';
import { PanelComponent } from './application/interface/elements/wizard/panel/panel.component';
import { ContainerComponent } from './application/interface/elements/wizard/panel/container/container.component';
import { ElementsComponent } from './application/interface/elements/wizard/panel/container/elements/elements.component';
import { ModalComponent } from './application/interface/elements/modal/modal.component';
import { TextboxComponent } from './application/interface/elements/textbox/textbox.component';
import { CheckboxComponent } from './application/interface/elements/checkbox/checkbox.component';
import { RadioComponent } from './application/interface/elements/radio/radio.component';
import { DropdownComponent } from './application/interface/elements/dropdown/dropdown.component';
import { DatatableComponent } from './application/interface/elements/datatable/datatable.component';
import { TextblockComponent } from './application/interface/elements/textblock/textblock.component';

/**
 * Services
 */
import { SidebarService } from './application/sidebar/sidebar.service';
import { IboxService } from './application/interface/ibox/ibox.service';
import { DlistComponent } from './application/interface/elements/dlist/dlist.component';
import { AccordionComponent } from './application/interface/elements/accordion/accordion.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    FooterComponent,
    SigninComponent,
    ApplicationComponent,
    NavigationComponent,
    SearchComponent,
    MessageComponent,
    NotificationComponent,
    TextboxComponent,
    RadioComponent,
    CheckboxComponent,
    DropdownComponent,
    DatatableComponent,
    ModalComponent,
    IboxComponent,
    IboxTitleComponent,
    IboxToolstripComponent,
    IboxMetadataComponent,
    IboxContentComponent,
    PanelComponent,
    WizardComponent,
    ContainerComponent,
    ElementsComponent,
    ModalComponent,
    TextboxComponent,
    CheckboxComponent,
    RadioComponent,
    DropdownComponent,
    DatatableComponent,
    TextblockComponent,
    DlistComponent,
    AccordionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path: '', component: IboxComponent},
      {path: 'interface/:interface', component: IboxComponent},
      {path: 'interface/:interface/workitem/:workitem', component: IboxComponent},
      {path: 'interface/:interface/workitem/:workitem/entity/:entity', component: IboxComponent},
      {path: 'interface/:interface/entity/:entity', component: IboxComponent},
      {path: 'interface/:interface/entity/:entity/workitem/:workitem', component: IboxComponent}
    ])
  ],
  providers: [
    SidebarService,
    IboxService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


// tslint:disable-next-line:max-line-length