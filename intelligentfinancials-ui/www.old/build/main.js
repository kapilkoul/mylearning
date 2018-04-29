webpackJsonp([17],{

/***/ 134:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 134;

/***/ }),

/***/ 185:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/account-create/account-create.module": [
		341,
		16
	],
	"../pages/account-detail/account-detail.module": [
		342,
		0
	],
	"../pages/accounts/accountlist-master.module": [
		343,
		1
	],
	"../pages/cards/cards.module": [
		344,
		15
	],
	"../pages/content/content.module": [
		345,
		14
	],
	"../pages/item-create/item-create.module": [
		346,
		13
	],
	"../pages/item-detail/item-detail.module": [
		347,
		12
	],
	"../pages/list-master/list-master.module": [
		348,
		11
	],
	"../pages/login/login.module": [
		350,
		10
	],
	"../pages/menu/menu.module": [
		349,
		9
	],
	"../pages/search/search.module": [
		351,
		8
	],
	"../pages/settings/settings.module": [
		352,
		7
	],
	"../pages/signup/signup.module": [
		353,
		6
	],
	"../pages/tabs/tabs.module": [
		354,
		5
	],
	"../pages/transaction-create/transaction-create.module": [
		355,
		4
	],
	"../pages/tutorial/tutorial.module": [
		356,
		3
	],
	"../pages/welcome/welcome.module": [
		357,
		2
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 185;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 186:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Items; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_item__ = __webpack_require__(310);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Items = (function () {
    function Items() {
        this.items = [];
        this.defaultItem = {
            "name": "Burt Bear",
            "profilePic": "assets/img/speakers/bear.jpg",
            "about": "Burt is a Bear.",
        };
        var items = [
            {
                "name": "Burt Bear",
                "profilePic": "assets/img/speakers/bear.jpg",
                "about": "Burt is a Bear."
            },
            {
                "name": "Charlie Cheetah",
                "profilePic": "assets/img/speakers/cheetah.jpg",
                "about": "Charlie is a Cheetah."
            },
            {
                "name": "Donald Duck",
                "profilePic": "assets/img/speakers/duck.jpg",
                "about": "Donald is a Duck."
            },
            {
                "name": "Eva Eagle",
                "profilePic": "assets/img/speakers/eagle.jpg",
                "about": "Eva is an Eagle."
            },
            {
                "name": "Ellie Elephant",
                "profilePic": "assets/img/speakers/elephant.jpg",
                "about": "Ellie is an Elephant."
            },
            {
                "name": "Molly Mouse",
                "profilePic": "assets/img/speakers/mouse.jpg",
                "about": "Molly is a Mouse."
            },
            {
                "name": "Paul Puppy",
                "profilePic": "assets/img/speakers/puppy.jpg",
                "about": "Paul is a Puppy."
            }
        ];
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            this.items.push(new __WEBPACK_IMPORTED_MODULE_1__models_item__["a" /* Item */](item));
        }
    }
    Items.prototype.query = function (params) {
        if (!params) {
            return this.items;
        }
        return this.items.filter(function (item) {
            for (var key in params) {
                var field = item[key];
                if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
                    return item;
                }
                else if (field == params[key]) {
                    return item;
                }
            }
            return null;
        });
    };
    Items.prototype.add = function (item) {
        this.items.push(item);
    };
    Items.prototype.delete = function (item) {
        this.items.splice(this.items.indexOf(item), 1);
    };
    Items = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], Items);
    return Items;
}());

//# sourceMappingURL=items.js.map

/***/ }),

/***/ 226:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirstRunPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return MainPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return LoginPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return Tab1Root; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return Tab2Root; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return Tab3Root; });
// The page the user lands on after opening the app and without a session
var FirstRunPage = 'WelcomePage';
// The main page the user will see as they use the app over a long period of time.
// Change this if not using tabs
var MainPage = 'TabsPage';
var LoginPage = 'LoginPage';
// The initial root pages for our tabs (remove if not using tabs)
var Tab1Root = 'AccountListMasterPage';
var Tab2Root = 'SearchPage';
var Tab3Root = 'SettingsPage';
//# sourceMappingURL=pages.js.map

/***/ }),

/***/ 228:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Account; });
var Account = (function () {
    function Account(res) {
        this.profilePic = '';
        this.transactions = [];
        // Quick and dirty extend/assign fields to this model
        for (var f in res) {
            this[f] = res[f];
        }
    }
    return Account;
}());

//# sourceMappingURL=account.js.map

/***/ }),

/***/ 229:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(243);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 243:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createTranslateLoader */
/* unused harmony export provideSettings */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ngx_translate_http_loader__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ionic_angular__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__mocks_providers_items__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_providers__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_component__ = __webpack_require__(340);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


















// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_8__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
function provideSettings(storage) {
    /**
     * The Settings provider takes a set of default settings for your app.
     *
     * You can add new settings options at any time. Once the settings are saved,
     * these values will not overwrite the saved values (this can be done manually if desired).
     */
    return new __WEBPACK_IMPORTED_MODULE_11__providers_providers__["f" /* Settings */](storage, {
        apiURL: 'https://intelligentfinancials.mybluemix.net',
        authtoken: ''
    });
}
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* MyApp */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: (createTranslateLoader),
                        deps: [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["b" /* HttpClient */]]
                    }
                }),
                __WEBPACK_IMPORTED_MODULE_9_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/account-create/account-create.module#AccountCreatePageModule', name: 'AccountCreatePage', segment: 'account-create', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/account-detail/account-detail.module#AccountDetailPageModule', name: 'AccountDetailPage', segment: 'account-detail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/accounts/accountlist-master.module#AccountListMasterPageModule', name: 'AccountListMasterPage', segment: 'accountlist-master', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/cards/cards.module#CardsPageModule', name: 'CardsPage', segment: 'cards', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/content/content.module#ContentPageModule', name: 'ContentPage', segment: 'content', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/item-create/item-create.module#ItemCreatePageModule', name: 'ItemCreatePage', segment: 'item-create', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/item-detail/item-detail.module#ItemDetailPageModule', name: 'ItemDetailPage', segment: 'item-detail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/list-master/list-master.module#ListMasterPageModule', name: 'ListMasterPage', segment: 'list-master', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/menu/menu.module#MenuPageModule', name: 'MenuPage', segment: 'menu', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/search/search.module#SearchPageModule', name: 'SearchPage', segment: 'search', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/settings/settings.module#SettingsPageModule', name: 'SettingsPage', segment: 'settings', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/signup/signup.module#SignupPageModule', name: 'SignupPage', segment: 'signup', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/tabs/tabs.module#TabsPageModule', name: 'TabsPage', segment: 'tabs', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/transaction-create/transaction-create.module#TransactionCreatePageModule', name: 'TransactionCreatePage', segment: 'transaction-create', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/tutorial/tutorial.module#TutorialPageModule', name: 'TutorialPage', segment: 'tutorial', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/welcome/welcome.module#WelcomePageModule', name: 'WelcomePage', segment: 'welcome', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_9_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* MyApp */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_11__providers_providers__["b" /* Api */],
                __WEBPACK_IMPORTED_MODULE_10__mocks_providers_items__["a" /* Items */],
                __WEBPACK_IMPORTED_MODULE_11__providers_providers__["g" /* User */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
                { provide: __WEBPACK_IMPORTED_MODULE_11__providers_providers__["f" /* Settings */], useFactory: provideSettings, deps: [__WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */]] },
                // Keep this to enable Ionic's runtime error handling during development
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_9_ionic_angular__["d" /* IonicErrorHandler */] },
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HTTP_INTERCEPTORS */], useClass: __WEBPACK_IMPORTED_MODULE_11__providers_providers__["c" /* AuthInterceptor */], multi: true },
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HTTP_INTERCEPTORS */], useClass: __WEBPACK_IMPORTED_MODULE_11__providers_providers__["e" /* NotAuthInterceptor */], multi: true },
                __WEBPACK_IMPORTED_MODULE_11__providers_providers__["a" /* Accounts */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 25:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_api__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mocks_providers_items__ = __webpack_require__(186);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__settings_settings__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user_user__ = __webpack_require__(311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__interceptor_authinterceptor__ = __webpack_require__(313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__interceptor_notauthinterceptor__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__accounts_accounts__ = __webpack_require__(321);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__api_api__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_1__mocks_providers_items__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_2__settings_settings__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_3__user_user__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_4__interceptor_authinterceptor__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_5__interceptor_notauthinterceptor__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_6__accounts_accounts__["a"]; });








//# sourceMappingURL=providers.js.map

/***/ }),

/***/ 310:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Item; });
/**
 * A generic model that our Master-Detail pages list, create, and delete.
 *
 * Change "Item" to the noun your app will use. For example, a "Contact," or a
 * "Customer," or a "Animal," or something like that.
 *
 * The Items service manages creating instances of Item, so go ahead and rename
 * that something that fits your app as well.
 */
var Item = (function () {
    function Item(fields) {
        // Quick and dirty extend/assign fields to this model
        for (var f in fields) {
            this[f] = fields[f];
        }
    }
    return Item;
}());

//# sourceMappingURL=item.js.map

/***/ }),

/***/ 311:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_toPromise__ = __webpack_require__(312);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_api__ = __webpack_require__(98);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
var User = (function () {
    function User(api) {
        this.api = api;
        //Make these methods safe
    }
    /**
     * Send a POST request to our login endpoint with the data
     * the user entered on the form.
     */
    User.prototype.login = function (accountInfo) {
        var _this = this;
        //Create a promise to handle this as it is an asynchronous ttask
        var prom = new Promise(function (resolve, reject) {
            var seq = _this.api.post('users/login', accountInfo).share();
            seq.subscribe(function (res) {
                console.log(res.status);
                // If the API returned a successful response, mark the user as logged in
                if (res.status == 'Login successful!') {
                    _this._loggedIn(res);
                    resolve(res);
                }
                else {
                    reject(res);
                }
            }, function (err) {
                reject(err);
            });
        });
        return prom;
    };
    /**
     * Send a POST request to our signup endpoint with the data
     * the user entered on the form.
     */
    User.prototype.signup = function (accountInfo) {
        var _this = this;
        this.logout(); //logout anyone who is still there
        //Create a promise to handle this as it is an asynchronous ttask
        var prom = new Promise(function (resolve, reject) {
            var seq = _this.api.post('users/register', accountInfo).share();
            seq.subscribe(function (res) {
                console.log(res.status);
                // If the API returned a successful response, mark the user as logged in
                if (res.status == 'Registration Successful!') {
                    resolve(res);
                }
                else {
                    reject(res);
                }
            }, function (err) {
                reject(err);
            });
        });
        return prom;
    };
    /**
     * Log the user out, which forgets the session
     */
    User.prototype.logout = function () {
        this.api.resetauthtoken('');
        this._user = null;
    };
    /**
     * Process a login/signup response to store user data
     */
    User.prototype._loggedIn = function (resp) {
        this.api.resetauthtoken(resp.token);
        this._user = resp.user;
    };
    User = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__api_api__["a" /* Api */]])
    ], User);
    return User;
}());

//# sourceMappingURL=user.js.map

/***/ }),

/***/ 313:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthInterceptor; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_fromPromise__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_fromPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_fromPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_mergeMap__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_mergeMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_mergeMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__settings_settings__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(43);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AuthInterceptor = (function () {
    function AuthInterceptor(settings, events) {
        this.settings = settings;
        this.events = events;
    }
    AuthInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].fromPromise(this.settings.getValue('authtoken')).mergeMap(function (authtoken) {
            if (authtoken == undefined || authtoken == null) {
                console.log('notoken found');
                _this.events.publish('user:notoken');
                return next.handle(req);
            }
            console.log("Adding token to request:" + authtoken);
            // Clone the request to add the new header.
            var authReq = req.clone({ headers: req.headers.set('x-access-token', authtoken) });
            // Pass on the cloned request instead of the original request.
            return next.handle(authReq);
        });
    };
    AuthInterceptor = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__settings_settings__["a" /* Settings */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["b" /* Events */]])
    ], AuthInterceptor);
    return AuthInterceptor;
}());

//# sourceMappingURL=authinterceptor.js.map

/***/ }),

/***/ 317:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotAuthInterceptor; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_do__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(43);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NotAuthInterceptor = (function () {
    function NotAuthInterceptor(events) {
        this.events = events;
    }
    NotAuthInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        return next.handle(req).do(function (event) {
            if (event instanceof __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["f" /* HttpResponse */]) {
                // do stuff with response if you want
                console.log('Authorised response');
            }
        }, function (err) {
            if (err instanceof __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpErrorResponse */]) {
                if (err.status === 401) {
                    // redirect to the login route
                    // or show a modal
                    console.log('Unauthorised response');
                    _this.events.publish('user:unauthorised');
                }
            }
        });
    };
    NotAuthInterceptor = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* Events */]])
    ], NotAuthInterceptor);
    return NotAuthInterceptor;
}());

//# sourceMappingURL=notauthinterceptor.js.map

/***/ }),

/***/ 321:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Accounts; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_account__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_transaction__ = __webpack_require__(322);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_api__ = __webpack_require__(98);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var Accounts = (function () {
    function Accounts(api) {
        this.api = api;
        this.accounts = new Map();
        this.accountBalances = new Map();
        this.defaultAccount = {
            "vendor": "Default Bank",
            "profilePic": "assets/img/speakers/bear.jpg",
            "type": "savings",
            "identifier": "000"
        };
    }
    /**
    *
    **/
    /**
    * Accounts balance query for this user
    **/
    Accounts.prototype.queryBalances = function (params) {
        var _this = this;
        //Create a promise to handle this as it is an asynchronous ttask
        var prom = new Promise(function (resolve, reject) {
            //Make an API call to receive the balance information, this is an asynchronours call
            var seq = _this.api.get('transactions/balance', params);
            //Subscribe to the response
            seq.subscribe(function (res) {
                //console.log(JSON.stringify(res));
                // If the API returned a successful response, start parsing and adding the balances to the account
                if (res != null && res.length > 0) {
                    console.log("Server returned " + res.length + " balances");
                    //For each retrieved balance add it to the corresponding account
                    for (var _i = 0, res_1 = res; _i < res_1.length; _i++) {
                        var item = res_1[_i];
                        //console.log(item._id+":"+item.value);
                        _this.accountBalances.set(item._id, item.value);
                    }
                    //resolve the promise so the caller can process transactions for this account
                    resolve(_this.accountBalances);
                }
                else {
                    //resolve with an empty array
                    resolve(_this.accountBalances);
                }
            }, function (err) {
                //Reject with an error
                reject(err);
            });
        });
        return prom;
    };
    /**
    * Accounts list query to get all accounts for this user
    **/
    Accounts.prototype.query = function (accountId, params) {
        var _this = this;
        if (accountId === void 0) { accountId = null; }
        //Endpoint for accounts API
        var url = 'accounts';
        //If an accountId was specified add it to the endpoint
        if (accountId != null)
            url = url + "/" + accountId;
        //Create a promise to handle this as it is an asynchronous ttask
        var prom = new Promise(function (resolve, reject) {
            //Make the API call to get an Observable
            var seq = _this.api.get(url, params);
            //Subscribe the the observable response
            seq.subscribe(function (res) {
                //console.log(JSON.stringify(res));
                // If the API returned a successful response, add all the returned accounts
                if (res != null && res.length > 0) {
                    //Assuming an array of JSON account representations, create and add each of them
                    for (var _i = 0, res_2 = res; _i < res_2.length; _i++) {
                        var item = res_2[_i];
                        //Create a new object from the JSON response
                        var account = new __WEBPACK_IMPORTED_MODULE_1__models_account__["a" /* Account */](item);
                        //console.log("Account:"+JSON.stringify(account));
                        account.profilePic = 'test.png'; //TODO: Remove once added to backend
                        //Add this account to the accounts list
                        _this.addOne(account);
                    }
                    //Resolve the promise with the retrieved accounts
                    resolve(_this.accounts);
                }
                else {
                    //Resolve the promise with an empty account map
                    resolve(_this.accounts);
                }
            }, function (err) {
                //Reject the promise with the corresponding error
                reject(err);
            });
        });
        return prom;
    };
    Accounts.prototype.queryTransactionsToFromAccount = function (accountId, params) {
        var _this = this;
        //Create a promise to handle this as it is an asynchronous ttask
        var prom = new Promise(function (resolve, reject) {
            //Make an API call to receive the transaction information, this is an asynchronours call
            var seq = _this.api.get('transactions/toOrFromAccount/' + accountId, params);
            //Subscribe to the response
            seq.subscribe(function (res) {
                //console.log(JSON.stringify(res));
                // If the API returned a successful response, start parsing and adding the transactions to the account
                if (res != null && res.length > 0) {
                    console.log("Server returned " + res.length + " transactions");
                    //For each retrieved transaction add it to the corresponding account
                    for (var _i = 0, res_3 = res; _i < res_3.length; _i++) {
                        var item = res_3[_i];
                        var transaction = new __WEBPACK_IMPORTED_MODULE_2__models_transaction__["a" /* Transaction */](item);
                        //console.log("Transaction:"+JSON.stringify(transaction));
                        _this.addTransaction(accountId, transaction);
                    }
                    //resolve the promise so the caller can process transactions for this account
                    resolve(_this.accounts.get(accountId).transactions);
                }
                else {
                    //resolve with an empty array
                    resolve([]);
                }
            }, function (err) {
                //Reject with an error
                reject(err);
            });
        });
        return prom;
    };
    /**
    * Add a single account to the account list
    **/
    Accounts.prototype.addOne = function (account) {
        //console.log("IDENTIFIER: " + account["identifier"]);
        this.accounts.set(account["identifier"], account);
    };
    /**
    * Saves a new account to the account list
    **/
    Accounts.prototype.saveOne = function (account) {
        var _this = this;
        //Create a promise to handle this as it is an asynchronous ttask
        var prom = new Promise(function (resolve, reject) {
            var seq = _this.api.post('accounts', account).share();
            seq.subscribe(function (res) {
                console.log(res.status);
                // If the API returned a successful response, mark the user as logged in
                if (res.status == 'Account creation successful!') {
                    var account_1 = new __WEBPACK_IMPORTED_MODULE_1__models_account__["a" /* Account */](res.account);
                    console.log("SAVED ACCOUNT: " + JSON.stringify(account_1));
                    _this.addOne(account_1);
                    resolve();
                }
                else {
                    reject(res); //There was a response but the account could not be saved
                }
            }, function (err) {
                reject(err);
            });
        });
        return prom;
    };
    /**
    * Saves a new transaction
    **/
    Accounts.prototype.saveOneTransaction = function (accountId, transaction) {
        var _this = this;
        //Create a promise to handle this as it is an asynchronous ttask
        var prom = new Promise(function (resolve, reject) {
            var seq = _this.api.post('transactions', transaction).share();
            seq.subscribe(function (res) {
                console.log(res.status);
                // If the API returned a successful response, mark the user as logged in
                if (res.status == 'Transaction creation successful!') {
                    var transaction_1 = new __WEBPACK_IMPORTED_MODULE_2__models_transaction__["a" /* Transaction */](res.transaction); //Get the updated transaction object
                    console.log("SAVED TRANSACTION: " + JSON.stringify(transaction_1));
                    _this.addTransaction(transaction_1['accountTo'], transaction_1);
                    _this.addTransaction(transaction_1['accountFrom'], transaction_1);
                    resolve(_this.accounts.get(accountId));
                }
                else {
                    reject(res); //There was a response but the account could not be saved
                }
            }, function (err) {
                reject(err);
            });
        });
        return prom;
    };
    /**
    * Add a single transaction to this account
    **/
    Accounts.prototype.addTransaction = function (accountId, transaction) {
        //Try to see if the account has already been retrieved before
        var account = this.accounts.get(accountId);
        if (account != null) {
            console.log("Added transaction to account :" + accountId);
            account.transactions.push(transaction);
        }
        else {
            console.log("SHOULD NOT HAPPEN: Account " + accountId + " has not been retrieved before");
        }
    };
    Accounts.prototype.delete = function (account) {
        this.accounts.delete(account["identifier"]);
    };
    Accounts.prototype.getAll = function () {
        return this.accounts;
    };
    Accounts = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__api_api__["a" /* Api */]])
    ], Accounts);
    return Accounts;
}());

//# sourceMappingURL=accounts.js.map

/***/ }),

/***/ 322:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Transaction; });
/**
 * A generic model that our Master-Detail pages list, create, and delete.
 *
 * Change "Item" to the noun your app will use. For example, a "Contact," or a
 * "Customer," or a "Animal," or something like that.
 *
 * The Items service manages creating instances of Item, so go ahead and rename
 * that something that fits your app as well.
 */
var Transaction = (function () {
    function Transaction(res) {
        // Quick and dirty extend/assign fields to this model
        for (var f in res) {
            //Repalce account objects with their identifiers
            if ((f === 'accountTo' || f === 'accountFrom') && (res[f] instanceof Object)) {
                //console.log("Found : " +f);
                this[f] = "" + (res[f].identifier);
            }
            else
                this[f] = res[f];
        }
        //console.log("Transaction:"+JSON.stringify(this));
    }
    return Transaction;
}());

//# sourceMappingURL=transaction.js.map

/***/ }),

/***/ 340:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_splash_screen__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_pages__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_providers__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = (function () {
    function MyApp(translate, platform, settings, config, statusBar, splashScreen, loadingCtrl, events) {
        var _this = this;
        this.translate = translate;
        this.config = config;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.loadingCtrl = loadingCtrl;
        this.events = events;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_pages__["a" /* FirstRunPage */];
        this.loading = null;
        this.pages = [
            /**
            { title: 'Tutorial', component: 'TutorialPage' },
            { title: 'Welcome', component: 'WelcomePage' },
            { title: 'Tabs', component: 'TabsPage' },
            { title: 'Cards', component: 'CardsPage' },
            { title: 'Content', component: 'ContentPage' },
            { title: 'Login', component: 'LoginPage' },
            { title: 'Signup', component: 'SignupPage' },
            { title: 'Master Detail', component: 'ListMasterPage' },
            { title: 'Menu', component: 'MenuPage' },
            { title: 'Settings', component: 'SettingsPage' },
            { title: 'Search', component: 'SearchPage' }
            **/
            { title: 'Login', component: 'LoginPage' },
            { title: 'Search', component: 'SearchPage' },
            { title: 'My Account', component: 'AccountListMasterPage' },
            { title: 'Signup', component: 'SignupPage' },
            { title: 'Settings', component: 'SettingsPage' }
        ];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
        this.initTranslate();
        this.events.subscribe('loading:show', function (message) {
            _this.loading = _this.loadingCtrl.create({
                spinner: 'bubbles',
                content: message
            });
            _this.loading.present();
        });
        this.events.subscribe('loading:hide', function () {
            _this.loading.dismiss();
        });
    }
    MyApp.prototype.initTranslate = function () {
        var _this = this;
        // Set the default language for translation strings, and the current language.
        this.translate.setDefaultLang('en');
        /**if (this.translate.getBrowserLang() !== undefined) {
          this.translate.use(this.translate.getBrowserLang());
        } else {
          this.translate.use('en'); // Set your language here
        }**/
        this.translate.use('en'); //Fix the language
        this.translate.get(['BACK_BUTTON_TEXT']).subscribe(function (values) {
            _this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["j" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["j" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            template: "<ion-menu [content]=\"content\">\n    <ion-header>\n      <ion-toolbar>\n        <ion-title>Pages are ridiculously long</ion-title>\n      </ion-toolbar>\n    </ion-header>\n\n    <ion-content>\n      <ion-list>\n        <button menuClose ion-item *ngFor=\"let p of pages\" (click)=\"openPage(p)\">\n          {{p.title}}\n        </button>\n      </ion-list>\n    </ion-content>\n\n  </ion-menu>\n  <ion-nav id=\"nav\" #content [root]=\"rootPage\" swipeBackEnabled=\"false\"></ion-nav>"
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_6__providers_providers__["f" /* Settings */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_1__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* Events */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 98:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Api; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__settings_settings__ = __webpack_require__(99);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Api is a generic REST Api handler. Set your API url first.
 */
var Api = (function () {
    function Api(http, settings) {
        var _this = this;
        this.http = http;
        this.settings = settings;
        this.url = 'https://example.com/api/v1';
        this.authtoken = '';
        //Load the settings first and then set the value
        this.settings.load().then(function () {
            var mySettings = _this.settings.allSettings;
            _this.url = mySettings['apiURL'];
            _this.authtoken = mySettings['authtoken'];
        });
        //Make these method this safe
        this.resetauthtoken.bind(this);
        this.get.bind(this);
        this.post.bind(this);
        this.put.bind(this);
        this.delete.bind(this);
        this.patch.bind(this);
    }
    Api.prototype.get = function (endpoint, params, reqOpts) {
        reqOpts = this.getHttpReqOptions(params, reqOpts);
        console.log('Getting at : ' + this.url + '/' + endpoint + '?' + JSON.stringify(reqOpts));
        return this.http.get(this.url + '/' + endpoint, reqOpts);
    };
    Api.prototype.post = function (endpoint, body, reqOpts) {
        reqOpts = this.getHttpReqOptions(null, reqOpts);
        console.log('Posting at : ' + this.url + '/' + endpoint + '?' + JSON.stringify(reqOpts));
        return this.http.post(this.url + '/' + endpoint, body, reqOpts);
    };
    Api.prototype.put = function (endpoint, body, reqOpts) {
        reqOpts = this.getHttpReqOptions(null, reqOpts);
        console.log('Putting at : ' + this.url + '/' + endpoint + '?' + JSON.stringify(reqOpts));
        return this.http.put(this.url + '/' + endpoint, body, reqOpts);
    };
    Api.prototype.delete = function (endpoint, reqOpts) {
        reqOpts = this.getHttpReqOptions(null, reqOpts);
        console.log('Deleting at : ' + this.url + '/' + endpoint + '?' + JSON.stringify(reqOpts));
        return this.http.delete(this.url + '/' + endpoint, reqOpts);
    };
    Api.prototype.patch = function (endpoint, body, reqOpts) {
        reqOpts = this.getHttpReqOptions(null, reqOpts);
        console.log('Patching at : ' + this.url + '/' + endpoint + '?' + JSON.stringify(reqOpts));
        return this.http.put(this.url + '/' + endpoint, body, reqOpts);
    };
    Api.prototype.resetauthtoken = function (token) {
        //Getting the value ensures we have a valid settings array even on first use
        this.authtoken = token;
        this.settings.setValue('authtoken', token);
    };
    Api.prototype.getHttpReqOptions = function (params, reqOpts) {
        if (!reqOpts) {
            reqOpts = {
                params: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["e" /* HttpParams */]()
            };
        }
        // Support easy query params for GET requests
        if (params) {
            reqOpts.params = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["e" /* HttpParams */]();
            for (var k in params) {
                reqOpts.params.set(k, params[k]);
            }
        }
        //reqOpts['headers'] = (new HttpHeaders()).set('x-access-token', this.authtoken);
        return reqOpts;
    };
    Api = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["b" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__settings_settings__["a" /* Settings */]])
    ], Api);
    return Api;
}());

//# sourceMappingURL=api.js.map

/***/ }),

/***/ 99:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Settings; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(138);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * A simple settings/config class for storing key/value pairs with persistence.
 */
var Settings = (function () {
    function Settings(storage, defaults) {
        this.storage = storage;
        this.SETTINGS_KEY = '_settings';
        this._defaults = defaults;
        //make these methods this safe
        this.setValue.bind(this);
        this.load.bind(this);
        this.merge.bind(this);
        this.setAll.bind(this);
        this.getValue.bind(this);
        this.displaySettings.bind(this);
    }
    Settings.prototype.load = function () {
        var _this = this;
        return this.storage.get(this.SETTINGS_KEY).then(function (value) {
            if (value) {
                _this.settings = value;
                return _this._mergeDefaults(_this._defaults);
            }
            else {
                return _this.setAll(_this._defaults).then(function (val) {
                    _this.settings = val;
                });
            }
        });
    };
    Settings.prototype._mergeDefaults = function (defaults) {
        for (var k in defaults) {
            if (!(k in this.settings)) {
                this.settings[k] = defaults[k];
            }
        }
        return this.setAll(this.settings);
    };
    Settings.prototype.merge = function (settings) {
        for (var k in settings) {
            this.settings[k] = settings[k];
        }
        return this.save();
    };
    Settings.prototype.setValue = function (key, value) {
        this.settings[key] = value;
        return this.storage.set(this.SETTINGS_KEY, this.settings);
    };
    Settings.prototype.setAll = function (value) {
        return this.storage.set(this.SETTINGS_KEY, value);
    };
    Settings.prototype.getValue = function (key) {
        return this.storage.get(this.SETTINGS_KEY)
            .then(function (settings) {
            return settings[key];
        });
    };
    Settings.prototype.save = function () {
        return this.setAll(this.settings);
    };
    Object.defineProperty(Settings.prototype, "allSettings", {
        get: function () {
            return this.settings;
        },
        enumerable: true,
        configurable: true
    });
    Settings.prototype.displaySettings = function () {
        console.log("Displaying settings...");
        for (var k in this.settings) {
            console.log("" + k + " : " + this.settings[k]);
        }
    };
    Settings = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */], Object])
    ], Settings);
    return Settings;
}());

//# sourceMappingURL=settings.js.map

/***/ })

},[229]);
//# sourceMappingURL=main.js.map