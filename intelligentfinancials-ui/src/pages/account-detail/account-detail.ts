import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, Events } from 'ionic-angular';

import { Accounts } from '../../providers/providers';
import { Account } from '../../models/account';
import { Transaction } from '../../models/transaction';



import {LoginPage} from '../pages';

@IonicPage()
@Component({
  selector: 'page-account-detail',
  templateUrl: 'account-detail.html'
})
export class AccountDetailPage {
    currentAccount: Account;
    accountBalance: string;
    accountDetailReady = false;
    accountId:string = '';

constructor(public navCtrl: NavController, navParams: NavParams, public accounts: Accounts,public toastCtrl: ToastController, public modalCtrl: ModalController, public events: Events) {
    events.subscribe('user:notoken', () => {
        // user and time are the same arguments passed in `events.publish(user, time)`
        let toast = this.toastCtrl.create({
            message: "You are required to login befor access to this page",
            duration: 3000,
            position: 'top'
          });
          toast.present();
        this.navCtrl.push(LoginPage);
    });
    this.currentAccount = new Account(navParams.get('account'));
    this.accountId = this.currentAccount["identifier"];
    this.accountBalance = navParams.get('accountBalance');
    console.log("Creating Account Detail Page with "+ JSON.stringify(this.currentAccount));

}

ionViewWillEnter() {
        //Tell the main app controller we are still loading and the message to show
        this.events.publish('loading:show', 'Loading transaction data...');
        this.accountDetailReady = false;
    
        //Query the account details and handle the promise it passes us back
        this.accounts.queryTransactionsToFromAccount(this.accountId)
        .then(
            //Called if the promise is resolved with transaction lost
            (transactions: Transaction[]) => {
                //Tell the app controller we are finished loading
                this.events.publish('loading:hide');
                console.log("Received transactions for accountID: "+this.accountId + "=>" + transactions.length);
                
                //If the size of transactions array is more than zero the store them in our class variable
                if(transactions.length > 0) {
                    this.currentAccount.transactions = transactions;
                    this.accountDetailReady = true;
                } else {
                    //Else we have not receive any transactions, potentially a new account
                    this.accountDetailReady = false;
                    let toast = this.toastCtrl.create({
                        message: "There were no transactions for accountId " + this.accountId,
                        duration: 3000,
                        position: 'top'
                      });
                      toast.present();
                }
                
            })
            .catch(
            (err) => {
              //The provider is facing some issue, maybe server connectivity   
              this.accountDetailReady = false;
              this.events.publish('loading:hide');
              let toast = this.toastCtrl.create({
                    message: "Unable to retrieve transaction details: " + err.message,
                    duration: 3000,
                    position: 'top'
              });
              toast.present();
            });
    }
    
  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addTransaction() {
    let addModal = this.modalCtrl.create('TransactionCreatePage');
    addModal.onDidDismiss(transaction => {
      if (transaction) {
        this.events.publish("loading:show", 'Saving transaction information...');
        this.accountDetailReady = false;
        this.accounts.saveOneTransaction(this.accountId, transaction)
        .then((account: Account) => {
            this.events.publish("loading:hide");
            this.currentAccount = account; //refresh current account
            this.accountDetailReady = true;
        })
        .catch((resp) => {
          this.events.publish("loading:hide");
          this.accountDetailReady = false;
          let toast = this.toastCtrl.create({
            message: "Unable to save transaction details : " + resp.message,
            duration: 3000,
            position: 'top'
          });
          toast.present();
        });
      }
    })
    addModal.present();
  }
    isPositive() {
        let val:string = ""+this.accountBalance;
        return val.startsWith("-");
    }
}
