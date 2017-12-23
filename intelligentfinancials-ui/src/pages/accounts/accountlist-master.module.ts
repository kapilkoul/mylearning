import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { AccountListMasterPage } from './accountlist-master';
import {AccountsPipe} from '../../models/pipes/accountspipe';


@NgModule({
  declarations: [
    AccountListMasterPage,
    AccountsPipe
  ],
  imports: [
    IonicPageModule.forChild(AccountListMasterPage),
    TranslateModule.forChild()
  ],
  exports: [
    AccountListMasterPage
  ]
})
export class AccountListMasterPageModule { }
