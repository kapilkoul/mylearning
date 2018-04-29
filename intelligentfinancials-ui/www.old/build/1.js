webpackJsonp([1],{

/***/ 343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccountListMasterPageModule", function() { return AccountListMasterPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__accountlist_master__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_pipes_accountspipe__ = __webpack_require__(362);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var AccountListMasterPageModule = (function () {
    function AccountListMasterPageModule() {
    }
    AccountListMasterPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__accountlist_master__["a" /* AccountListMasterPage */],
                __WEBPACK_IMPORTED_MODULE_4__models_pipes_accountspipe__["a" /* AccountsPipe */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__accountlist_master__["a" /* AccountListMasterPage */]),
                __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__accountlist_master__["a" /* AccountListMasterPage */]
            ]
        })
    ], AccountListMasterPageModule);
    return AccountListMasterPageModule;
}());

//# sourceMappingURL=accountlist-master.module.js.map

/***/ }),

/***/ 361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountListMasterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_providers__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages__ = __webpack_require__(226);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AccountListMasterPage = (function () {
    function AccountListMasterPage(navCtrl, accounts, modalCtrl, toastCtrl, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.accounts = accounts;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.events = events;
        this.accountsReady = false;
        events.subscribe('user:notoken', function () {
            // user and time are the same arguments passed in `events.publish(user, time)`
            var toast = _this.toastCtrl.create({
                message: "You are required to login befor access to this page",
                duration: 3000,
                position: 'top'
            });
            toast.present();
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages__["b" /* LoginPage */]);
        });
    }
    /**
     * The view loaded, let's query our items for the list
     */
    AccountListMasterPage.prototype.ionViewDidLoad = function () {
    };
    /**
     * Prompt the user to add a new item. This shows our ItemCreatePage in a
     * modal and then adds the new item to our data source if the user created one.
     */
    AccountListMasterPage.prototype.addAccount = function () {
        var _this = this;
        var addModal = this.modalCtrl.create('AccountCreatePage');
        addModal.onDidDismiss(function (account) {
            if (account) {
                _this.events.publish("loading:show", 'Saving account information...');
                _this.accountsReady = false;
                _this.accounts.saveOne(account)
                    .then(function (account) {
                    //this.currentAccounts = this.accounts.accounts;
                    _this.accountsReady = true;
                    _this.events.publish("loading:hide");
                })
                    .catch(function (resp) {
                    //this.navCtrl.push(LoginPage);
                    // Unable to get in
                    _this.accountsReady = false;
                    _this.events.publish("loading:hide");
                    var toast = _this.toastCtrl.create({
                        message: "Unable to save account details: " + resp.message,
                        duration: 3000,
                        position: 'top'
                    });
                    toast.present();
                });
            }
        });
        addModal.present();
    };
    /**
     * Delete an item from the list of items.
     */
    AccountListMasterPage.prototype.deleteAccount = function (account) {
        this.accounts.delete(account);
    };
    /**
     * Navigate to the detail page for this item.
     */
    AccountListMasterPage.prototype.openAccount = function (account) {
        this.navCtrl.push('AccountDetailPage', {
            account: account,
            accountBalance: this.currentBalances.get(account["_id"])
        });
    };
    AccountListMasterPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.accountsReady = false;
        this.events.publish("loading:show", 'Loading account list...');
        this.accounts.query()
            .then(function (accounts) {
            console.log("RECEIVED CURRENT ACCOUNTS");
            _this.currentAccounts = accounts;
            console.log(_this.currentAccounts.size);
            _this.events.publish("loading:hide");
            _this.events.publish("loading:show", 'Loading account balances...');
            return _this.accounts.queryBalances();
        })
            .then(function (accountBalances) {
            console.log("RECEIVED ACCOUNT BALANCES");
            _this.currentBalances = accountBalances;
            console.log(_this.currentBalances.size);
            _this.events.publish("loading:hide");
            _this.accountsReady = true;
        })
            .catch(function (err) {
            //this.navCtrl.push(LoginPage);
            // Unable to get in
            console.log(JSON.stringify(err));
            _this.accountsReady = false;
            _this.events.publish("loading:hide");
            var toast = _this.toastCtrl.create({
                message: "Unable to retrieve account details: " + err.message,
                duration: 3000,
                position: 'top'
            });
            toast.present();
        });
    };
    AccountListMasterPage.prototype.keys = function () {
        return Array.from(this.currentAccounts.keys());
    };
    AccountListMasterPage.prototype.isPositive = function (identifier) {
        var val = "" + this.currentBalances.get(this.currentAccounts.get(identifier)["_id"]);
        return !val.startsWith("-");
    };
    AccountListMasterPage.prototype.getBalance = function (identifier) {
        return this.currentBalances.get(this.currentAccounts.get(identifier)["_id"]);
    };
    AccountListMasterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-accountlist-master',template:/*ion-inline-start:"/Users/kapilkoul/git/mylearning/intelligentfinancials-ui/src/pages/accounts/accountlist-master.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{ \'ACCOUNTLIST_MASTER_TITLE\' | translate }}</ion-title>\n\n    <ion-buttons end>\n      <button ion-button icon-only (click)="addAccount()">\n        <ion-icon name="add"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n  <ion-list *ngIf="accountsReady">\n    <ion-list-header>\n      Your account list\n    </ion-list-header>\n    <ion-item-sliding *ngFor="let identifier of keys()">\n\n       <button ion-item (click)="openAccount(currentAccounts.get(identifier))">\n            <ion-avatar item-start>\n              <img [src]="currentAccounts.get(identifier).profilePic" />\n            </ion-avatar>\n            <h2>{{currentAccounts.get(identifier).vendor}}</h2>\n            <p>{{currentAccounts.get(identifier).type}} Account# {{identifier}}</p>\n            \n            <h2 *ngIf="isPositive(identifier)" item-end style="font-size:150%" ion-text color="secondary">{{getBalance(identifier) | currency:\'INR\':true}}</h2>\n           <h2 *ngIf="!isPositive(identifier)" item-end style="font-size:150%" ion-text color="danger">{{getBalance(identifier) | currency:\'INR\':true}}</h2>\n      </button>   \n\n      <ion-item-options>\n        <button ion-button color="danger" (click)="deleteAccount(currentAccounts.get(identifier))">\n          {{ \'DELETE_BUTTON\' | translate }}\n        </button>\n      </ion-item-options>\n    </ion-item-sliding>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"/Users/kapilkoul/git/mylearning/intelligentfinancials-ui/src/pages/accounts/accountlist-master.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_providers__["a" /* Accounts */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */]])
    ], AccountListMasterPage);
    return AccountListMasterPage;
}());

//# sourceMappingURL=accountlist-master.js.map

/***/ }),

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountsPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AccountsPipe = (function () {
    function AccountsPipe() {
    }
    AccountsPipe.prototype.transform = function (value, args) {
        if (args === void 0) { args = null; }
        return Object.keys(value).map(function (key) { return value[key]; });
    };
    AccountsPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({ name: 'accountlist' })
    ], AccountsPipe);
    return AccountsPipe;
}());

//# sourceMappingURL=accountspipe.js.map

/***/ })

});
//# sourceMappingURL=1.js.map