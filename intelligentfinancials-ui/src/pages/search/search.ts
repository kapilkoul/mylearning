import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  ToastController, Events  } from 'ionic-angular';

import { Account } from '../../models/account';
import { Accounts } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  currentAccounts: Map<string, Account>;
  currentBalances: Map<string, string>;

  accountsReady = false;
  currentItems: Account[];


  constructor(public navCtrl: NavController, public navParams: NavParams, public accounts: Accounts, public toastCtrl: ToastController, public events: Events) { }
  /**
   * Navigate to the detail page for this item.
   */
  openAccount(account: Account) {
    //If we have the balances then open the account
    if(this.currentBalances.get(account["_id"]))
    this.navCtrl.push('AccountDetailPage', {
      account: account,
      accountBalance: this.currentBalances.get(account["_id"])
    });
  }

  ionViewWillEnter() {
        this.accountsReady = false;
        //this.events.publish("loading:show", 'Loading account list...');
        this.accounts.query()
        .then((accounts:Map<string, Account>) => {
            console.log("RECEIVED CURRENT ACCOUNTS");
            this.currentAccounts = accounts;
            console.log(this.currentAccounts.size);
            //this.events.publish("loading:hide");
            //this.events.publish("loading:show", 'Loading account balances...');
            return this.accounts.queryBalances();

        })
        .then((accountBalances:Map<string,string>) => {
            console.log("RECEIVED ACCOUNT BALANCES");
            this.currentBalances = accountBalances;
            console.log(this.currentBalances.size);
            //this.events.publish("loading:hide");
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

  /**
   * Perform a service for the proper items.
   */
  getItems(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentItems = [];
      return;
    }
    this.currentItems = this.query(val);
    //console.log("Found: " + this.currentItems.length);
  }
    
  query(param: string) {
    let items = [];
    let keys = Array.from(this.currentAccounts.keys());
    //if(this.accountsReady == false) return items;
    for(let key of keys) {
        //console.log("Key:"+key+", val: "+param);
        let account: Account = this.currentAccounts.get(key);
        //console.log(JSON.stringify(account));
        let vendor:string = account['vendor'];
        if(vendor.startsWith(param)) {
                items.push(account);
            }
    }
    return items;
  }

}
