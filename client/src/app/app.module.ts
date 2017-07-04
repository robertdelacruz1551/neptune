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
import { KycOnboarding } from './application/interface/know-your-customer/on-boarding/kycOnboarding.component';
import { ClientComponent } from './application/interface/know-your-customer/ui-components/client/client.component';
import {
  TextboxComponent,
  RadioComponent,
  CheckboxComponent,
  DropdownComponent,
  DatatableComponent,
  ModalComponent,
  TextblockComponent
} from './application/interface/templates.component';
import {
  InterfaceComponent,
  WorkflowComponent,
  SocialFeedComponent
} from './application/interface/interface.component';
/**
 * Services
 */
import { SidebarService } from './application/sidebar/sidebar.service';
import { InterfaceService } from './application/interface/interface.service';


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
    KycOnboarding,
    TextboxComponent,
    RadioComponent,
    CheckboxComponent,
    DropdownComponent,
    DatatableComponent,
    ClientComponent,
    ModalComponent,
    InterfaceComponent,
    WorkflowComponent,
    TextblockComponent,
    SocialFeedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
        {path: '', component: InterfaceComponent},
    ])
  ],
  providers: [
    SidebarService,
    InterfaceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
