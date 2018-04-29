webpackJsonp([0],{

/***/ 342:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccountDetailPageModule", function() { return AccountDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__account_detail__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_pipes_orderby__ = __webpack_require__(360);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var AccountDetailPageModule = (function () {
    function AccountDetailPageModule() {
    }
    AccountDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__account_detail__["a" /* AccountDetailPage */],
                __WEBPACK_IMPORTED_MODULE_4__models_pipes_orderby__["a" /* OrderByPipe */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__account_detail__["a" /* AccountDetailPage */]),
                __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__account_detail__["a" /* AccountDetailPage */]
            ]
        })
    ], AccountDetailPageModule);
    return AccountDetailPageModule;
}());

//# sourceMappingURL=account-detail.module.js.map

/***/ }),

/***/ 359:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_providers__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_account__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages__ = __webpack_require__(226);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AccountDetailPage = (function () {
    function AccountDetailPage(navCtrl, navParams, accounts, toastCtrl, modalCtrl, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.accounts = accounts;
        this.toastCtrl = toastCtrl;
        this.modalCtrl = modalCtrl;
        this.events = events;
        this.accountDetailReady = false;
        this.accountId = '';
        events.subscribe('user:notoken', function () {
            // user and time are the same arguments passed in `events.publish(user, time)`
            var toast = _this.toastCtrl.create({
                message: "You are required to login befor access to this page",
                duration: 3000,
                position: 'top'
            });
            toast.present();
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages__["b" /* LoginPage */]);
        });
        this.currentAccount = new __WEBPACK_IMPORTED_MODULE_3__models_account__["a" /* Account */](navParams.get('account'));
        this.accountId = this.currentAccount["identifier"];
        this.accountBalance = navParams.get('accountBalance');
        console.log("Creating Account Detail Page with " + JSON.stringify(this.currentAccount));
    }
    AccountDetailPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        //Tell the main app controller we are still loading and the message to show
        this.events.publish('loading:show', 'Loading transaction data...');
        this.accountDetailReady = false;
        //Query the account details and handle the promise it passes us back
        this.accounts.queryTransactionsToFromAccount(this.accountId)
            .then(
        //Called if the promise is resolved with transaction lost
        function (transactions) {
            //Tell the app controller we are finished loading
            _this.events.publish('loading:hide');
            console.log("Received transactions for accountID: " + _this.accountId + "=>" + transactions.length);
            //If the size of transactions array is more than zero the store them in our class variable
            if (transactions.length > 0) {
                _this.currentAccount.transactions = transactions;
                _this.accountDetailReady = true;
            }
            else {
                //Else we have not receive any transactions, potentially a new account
                _this.accountDetailReady = false;
                var toast = _this.toastCtrl.create({
                    message: "There were no transactions for accountId " + _this.accountId,
                    duration: 3000,
                    position: 'top'
                });
                toast.present();
            }
        })
            .catch(function (err) {
            //The provider is facing some issue, maybe server connectivity   
            _this.accountDetailReady = false;
            _this.events.publish('loading:hide');
            var toast = _this.toastCtrl.create({
                message: "Unable to retrieve transaction details: " + err.message,
                duration: 3000,
                position: 'top'
            });
            toast.present();
        });
    };
    /**
     * Prompt the user to add a new item. This shows our ItemCreatePage in a
     * modal and then adds the new item to our data source if the user created one.
     */
    AccountDetailPage.prototype.addTransaction = function () {
        var _this = this;
        var addModal = this.modalCtrl.create('TransactionCreatePage');
        addModal.onDidDismiss(function (transaction) {
            if (transaction) {
                _this.events.publish("loading:show", 'Saving transaction information...');
                _this.accountDetailReady = false;
                _this.accounts.saveOneTransaction(_this.accountId, transaction)
                    .then(function (account) {
                    _this.events.publish("loading:hide");
                    _this.currentAccount = account; //refresh current account
                    _this.accountDetailReady = true;
                })
                    .catch(function (resp) {
                    _this.events.publish("loading:hide");
                    _this.accountDetailReady = false;
                    var toast = _this.toastCtrl.create({
                        message: "Unable to save transaction details : " + resp.message,
                        duration: 3000,
                        position: 'top'
                    });
                    toast.present();
                });
            }
        });
        addModal.present();
    };
    AccountDetailPage.prototype.isPositive = function () {
        var val = "" + this.accountBalance;
        return val.startsWith("-");
    };
    AccountDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-account-detail',template:/*ion-inline-start:"/Users/kapilkoul/git/mylearning/intelligentfinancials-ui/src/pages/account-detail/account-detail.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{ currentAccount.vendor }} {{currentAccount.type}}#{{currentAccount.identifier}}</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="addTransaction()">\n        <ion-icon name="add"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <div class="account-profile" text-center #profilePic [style.background-image]="\'url(\' + currentAccount.profilePic + \')\'">\n  </div>\n  <div>\n      <h2 *ngIf="isPositive()" ion-text color="danger">Current Balance : {{accountBalance | currency:\'INR\':true}}</h2>\n    <h2 *ngIf=\'isPositive()==false\' ion-text color="danger">Current Balance : {{accountBalance | currency:\'INR\':true}}</h2>\n  </div>\n  <ion-list *ngIf="accountDetailReady">\n    <ion-item-sliding *ngFor="let transaction of currentAccount.transactions | orderBy:\'date\'">\n      <button ion-item>\n        <h2 item-start>{{transaction.date | date: \'dd-MMM-yyyy H:mm\'}}</h2>\n        <p>{{transaction.accountFrom}} -> {{transaction.accountTo}}</p>\n        <p>{{transaction.text}}</p>\n        <h2 *ngIf="currentAccount.identifier === transaction.accountTo" item-end style="font-size:150%" ion-text color="secondary">{{transaction.amount | currency:\'INR\':true}}</h2>\n        <h2 *ngIf="currentAccount.identifier === transaction.accountFrom" item-end style="font-size:150%" ion-text color="danger">{{-transaction.amount | currency:\'INR\':true}}</h2>\n      </button>\n\n      <ion-item-options>\n        <button ion-button color="danger">\n          {{ \'DELETE_BUTTON\' | translate }}\n        </button>\n      </ion-item-options>\n    </ion-item-sliding>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"/Users/kapilkoul/git/mylearning/intelligentfinancials-ui/src/pages/account-detail/account-detail.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_providers__["a" /* Accounts */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */]])
    ], AccountDetailPage);
    return AccountDetailPage;
}());

//# sourceMappingURL=account-detail.js.map

/***/ }),

/***/ 360:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderByPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var OrderByPipe = (function () {
    function OrderByPipe() {
    }
    OrderByPipe.prototype.transform = function (value, field) {
        if (value == null) {
            return null;
        }
        if (field.startsWith("-")) {
            field = field.substring(1);
            if (typeof value[field] === 'string' || value[field] instanceof String) {
                return value.slice().sort(function (a, b) { return b[field].localeCompare(a[field]); });
            }
            return value.slice().sort(function (a, b) { return b[field] - a[field]; });
        }
        else {
            if (typeof value[field] === 'string' || value[field] instanceof String) {
                return value.slice().sort(function (a, b) { return -b[field].localeCompare(a[field]); });
            }
            return value.slice().sort(function (a, b) { return a[field] - b[field]; });
        }
    };
    OrderByPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({ name: 'orderBy' })
    ], OrderByPipe);
    return OrderByPipe;
}());

//# sourceMappingURL=orderby.js.map

/***/ })

});
//# sourceMappingURL=0.js.map