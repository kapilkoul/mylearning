import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController, Events } from 'ionic-angular';

import { Account } from '../../models/account';
import { Accounts } from '../../providers/providers';

import {LoginPage} from '../pages';

@IonicPage()
@Component({
  selector: 'page-accountlist-master',
  templateUrl: 'accountlist-master.html',
})
export class AccountListMasterPage {
  currentAccounts: Map<string, Account>;
  currentBalances: Map<string, string>;

  accountsReady = false;

  constructor(public navCtrl: NavController, public accounts: Accounts, public modalCtrl: ModalController, public toastCtrl: ToastController, public events: Events) {
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
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addAccount() {
    let addModal = this.modalCtrl.create('AccountCreatePage');
    addModal.onDidDismiss(account => {
      if (account) {
        this.events.publish("loading:show", 'Saving account information...');
        this.accountsReady = false;
        this.accounts.saveOne(account)
        .then((account: Account) => {
            //this.currentAccounts = this.accounts.accounts;
            this.accountsReady = true;
            this.events.publish("loading:hide");
        })
        .catch((resp) => {
          //this.navCtrl.push(LoginPage);
          // Unable to get in
          this.accountsReady = false;
          this.events.publish("loading:hide");
          let toast = this.toastCtrl.create({
            message: "Unable to save account details: " + resp.message,
            duration: 3000,
            position: 'top'
          });
          toast.present();
        });
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteAccount(account) {
      this.accounts.delete(account);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openAccount(account: Account) {
    this.navCtrl.push('AccountDetailPage', {
      account: account,
      accountBalance: this.currentBalances.get(account["_id"])
    });
  }

  ionViewWillEnter() {
        this.accountsReady = false;
        this.events.publish("loading:show", 'Loading account list...');
        this.accounts.query()
        .then((accounts:Map<string, Account>) => {
            console.log("RECEIVED CURRENT ACCOUNTS");
            this.currentAccounts = accounts;
            console.log(this.currentAccounts.size);
            this.events.publish("loading:hide");
            this.events.publish("loading:show", 'Loading account balances...');
            return this.accounts.queryBalances();

        })
        .then((accountBalances:Map<string,string>) => {
            console.log("RECEIVED ACCOUNT BALANCES");
            this.currentBalances = accountBalances;
            console.log(this.currentBalances.size);
            this.events.publish("loading:hide");
            this.accountsReady = true;
        })
        .catch((err) => {
          //this.navCtrl.push(LoginPage);
          // Unable to get in
          console.log(JSON.stringify(err));
          this.accountsReady = false;
          this.events.publish("loading:hide");
          let toast = this.toastCtrl.create({
            message: "Unable to retrieve account details: " + err.message,
            duration: 3000,
            position: 'top'
          });
          toast.present();
        });
    }
    
   keys() : Array<string> {
      return Array.from(this.currentAccounts.keys());
  }
    
    isPositive(identifier) {
        let val:string = ""+this.currentBalances.get(this.currentAccounts.get(identifier)["_id"]);
        return !val.startsWith("-");
    }
    
    getBalance(identifier) {
            return this.currentBalances.get(this.currentAccounts.get(identifier)["_id"]);
    }
}
