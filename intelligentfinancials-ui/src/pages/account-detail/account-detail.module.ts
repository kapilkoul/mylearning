import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { AccountDetailPage } from './account-detail';
import { OrderByPipe } from '../../models/pipes/orderby';

@NgModule({
  declarations: [
    AccountDetailPage,
    OrderByPipe
  ],
  imports: [
    IonicPageModule.forChild(AccountDetailPage),
    TranslateModule.forChild()
  ],
  exports: [
    AccountDetailPage
  ]
})
export class AccountDetailPageModule { }
