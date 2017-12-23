import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { TransactionCreatePage } from './transaction-create';

@NgModule({
  declarations: [
    TransactionCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(TransactionCreatePage),
    TranslateModule.forChild()
  ],
  exports: [
    TransactionCreatePage
  ]
})
export class TransactionCreatePageModule { }
