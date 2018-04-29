webpackJsonp([8],{

/***/ 351:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchPageModule", function() { return SearchPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__search__ = __webpack_require__(370);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var SearchPageModule = (function () {
    function SearchPageModule() {
    }
    SearchPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__search__["a" /* SearchPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_3__search__["a" /* SearchPage */]),
                __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["b" /* TranslateModule */].forChild()
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_3__search__["a" /* SearchPage */]
            ]
        })
    ], SearchPageModule);
    return SearchPageModule;
}());

//# sourceMappingURL=search.module.js.map

/***/ }),

/***/ 370:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_providers__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SearchPage = (function () {
    function SearchPage(navCtrl, navParams, accounts, toastCtrl, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.accounts = accounts;
        this.toastCtrl = toastCtrl;
        this.events = events;
        this.accountsReady = false;
    }
    /**
     * Navigate to the detail page for this item.
     */
    SearchPage.prototype.openAccount = function (account) {
        //If we have the balances then open the account
        if (this.currentBalances.get(account["_id"]))
            this.navCtrl.push('AccountDetailPage', {
                account: account,
                accountBalance: this.currentBalances.get(account["_id"])
            });
    };
    SearchPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.accountsReady = false;
        //this.events.publish("loading:show", 'Loading account list...');
        this.accounts.query()
            .then(function (accounts) {
            console.log("RECEIVED CURRENT ACCOUNTS");
            _this.currentAccounts = accounts;
            console.log(_this.currentAccounts.size);
            //this.events.publish("loading:hide");
            //this.events.publish("loading:show", 'Loading account balances...');
            return _this.accounts.queryBalances();
        })
            .then(function (accountBalances) {
            console.log("RECEIVED ACCOUNT BALANCES");
            _this.currentBalances = accountBalances;
            console.log(_this.currentBalances.size);
            //this.events.publish("loading:hide");
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
    /**
     * Perform a service for the proper items.
     */
    SearchPage.prototype.getItems = function (ev) {
        var val = ev.target.value;
        if (!val || !val.trim()) {
            this.currentItems = [];
            return;
        }
        this.currentItems = this.query(val);
        //console.log("Found: " + this.currentItems.length);
    };
    SearchPage.prototype.query = function (param) {
        var items = [];
        var keys = Array.from(this.currentAccounts.keys());
        //if(this.accountsReady == false) return items;
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            //console.log("Key:"+key+", val: "+param);
            var account = this.currentAccounts.get(key);
            //console.log(JSON.stringify(account));
            var vendor = account['vendor'];
            if (vendor.startsWith(param)) {
                items.push(account);
            }
        }
        return items;
    };
    SearchPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-search',template:/*ion-inline-start:"/Users/kapilkoul/git/mylearning/intelligentfinancials-ui/src/pages/search/search.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{ \'SEARCH_TITLE\' | translate }}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-searchbar (ionInput)="getItems($event)" placeholder="{{ \'SEARCH_PLACEHOLDER\' | translate }}"></ion-searchbar>\n  <ion-list>\n    <button ion-item (click)="openAccount(account)" *ngFor="let account of currentItems">\n      <ion-avatar item-start>\n        <img [src]="account.profilePic" />\n      </ion-avatar>\n      <h2>{{account.vendor}}</h2>\n      <p>{{account.type}}</p>\n      <ion-note item-end>{{account.identifier}}</ion-note>\n    </button>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"/Users/kapilkoul/git/mylearning/intelligentfinancials-ui/src/pages/search/search.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_providers__["a" /* Accounts */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Events */]])
    ], SearchPage);
    return SearchPage;
}());

//# sourceMappingURL=search.js.map

/***/ })

});
//# sourceMappingURL=8.js.map