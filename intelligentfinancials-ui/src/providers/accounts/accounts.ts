import { Injectable } from '@angular/core';

import { Account } from '../../models/account';
import { Transaction } from '../../models/transaction';
import { Api } from '../api/api';

@Injectable()
export class Accounts {
  accounts: Map<string, Account> = new Map<string, Account>();
  accountBalances: Map<string, string> = new Map<string, string>();
    
  defaultAccount: any = {
    "vendor": "Default Bank",
    "profilePic": "assets/img/speakers/bear.jpg",
    "type": "savings",
      "identifier": "000"
  };
        
  constructor(public api: Api) { }

  /**
  *
  **/
  /**
  * Accounts balance query for this user
  **/
  queryBalances(params?: any) {
    //Create a promise to handle this as it is an asynchronous ttask
    let prom = new Promise((resolve, reject) => {
        //Make an API call to receive the balance information, this is an asynchronours call
        let seq = this.api.get('transactions/balance', params);
        
        //Subscribe to the response
        seq.subscribe((res: any) => {
          //console.log(JSON.stringify(res));
          // If the API returned a successful response, start parsing and adding the balances to the account
          if (res!=null && res.length > 0) {
            console.log("Server returned " + res.length + " balances");
            //For each retrieved balance add it to the corresponding account
            for(let item of res) {
                //console.log(item._id+":"+item.value);
                this.accountBalances.set(item._id, item.value);
            }
            //resolve the promise so the caller can process transactions for this account
            resolve(this.accountBalances);
          } else {
            //resolve with an empty array
            resolve(this.accountBalances);
          }
          
        }, err => {
          //Reject with an error
          reject(err);
        });       
    });

    return prom;
 }

  /**
  * Accounts list query to get all accounts for this user
  **/
  query(accountId: string = null, params?: any) {
    //Endpoint for accounts API
    let url = 'accounts';
      
    //If an accountId was specified add it to the endpoint
    if (accountId != null) url = url + "/" + accountId;

    //Create a promise to handle this as it is an asynchronous ttask
    let prom = new Promise((resolve, reject) => {
        
        //Make the API call to get an Observable
        let seq = this.api.get(url, params);

        //Subscribe the the observable response
        seq.subscribe((res: any) => {
          //console.log(JSON.stringify(res));
          // If the API returned a successful response, add all the returned accounts
          if (res!=null && res.length > 0) {
            //Assuming an array of JSON account representations, create and add each of them
            for(let item of res) {
                //Create a new object from the JSON response
                let account = new Account(item);
                //console.log("Account:"+JSON.stringify(account));
                account.profilePic = 'test.png';//TODO: Remove once added to backend
                //Add this account to the accounts list
                this.addOne(account);
            }
            //Resolve the promise with the retrieved accounts
            resolve(this.accounts);
          } else {
            //Resolve the promise with an empty account map
            resolve(this.accounts);
          }
        }, err => {
          //Reject the promise with the corresponding error
          reject(err);
        });
    });
    return prom;
 }

 queryTransactionsToFromAccount(accountId: string, params?: any) {
    //Create a promise to handle this as it is an asynchronous ttask
    let prom = new Promise((resolve, reject) => {
        //Make an API call to receive the transaction information, this is an asynchronours call
        let seq = this.api.get('transactions/toOrFromAccount/'+accountId, params);
        
        //Subscribe to the response
        seq.subscribe((res: any) => {
          //console.log(JSON.stringify(res));
          // If the API returned a successful response, start parsing and adding the transactions to the account
          if (res!=null && res.length > 0) {
            console.log("Server returned " + res.length + " transactions");
            //For each retrieved transaction add it to the corresponding account
            for(let item of res) {
                let transaction = new Transaction(item);
                //console.log("Transaction:"+JSON.stringify(transaction));
                this.addTransaction(accountId, transaction);
            }
            //resolve the promise so the caller can process transactions for this account
            resolve(this.accounts.get(accountId).transactions);
          } else {
            //resolve with an empty array
            resolve([]);
          }
          
        }, err => {
          //Reject with an error
          reject(err);
        });       
    });

    return prom;
  }

  /**
  * Add a single account to the account list
  **/
  addOne(account: Account) {
    //console.log("IDENTIFIER: " + account["identifier"]);
      this.accounts.set(account["identifier"], account);
  }

  /**
  * Saves a new account to the account list
  **/
  saveOne(account: Account) {
    //Create a promise to handle this as it is an asynchronous ttask
    let prom = new Promise((resolve, reject) => {
        let seq = this.api.post('accounts', account).share();

        seq.subscribe((res: any) => {
          console.log(res.status);
          // If the API returned a successful response, mark the user as logged in
          if (res.status == 'Account creation successful!') {
             let account = new Account(res.account);
             console.log("SAVED ACCOUNT: "+ JSON.stringify(account));
              this.addOne(account);
              resolve();
          } else {
            reject(res); //There was a response but the account could not be saved
          }
        }, err => {
            reject(err);
        }); 
    });
      
    return prom;
  }

  /**
  * Saves a new transaction
  **/
saveOneTransaction(accountId: string, transaction: Transaction) {
    //Create a promise to handle this as it is an asynchronous ttask
    let prom = new Promise((resolve, reject) => {
        let seq = this.api.post('transactions', transaction).share();

        seq.subscribe((res: any) => {
          console.log(res.status);
          // If the API returned a successful response, mark the user as logged in
          if (res.status == 'Transaction creation successful!') {
              let transaction = new Transaction(res.transaction); //Get the updated transaction object
              console.log("SAVED TRANSACTION: "+ JSON.stringify(transaction));
              this.addTransaction(transaction['accountTo'], transaction);
              this.addTransaction(transaction['accountFrom'], transaction);
              resolve(this.accounts.get(accountId));
          } else {
            reject(res); //There was a response but the account could not be saved
          }
        }, err => {
            reject(err);
        });
    });

    return prom;
  }

  /**
  * Add a single transaction to this account
  **/
  addTransaction(accountId: string, transaction: Transaction) {
    //Try to see if the account has already been retrieved before
    let account = this.accounts.get(accountId);
    if(account!= null) {
        console.log("Added transaction to account :" + accountId);
        account.transactions.push(transaction);
    } else {
        console.log("SHOULD NOT HAPPEN: Account "+accountId+" has not been retrieved before");
    }
}

  delete(account: Account) {
    this.accounts.delete(account["identifier"]);
  }

  getAll() : Map<string, Account> {
        return this.accounts;
  }

}
