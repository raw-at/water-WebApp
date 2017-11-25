webpackJsonp([1,4],{

/***/ 334:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ValidateService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ValidateService = (function () {
    function ValidateService() {
    }
    ValidateService.prototype.validateRegister = function (user) {
        console.log(user);
        if (user.name == undefined || user.email == undefined || user.apartmentId == undefined || user.password == undefined) {
            return false;
        }
        else {
            return true;
        }
    };
    ValidateService.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    ValidateService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], ValidateService);
    return ValidateService;
}());
//# sourceMappingURL=/home/raw-at/Desktop/iot_pro/client/src/validate.service.js.map

/***/ }),

/***/ 38:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(706);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_jwt__ = __webpack_require__(524);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_jwt__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
        this.userAccess = false;
        this.adminAccess = false;
    }
    AuthService.prototype.registerUser = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/users/register', user, { headers: headers }).map(function (res) { return res.json(); });
    };
    AuthService.prototype.authenticateUser = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/users/authenticate', user, { headers: headers }).map(function (res) { return res.json(); });
    };
    AuthService.prototype.authenticateAdmin = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/users/authenticateAdmin', user, { headers: headers }).map(function (res) { return res.json(); });
    };
    AuthService.prototype.getProfile = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:3000/users/profile', { headers: headers }).map(function (res) { return res.json(); });
    };
    AuthService.prototype.getAllUsername = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:3000/users/userAll', { headers: headers }).map(function (res) { return res.json(); });
    };
    AuthService.prototype.updateUser = function (newUser) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.put('http://localhost:3000/users/updateUser', newUser, { headers: headers }).map(function (res) { return res.json(); });
    };
    AuthService.prototype.deleteUser = function (id) {
        console.log(id);
        this.loadToken();
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', this.authToken);
        return this.http.post('http://localhost:3000/users/deleteUser', id, { headers: headers }).map(function (res) { return res.json(); });
    };
    AuthService.prototype.getAllUserdetails = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://localhost:3000/users/userAlldetails', { headers: headers }).map(function (res) { return res.json(); });
    };
    AuthService.prototype.getTank = function (timestamp) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        var myparams = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["URLSearchParams"]();
        myparams.append('timestamp', timestamp);
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers, search: myparams });
        return this.http.get('http://localhost:3000/users/tank', options).map(function (res) { return res.json(); });
    };
    AuthService.prototype.getUserWater = function (finalObj) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        var myparams = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["URLSearchParams"]();
        myparams.append('starttimestamp', finalObj.starttimestamp);
        myparams.append('endtimestamp', finalObj.endtimestamp);
        myparams.append('appartmentIds', finalObj.appartmentId);
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers, search: myparams });
        return this.http.get('http://localhost:3000/users/userwater', options).map(function (res) { return res.json(); });
    };
    AuthService.prototype.getCurrentTankStatus = function (timestamp) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        var myparams = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["URLSearchParams"]();
        myparams.append('timestamp', timestamp);
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers, search: myparams });
        return this.http.get('http://localhost:3000/users/currenttank', options).map(function (res) { return res.json(); });
    };
    AuthService.prototype.getUserWaterByAdmin = function (finalObj) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        var myparams = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["URLSearchParams"]();
        myparams.append('starttimestamp', finalObj.starttimestamp);
        myparams.append('endtimestamp', finalObj.endtimestamp);
        myparams.append('appartmentIds', finalObj.appartmentId);
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type', 'application/json');
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers, search: myparams });
        return this.http.get('http://localhost:3000/users/getUserWaterByAdmin', options).map(function (res) { return res.json(); });
    };
    AuthService.prototype.storeUserData = function (token, user) {
        localStorage.setItem('id_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.authToken = token;
        this.user = user;
    };
    AuthService.prototype.loadToken = function () {
        var token = localStorage.getItem('id_token');
        this.authToken = token;
    };
    AuthService.prototype.loggedIn = function () {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_angular2_jwt__["tokenNotExpired"])('id_token');
    };
    AuthService.prototype.logout = function () {
        this.authToken = null;
        this.user = null;
        localStorage.clear();
    };
    AuthService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === 'function' && _a) || Object])
    ], AuthService);
    return AuthService;
    var _a;
}());
//# sourceMappingURL=/home/raw-at/Desktop/iot_pro/client/src/auth.service.js.map

/***/ }),

/***/ 389:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 389;


/***/ }),

/***/ 390:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(477);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(519);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__(508);




if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=/home/raw-at/Desktop/iot_pro/client/src/main.js.map

/***/ }),

/***/ 507:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(691),
            styles: [__webpack_require__(681)]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=/home/raw-at/Desktop/iot_pro/client/src/app.component.js.map

/***/ }),

/***/ 508:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(468);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(507);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_navbar_navbar_component__ = __webpack_require__(513);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_home_home_component__ = __webpack_require__(511);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_user_dashboard_user_dashboard_component__ = __webpack_require__(516);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_admin_dashboard_admin_dashboard_component__ = __webpack_require__(509);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_login_login_component__ = __webpack_require__(512);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_register_register_component__ = __webpack_require__(515);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_admin_admin_component__ = __webpack_require__(510);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_profile_profile_component__ = __webpack_require__(514);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_validate_service__ = __webpack_require__(334);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_auth_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_angular2_flash_messages__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__guards_auth_guard__ = __webpack_require__(518);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_ng2_charts__ = __webpack_require__(679);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_user_managers_user_managers_component__ = __webpack_require__(517);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




















var appRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_7__components_home_home_component__["a" /* HomeComponent */] },
    { path: 'register', component: __WEBPACK_IMPORTED_MODULE_11__components_register_register_component__["a" /* RegisterComponent */] },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_10__components_login_login_component__["a" /* LoginComponent */] },
    { path: 'userdashboard', component: __WEBPACK_IMPORTED_MODULE_8__components_user_dashboard_user_dashboard_component__["a" /* UserDashboardComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_17__guards_auth_guard__["a" /* AuthGuards */]] },
    { path: 'admindashboard', component: __WEBPACK_IMPORTED_MODULE_9__components_admin_dashboard_admin_dashboard_component__["a" /* AdminDashboardComponent */] },
    { path: 'admin', component: __WEBPACK_IMPORTED_MODULE_12__components_admin_admin_component__["a" /* AdminComponent */] },
    { path: 'profile', component: __WEBPACK_IMPORTED_MODULE_13__components_profile_profile_component__["a" /* ProfileComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_17__guards_auth_guard__["a" /* AuthGuards */]] },
    { path: 'usermanagers', component: __WEBPACK_IMPORTED_MODULE_19__components_user_managers_user_managers_component__["a" /* UserManagersComponent */] }
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_6__components_navbar_navbar_component__["a" /* NavbarComponent */],
                __WEBPACK_IMPORTED_MODULE_7__components_home_home_component__["a" /* HomeComponent */],
                __WEBPACK_IMPORTED_MODULE_8__components_user_dashboard_user_dashboard_component__["a" /* UserDashboardComponent */],
                __WEBPACK_IMPORTED_MODULE_9__components_admin_dashboard_admin_dashboard_component__["a" /* AdminDashboardComponent */],
                __WEBPACK_IMPORTED_MODULE_10__components_login_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_11__components_register_register_component__["a" /* RegisterComponent */],
                __WEBPACK_IMPORTED_MODULE_12__components_admin_admin_component__["a" /* AdminComponent */],
                __WEBPACK_IMPORTED_MODULE_13__components_profile_profile_component__["a" /* ProfileComponent */],
                __WEBPACK_IMPORTED_MODULE_19__components_user_managers_user_managers_component__["a" /* UserManagersComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["HttpModule"],
                __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* RouterModule */].forRoot(appRoutes),
                __WEBPACK_IMPORTED_MODULE_16_angular2_flash_messages__["FlashMessagesModule"],
                __WEBPACK_IMPORTED_MODULE_18_ng2_charts__["ChartsModule"]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_14__services_validate_service__["a" /* ValidateService */], __WEBPACK_IMPORTED_MODULE_15__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_17__guards_auth_guard__["a" /* AuthGuards */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=/home/raw-at/Desktop/iot_pro/client/src/app.module.js.map

/***/ }),

/***/ 509:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminDashboardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AdminDashboardComponent = (function () {
    function AdminDashboardComponent(authService, flashMessage, router) {
        this.authService = authService;
        this.flashMessage = flashMessage;
        this.router = router;
        this.lineChartData = [];
    }
    AdminDashboardComponent.prototype.ngOnInit = function () {
        this.time_data = [];
        this.water_data = [];
        this.user_time = [];
        this.hour = [];
        this.data_container = [];
        this.user_water = [];
        this.selectAppartmentId = [];
        this.final_data_list = {};
        this.water_data_container = [];
        this.timestamp_data_container = [];
        this.label_container = [];
        this.max_label = [];
        this.total_data = [];
        this.total_apart_ids = [];
        this.final_user_identity_list = [];
        var today = new Date();
        this.dd = today.getDate();
        this.mm = today.getMonth();
        this.yy = today.getFullYear();
        this.hh = '08';
        this.min = '00';
        this.ss = '00';
        this.color = {};
        this.user_identity = [];
        this.color_array = [];
        this.timestamp = new Date(Date.UTC(this.yy, this.mm, this.dd, this.hh, this.min, this.ss));
        this.timestamp = this.timestamp.getTime() / 1000;
        if (localStorage.getItem('type') == 'user') {
            this.authService.userAccess = true;
        }
        else {
            this.authService.adminAccess = true;
        }
        this.getTankData();
        this.getUserName();
    };
    AdminDashboardComponent.prototype.getTankData = function () {
        var _this = this;
        var i;
        this.authService.getTank(this.timestamp).subscribe(function (data) {
            _this.hour = [];
            _this.datetimeConverter(data['tank']);
            _this.total_tank_data = [];
            _this.total_tank_data = data['tank'];
            _this.lineChartData = [];
            _this.lineChartLabels = [];
            for (i = 0; i < _this.total_tank_data.length; i++) {
                //this.time_data[i] = String(this.total_tank_data[i]['timestamp']);
                _this.water_data[i] = parseInt(_this.total_tank_data[i]['liters']);
            }
            _this.lineChartData = [
                { data: _this.water_data, label: 'Tank' }
            ];
            _this.lineChartLabels = _this.hour;
            //console.log(this.lineChartLabels)
            _this.lineChartOptions = {
                responsive: true
            };
            _this.lineChartColors = [
                {
                    //backgroundColor: 'rgba(64,164,223,0.6)',
                    borderColor: 'rgba(148,159,177,1)',
                    pointBackgroundColor: 'rgba(148,159,177,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
                },
            ];
            _this.lineChartLegend = true;
            _this.lineChartType = 'line';
            _this.data_length = _this.total_tank_data.length;
        });
        setInterval(function () {
            _this.getTankData();
        }, 300000);
    };
    AdminDashboardComponent.prototype.getUserData = function () {
        var _this = this;
        this.total_data = [];
        this.max_label = [];
        this.final_user_identity_list = [];
        this.authService.getUserWaterByAdmin(this.finalObj).subscribe(function (data) {
            //console.log('data: ',data)
            _this.final_data_list = data;
            //this.total_data = [];
            /*
            for(var i=0;i<data.length;i++){
            
              for(var j=0;j<data[i].length;j++){
                this.data_container.push({'liters':data[i][j]['liters'],'timestamp':data[i][j]['timestamp']});
                this.required_id = data[i][j]['appartmentId'];
              }
              this.final_data_list[this.required_id] = this.data_container
              this.data_container = []
            }
            */
            for (var i = 0; i < _this.user_name_list.length; i++) {
                var id = String(_this.user_name_list[i]['appartmentId']);
                var obj = {};
                obj[id] = _this.user_name_list[i]['name'];
                _this.final_user_identity_list.push(obj);
            }
            console.log(_this.final_user_identity_list);
            console.log(_this.endTimestamp - _this.startTimestamp);
            if (_this.endTimestamp - _this.startTimestamp <= 86400) {
                console.log('go');
                /*-------------------------------*/
                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < data[i].length; j++) {
                        _this.water_data_container.push(data[i][j]['liters']);
                        var t = new Date(data[i][j]['timestamp'] * 1000);
                        //console.log(t.toISOString())
                        _this.timestamp_data_container.push(t.toISOString().substring(11, 13));
                        //this.timestamp_data_container.push(data[i][j]['timestamp']);
                        _this.user_apart_id = data[i][j]['appartmentId'];
                        console.log('user :', _this.user_apart_id);
                    }
                    //console.log('user: ',this.user_apart_id);
                    _this.object_final = { 'data': _this.water_data_container, 'label': _this.final_user_identity_list[i][_this.user_apart_id] };
                    _this.total_data.push(_this.object_final);
                    _this.color = {
                        backgroundColor: 'rgba(' + _this.randomColor(i) + ',' + _this.randomColor(i) + ',177,0.4)',
                        borderColor: 'rgba(' + _this.randomColor(i) + ',159,' + _this.randomColor(i) + ',0.5)',
                        pointBackgroundColor: 'rgba(' + _this.randomColor(i) + ',159,177,0.6)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(148,' + _this.randomColor(i) + ',177,0.8)'
                    };
                    _this.color_array.push(_this.color);
                    _this.label_container.push(_this.timestamp_data_container);
                    _this.water_data_container = [];
                    _this.timestamp_data_container = [];
                    _this.user_apart_id = "";
                }
            }
            else if (_this.endTimestamp - _this.startTimestamp > 84600 && _this.endTimestamp - _this.startTimestamp <= 2592000) {
                /*-------------------------------*/
                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < data[i].length; j += 4) {
                        _this.water_data_container.push(data[i][j]['liters']);
                        var t = new Date(data[i][j]['timestamp'] * 1000);
                        //console.log(t.toISOString())
                        _this.timestamp_data_container.push(t.toISOString().substring(11, 13));
                        //this.timestamp_data_container.push(data[i][j]['timestamp']);
                        _this.user_apart_id = data[i][j]['appartmentId'];
                        console.log('user :', _this.user_apart_id);
                    }
                    //console.log('user: ',this.user_apart_id);
                    _this.object_final = { 'data': _this.water_data_container, 'label': _this.final_user_identity_list[i][_this.user_apart_id] };
                    _this.total_data.push(_this.object_final);
                    _this.color = {
                        backgroundColor: 'rgba(' + 50 + ',' + 84 + ',' + _this.randomColor(i * 2) + ',0.4)',
                        borderColor: 'rgba(' + _this.randomColor(i) + ',59,' + _this.randomColor(i) + ',0.5)',
                        pointBackgroundColor: 'rgba(' + _this.randomColor(i) + ',159,177,0.6)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(148,' + _this.randomColor(i) + ',177,0.8)'
                    };
                    _this.color_array.push(_this.color);
                    _this.label_container.push(_this.timestamp_data_container);
                    _this.water_data_container = [];
                    _this.timestamp_data_container = [];
                    _this.user_apart_id = "";
                }
            }
            else if (_this.endTimestamp - _this.startTimestamp > 2592000 && _this.endTimestamp - _this.startTimestamp <= 5184000) {
                /*-------------------------------*/
                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < data[i].length; j += 12) {
                        _this.water_data_container.push(data[i][j]['liters']);
                        var t = new Date(data[i][j]['timestamp'] * 1000);
                        //console.log(t.toISOString())
                        _this.timestamp_data_container.push(t.toISOString().substring(11, 13));
                        //this.timestamp_data_container.push(data[i][j]['timestamp']);
                        _this.user_apart_id = data[i][j]['appartmentId'];
                        console.log('user :', _this.user_apart_id);
                    }
                    //console.log('user: ',this.user_apart_id);
                    _this.object_final = { 'data': _this.water_data_container, 'label': _this.final_user_identity_list[i][_this.user_apart_id] };
                    _this.total_data.push(_this.object_final);
                    _this.color = {
                        backgroundColor: 'rgba(' + _this.randomColor(i * 2) + ',' + _this.randomColor(i * 2) + ',177,0.4)',
                        borderColor: 'rgba(' + _this.randomColor(i) + ',159,' + _this.randomColor(i) + ',0.5)',
                        pointBackgroundColor: 'rgba(' + _this.randomColor(i) + ',159,177,0.6)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(148,' + _this.randomColor(i) + ',177,0.8)'
                    };
                    _this.color_array.push(_this.color);
                    _this.label_container.push(_this.timestamp_data_container);
                    _this.water_data_container = [];
                    _this.timestamp_data_container = [];
                    _this.user_apart_id = "";
                }
            }
            else if (_this.endTimestamp - _this.startTimestamp > 5184000 && _this.endTimestamp - _this.startTimestamp <= 7776000) {
                /*-------------------------------*/
                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < data[i].length; j += 24) {
                        _this.water_data_container.push(data[i][j]['liters']);
                        var t = new Date(data[i][j]['timestamp'] * 1000);
                        //console.log(t.toISOString())
                        _this.timestamp_data_container.push(t.toISOString().substring(11, 13));
                        //this.timestamp_data_container.push(data[i][j]['timestamp']);
                        _this.user_apart_id = data[i][j]['appartmentId'];
                        console.log('user :', _this.user_apart_id);
                    }
                    //console.log('user: ',this.user_apart_id);
                    _this.object_final = { 'data': _this.water_data_container, 'label': _this.final_user_identity_list[i][_this.user_apart_id] };
                    _this.total_data.push(_this.object_final);
                    _this.color = {
                        backgroundColor: 'rgba(' + _this.randomColor(i * 2) + ',' + _this.randomColor(i * 2) + ',177,0.4)',
                        borderColor: 'rgba(' + _this.randomColor(i) + ',159,' + _this.randomColor(i) + ',0.5)',
                        pointBackgroundColor: 'rgba(' + _this.randomColor(i) + ',159,177,0.6)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(148,' + _this.randomColor(i) + ',177,0.8)'
                    };
                    _this.color_array.push(_this.color);
                    _this.label_container.push(_this.timestamp_data_container);
                    _this.water_data_container = [];
                    _this.timestamp_data_container = [];
                    _this.user_apart_id = "";
                }
            }
            else if (_this.endTimestamp - _this.startTimestamp > 7776000 && _this.endTimestamp - _this.startTimestamp <= 10368000) {
                /*-------------------------------*/
                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < data[i].length; j += 48) {
                        _this.water_data_container.push(data[i][j]['liters']);
                        var t = new Date(data[i][j]['timestamp'] * 1000);
                        //console.log(t.toISOString())
                        _this.timestamp_data_container.push(t.toISOString().substring(11, 13));
                        //this.timestamp_data_container.push(data[i][j]['timestamp']);
                        _this.user_apart_id = data[i][j]['appartmentId'];
                        console.log('user :', _this.user_apart_id);
                    }
                    //console.log('user: ',this.user_apart_id);
                    _this.object_final = { 'data': _this.water_data_container, 'label': _this.final_user_identity_list[i][_this.user_apart_id] };
                    _this.total_data.push(_this.object_final);
                    _this.color = {
                        backgroundColor: 'rgba(' + _this.randomColor(i * 2) + ',' + _this.randomColor(i * 2) + ',177,0.4)',
                        borderColor: 'rgba(' + _this.randomColor(i) + ',159,' + _this.randomColor(i) + ',0.5)',
                        pointBackgroundColor: 'rgba(' + _this.randomColor(i) + ',159,177,0.6)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(148,' + _this.randomColor(i) + ',177,0.8)'
                    };
                    _this.color_array.push(_this.color);
                    _this.label_container.push(_this.timestamp_data_container);
                    _this.water_data_container = [];
                    _this.timestamp_data_container = [];
                    _this.user_apart_id = "";
                }
            }
            else if (_this.endTimestamp - _this.startTimestamp > 10368000 && _this.endTimestamp - _this.startTimestamp <= 20736000) {
                /*-------------------------------*/
                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < data[i].length; j += 72) {
                        _this.water_data_container.push(data[i][j]['liters']);
                        var t = new Date(data[i][j]['timestamp'] * 1000);
                        //console.log(t.toISOString())
                        _this.timestamp_data_container.push(t.toISOString().substring(11, 13));
                        //this.timestamp_data_container.push(data[i][j]['timestamp']);
                        _this.user_apart_id = data[i][j]['appartmentId'];
                        console.log('user :', _this.user_apart_id);
                    }
                    //console.log('user: ',this.user_apart_id);
                    _this.object_final = { 'data': _this.water_data_container, 'label': _this.final_user_identity_list[i][_this.user_apart_id] };
                    _this.total_data.push(_this.object_final);
                    _this.color = {
                        backgroundColor: 'rgba(' + _this.randomColor(i * 2) + ',' + _this.randomColor(i * 2) + ',177,0.4)',
                        borderColor: 'rgba(' + _this.randomColor(i) + ',159,' + _this.randomColor(i) + ',0.5)',
                        pointBackgroundColor: 'rgba(' + _this.randomColor(i) + ',159,177,0.6)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(148,' + _this.randomColor(i) + ',177,0.8)'
                    };
                    _this.color_array.push(_this.color);
                    _this.label_container.push(_this.timestamp_data_container);
                    _this.water_data_container = [];
                    _this.timestamp_data_container = [];
                    _this.user_apart_id = "";
                }
            }
            else if (_this.endTimestamp - _this.startTimestamp > 20736000 && _this.endTimestamp - _this.startTimestamp <= 41472000) {
                /*-------------------------------*/
                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < data[i].length; j += 96) {
                        _this.water_data_container.push(data[i][j]['liters']);
                        var t = new Date(data[i][j]['timestamp'] * 1000);
                        //console.log(t.toISOString())
                        _this.timestamp_data_container.push(t.toISOString().substring(11, 13));
                        //this.timestamp_data_container.push(data[i][j]['timestamp']);
                        _this.user_apart_id = data[i][j]['appartmentId'];
                        console.log('user :', _this.user_apart_id);
                    }
                    //console.log('user: ',this.user_apart_id);
                    _this.object_final = { 'data': _this.water_data_container, 'label': _this.final_user_identity_list[i][_this.user_apart_id] };
                    _this.total_data.push(_this.object_final);
                    _this.color = {
                        backgroundColor: 'rgba(' + _this.randomColor(i * 2) + ',' + _this.randomColor(i * 2) + ',177,0.4)',
                        borderColor: 'rgba(' + _this.randomColor(i) + ',159,' + _this.randomColor(i) + ',0.5)',
                        pointBackgroundColor: 'rgba(' + _this.randomColor(i) + ',159,177,0.6)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(148,' + _this.randomColor(i) + ',177,0.8)'
                    };
                    _this.color_array.push(_this.color);
                    _this.label_container.push(_this.timestamp_data_container);
                    _this.water_data_container = [];
                    _this.timestamp_data_container = [];
                    _this.user_apart_id = "";
                }
            }
            else if (_this.endTimestamp - _this.startTimestamp > 41472000 && _this.endTimestamp - _this.startTimestamp <= 82944000) {
                /*-------------------------------*/
                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < data[i].length; j += 120) {
                        _this.water_data_container.push(data[i][j]['liters']);
                        var t = new Date(data[i][j]['timestamp'] * 1000);
                        //console.log(t.toISOString())
                        _this.timestamp_data_container.push(t.toISOString().substring(11, 13));
                        //this.timestamp_data_container.push(data[i][j]['timestamp']);
                        _this.user_apart_id = data[i][j]['appartmentId'];
                        console.log('user :', _this.user_apart_id);
                    }
                    //console.log('user: ',this.user_apart_id);
                    _this.object_final = { 'data': _this.water_data_container, 'label': _this.final_user_identity_list[i][_this.user_apart_id] };
                    _this.total_data.push(_this.object_final);
                    _this.color = {
                        backgroundColor: 'rgba(' + _this.randomColor(i * 2) + ',' + _this.randomColor(i * 2) + ',177,0.4)',
                        borderColor: 'rgba(' + _this.randomColor(i) + ',159,' + _this.randomColor(i) + ',0.5)',
                        pointBackgroundColor: 'rgba(' + _this.randomColor(i) + ',159,177,0.6)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(148,' + _this.randomColor(i) + ',177,0.8)'
                    };
                    _this.color_array.push(_this.color);
                    _this.label_container.push(_this.timestamp_data_container);
                    _this.water_data_container = [];
                    _this.timestamp_data_container = [];
                    _this.user_apart_id = "";
                }
            }
            else if (_this.endTimestamp - _this.startTimestamp > 82944000 && _this.endTimestamp - _this.startTimestamp <= 134784000) {
                /*-------------------------------*/
                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < data[i].length; j += 144) {
                        _this.water_data_container.push(data[i][j]['liters']);
                        var t = new Date(data[i][j]['timestamp'] * 1000);
                        //console.log(t.toISOString())
                        _this.timestamp_data_container.push(t.toISOString().substring(11, 13));
                        //this.timestamp_data_container.push(data[i][j]['timestamp']);
                        _this.user_apart_id = data[i][j]['appartmentId'];
                        console.log('user :', _this.user_apart_id);
                    }
                    //console.log('user: ',this.user_apart_id);
                    _this.object_final = { 'data': _this.water_data_container, 'label': _this.final_user_identity_list[i][_this.user_apart_id] };
                    _this.total_data.push(_this.object_final);
                    _this.color = {
                        backgroundColor: 'rgba(' + _this.randomColor(i * 2) + ',' + _this.randomColor(i * 2) + ',177,0.4)',
                        borderColor: 'rgba(' + _this.randomColor(i) + ',159,' + _this.randomColor(i) + ',1)',
                        pointBackgroundColor: 'rgba(' + _this.randomColor(i) + ',159,177,1)',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: 'rgba(148,' + _this.randomColor(i) + ',177,1)'
                    };
                    _this.color_array.push(_this.color);
                    _this.label_container.push(_this.timestamp_data_container);
                    _this.water_data_container = [];
                    _this.timestamp_data_container = [];
                    _this.user_apart_id = "";
                }
            }
            console.log('data:', _this.total_data);
            var t1 = new Date(_this.startTimestamp * 1000);
            _this.date_start = t1.getDate() + '-' + (t1.getMonth() + 1) + '-' + t1.getFullYear();
            var t2 = new Date(_this.endTimestamp * 1000);
            _this.date_end = t2.getDate() + '-' + (t2.getMonth() + 1) + '-' + t2.getFullYear();
            _this.waterlineData = _this.total_data;
            for (var i = 0; i < _this.label_container.length - 1; i++) {
                if (_this.label_container[i].length > _this.label_container[i + 1].length) {
                    _this.max_label = _this.label_container[i];
                }
                else {
                    _this.max_label = _this.label_container[i + 1];
                }
            }
            //console.log('max_label: ',this.max_label)
            _this.lineChartColors = _this.color_array;
            _this.waterLabels = _this.max_label;
            _this.lineChartOptions = {
                responsive: true
            };
            _this.lineChartLegend = true;
            _this.lineChartType = 'line';
            /*
            console.log(this.final_data_list)
            this.user_water_data = [];
            this.user_water_data = data['tank']
            this.waterlineData = [];
            this.waterLabels = [];
            this.hour = [];
            this.datetimeConverter(data['tank'])
            */
            //console.log(this.user_water_data);
            //console.log(data)
            /*
            for(i=0;i<this.user_water_data.length;i++ ){
              //this.user_time[i] = String(this.user_water_data[i]['datetime']);
              this.user_water[i]=parseInt(this.user_water_data[i]['liters']);
            }
            */
        });
        setInterval(function () {
            _this.getUserData();
        }, 300000);
    };
    ;
    AdminDashboardComponent.prototype.getUserName = function () {
        var _this = this;
        this.authService.getAllUsername().subscribe(function (data) {
            _this.user_name_list = data['user_data'];
            for (var i = 0; i < _this.user_name_list.length; i++) {
                _this.user_identity[_this.user_name_list['appartmentId']] = _this.user_name_list['name'];
                _this.final_user_identity_list = _this.user_identity;
            }
        });
    };
    AdminDashboardComponent.prototype.checkBox = function (appartmentID, e) {
        if (e.target.checked) {
            this.selectAppartmentId.push(appartmentID);
        }
        else {
            var index = this.selectAppartmentId.indexOf(appartmentID);
            this.selectAppartmentId.splice(index, 1);
        }
    };
    AdminDashboardComponent.prototype.querySearch = function () {
        this.startTimestamp = "";
        this.endTimestamp = "";
        this.dateParts = this.sdate.split('-');
        this.timeParts = this.stime.split(':');
        this.startTimestamp = new Date(Date.UTC(this.dateParts[0], this.dateParts[1] - 1, this.dateParts[2], this.timeParts[0], this.timeParts[1], this.timeParts[2])).getTime() / 1000;
        this.dateParts = this.edate.split('-');
        this.timeParts = this.etime.split(':');
        this.endTimestamp = new Date(Date.UTC(this.dateParts[0], this.dateParts[1] - 1, this.dateParts[2], this.timeParts[0], this.timeParts[1], this.timeParts[2])).getTime() / 1000;
        console.log(this.startTimestamp);
        console.log(this.endTimestamp);
        this.finalobjectmaker();
    };
    AdminDashboardComponent.prototype.datetimeConverter = function (timestampArray) {
        for (var i = 0; i < timestampArray.length; i++) {
            var t = new Date(timestampArray[i]['timestamp'] * 1000);
            this.date = t.getDate() + '-' + t.getMonth() + '-' + t.getFullYear();
            this.hour.push(t.toISOString().substring(11, 13));
        }
    };
    AdminDashboardComponent.prototype.finalobjectmaker = function () {
        this.finalObj = { 'appartmentId': this.selectAppartmentId, 'starttimestamp': this.startTimestamp, 'endtimestamp': this.endTimestamp };
        //console.log(this.finalObj)
        this.getUserData();
    };
    AdminDashboardComponent.prototype.randomColor = function (i) {
        console.log('s', Math.round(((Math.random() + i * 25) * 2)));
        return Math.round(((Math.random() + i * 25) * 2));
    };
    AdminDashboardComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-admin-dashboard',
            template: __webpack_require__(692),
            styles: [__webpack_require__(682)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === 'function' && _c) || Object])
    ], AdminDashboardComponent);
    return AdminDashboardComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/home/raw-at/Desktop/iot_pro/client/src/admin-dashboard.component.js.map

/***/ }),

/***/ 510:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AdminComponent = (function () {
    function AdminComponent(authService, flashMessage, router) {
        this.authService = authService;
        this.flashMessage = flashMessage;
        this.router = router;
    }
    AdminComponent.prototype.ngOnInit = function () {
    };
    AdminComponent.prototype.onLoginSubmit = function () {
        var _this = this;
        var user = {
            name: this.name,
            password: this.password,
        };
        this.authService.authenticateAdmin(user).subscribe(function (data) {
            if (data.success) {
                localStorage.setItem('type', 'admin');
                _this.authService.storeUserData(data.token, data.user);
                _this.flashMessage.show('You are now logged In!', { cssClass: 'alert-success', timeout: 1000 });
                _this.router.navigate(['admindashboard']);
                if (data.user.type == 'admin') {
                    _this.authService.adminAccess = true;
                }
            }
            else {
                _this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 1000 });
                _this.router.navigate(['admin']);
            }
        });
    };
    AdminComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-admin',
            template: __webpack_require__(693),
            styles: [__webpack_require__(683)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === 'function' && _c) || Object])
    ], AdminComponent);
    return AdminComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/home/raw-at/Desktop/iot_pro/client/src/admin.component.js.map

/***/ }),

/***/ 511:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HomeComponent = (function () {
    function HomeComponent() {
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(694),
            styles: [__webpack_require__(684)]
        }), 
        __metadata('design:paramtypes', [])
    ], HomeComponent);
    return HomeComponent;
}());
//# sourceMappingURL=/home/raw-at/Desktop/iot_pro/client/src/home.component.js.map

/***/ }),

/***/ 512:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginComponent = (function () {
    function LoginComponent(authService, router, flashMessage) {
        this.authService = authService;
        this.router = router;
        this.flashMessage = flashMessage;
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.onLoginSubmit = function () {
        var _this = this;
        var user = {
            name: this.name,
            password: this.password,
        };
        this.authService.authenticateUser(user).subscribe(function (data) {
            if (data.success) {
                console.log('hi', data);
                localStorage.setItem('type', 'user');
                _this.authService.storeUserData(data.token, data.user);
                _this.flashMessage.show('You are now logged In!', { cssClass: 'alert-success', timeout: 1000 });
                _this.router.navigate(['userdashboard']);
                if (data.user.type == 'user') {
                    _this.authService.userAccess = true;
                    _this.authService.appartment = data.user.appartmentId;
                }
            }
            else {
                _this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 1000 });
                _this.router.navigate(['login']);
            }
        });
    };
    LoginComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(695),
            styles: [__webpack_require__(685)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === 'function' && _c) || Object])
    ], LoginComponent);
    return LoginComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/home/raw-at/Desktop/iot_pro/client/src/login.component.js.map

/***/ }),

/***/ 513:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(36);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavbarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NavbarComponent = (function () {
    function NavbarComponent(authService, flashMessage, router) {
        this.authService = authService;
        this.flashMessage = flashMessage;
        this.router = router;
    }
    NavbarComponent.prototype.ngOnInit = function () {
        this.authService.loadToken();
        this.val = this.authService.loggedIn();
    };
    NavbarComponent.prototype.onLogoutClick = function () {
        this.authService.logout();
        this.flashMessage.show('You are logged out!', { cssClass: 'alert-warning', timeout: 1000 });
        if (this.authService.userAccess) {
            this.router.navigate(['/login']);
        }
        else if (this.authService.adminAccess) {
            this.router.navigate(['/admin']);
        }
        return false;
    };
    NavbarComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-navbar',
            template: __webpack_require__(696),
            styles: [__webpack_require__(686)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__["FlashMessagesService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2_angular2_flash_messages__["FlashMessagesService"]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === 'function' && _c) || Object])
    ], NavbarComponent);
    return NavbarComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/home/raw-at/Desktop/iot_pro/client/src/navbar.component.js.map

/***/ }),

/***/ 514:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(36);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ProfileComponent = (function () {
    function ProfileComponent(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.getProfile().subscribe(function (profile) {
            _this.user = profile.user[0];
            console.log(_this.user);
        }, function (err) {
            console.log(err);
            return false;
        });
    };
    ProfileComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-profile',
            template: __webpack_require__(697),
            styles: [__webpack_require__(687)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === 'function' && _b) || Object])
    ], ProfileComponent);
    return ProfileComponent;
    var _a, _b;
}());
//# sourceMappingURL=/home/raw-at/Desktop/iot_pro/client/src/profile.component.js.map

/***/ }),

/***/ 515:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_validate_service__ = __webpack_require__(334);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(36);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RegisterComponent = (function () {
    function RegisterComponent(validateService, authService, flashMessage, router) {
        this.validateService = validateService;
        this.authService = authService;
        this.flashMessage = flashMessage;
        this.router = router;
    }
    RegisterComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem('type') == 'user') {
            this.authService.userAccess = true;
        }
        else {
            this.authService.adminAccess = true;
        }
    };
    RegisterComponent.prototype.onRegisterSubmit = function () {
        var _this = this;
        if (this.password == this.conf_password) {
            var user = {
                name: this.name,
                email: this.email,
                password: this.password,
                apartmentId: this.apartmentId
            };
            if (!this.validateService.validateRegister(user)) {
                this.flashMessage.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000 });
                return false;
            }
            if (!this.validateService.validateEmail(user.email)) {
                this.flashMessage.show('Please fill a valid Email', { cssClass: 'alert-danger', timeout: 3000 });
                return false;
            }
            this.authService.registerUser(user).subscribe(function (data) {
                if (data.success) {
                    _this.flashMessage.show('You are now registered!', { cssClass: 'alert-success', timeout: 3000 });
                    _this.router.navigate(['/admindashboard']);
                }
                else {
                    _this.flashMessage.show('Something went Wrong', { cssClass: 'alert-danger', timeout: 3000 });
                    _this.router.navigate(['/register']);
                }
            });
        }
        else {
            this.flashMessage.show('Enter passwords are not similar', { cssClass: 'alert-danger', timeout: 3000 });
            this.router.navigate(['/register']);
        }
    };
    RegisterComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-register',
            template: __webpack_require__(698),
            styles: [__webpack_require__(688)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_validate_service__["a" /* ValidateService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_validate_service__["a" /* ValidateService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]) === 'function' && _d) || Object])
    ], RegisterComponent);
    return RegisterComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=/home/raw-at/Desktop/iot_pro/client/src/register.component.js.map

/***/ }),

/***/ 516:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserDashboardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UserDashboardComponent = (function () {
    function UserDashboardComponent(authService, flashMessage, router) {
        this.authService = authService;
        this.flashMessage = flashMessage;
        this.router = router;
        this.lineChartData = [];
    }
    UserDashboardComponent.prototype.ngOnInit = function () {
        this.time_data = [];
        this.water_data = [];
        this.user_time = [];
        this.hour = [];
        this.user_water = [];
        var today = new Date();
        this.dd = today.getDate();
        this.mm = today.getMonth();
        this.yy = today.getFullYear();
        this.current_hour = today.getHours();
        this.hh = '08';
        this.min = '00';
        this.ss = '00';
        this.timestamp = new Date(Date.UTC(this.yy, this.mm, this.dd, this.hh, this.min, this.ss));
        this.timestamp = this.timestamp.getTime() / 1000;
        this.finalObj = {};
        if (localStorage.getItem('type') == 'user') {
            this.authService.userAccess = true;
        }
        else {
            this.authService.adminAccess = true;
        }
        this.getTankData();
        this.getUserData();
    };
    UserDashboardComponent.prototype.getTankData = function () {
        var _this = this;
        var i;
        this.authService.getTank(this.timestamp).subscribe(function (data) {
            _this.hour = [];
            _this.datetimeConverter(data['tank']);
            _this.total_tank_data = [];
            _this.total_tank_data = data['tank'];
            _this.lineChartData = [];
            _this.lineChartLabels = [];
            //console.log(this.total_tank_data)
            for (i = 0; i < _this.total_tank_data.length; i++) {
                //this.time_data[i] = String(this.total_tank_data[i]['timestamp']);
                _this.water_data[i] = parseInt(_this.total_tank_data[i]['liters']);
            }
            _this.lineChartData = [
                { data: _this.water_data, label: 'Tank' }
            ];
            _this.lineChartLabels = _this.hour;
            _this.lineChartOptions = {
                responsive: true
            };
            _this.lineChartColors = [
                {
                    backgroundColor: 'rgba(0,255,255,0.6)',
                    borderColor: 'rgba(148,159,177,1)',
                    pointBackgroundColor: 'rgba(148,159,177,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
                },
            ];
            _this.lineChartLegend = true;
            _this.lineChartType = 'line';
        });
        setInterval(function () {
            _this.getTankData();
        }, 300000);
        var temp_time = new Date(Date.UTC(this.yy, this.mm, this.dd, this.current_hour));
        var current_time = temp_time.getTime() / 1000;
        console.log(current_time);
        this.authService.getCurrentTankStatus(current_time).subscribe(function (data) {
            _this.tank_current_value = data['tank'][0]['liters'];
        });
    };
    UserDashboardComponent.prototype.getUserData = function () {
        var _this = this;
        var i;
        this.finalObj = { 'appartmentId': this.authService.appartment, 'starttimestamp': this.timestamp, 'endtimestamp': this.timestamp + 86400 };
        this.authService.getUserWater(this.finalObj).subscribe(function (data) {
            _this.user_water_data = [];
            _this.user_water_data = data['tank'];
            _this.waterlineData = [];
            _this.waterLabels = [];
            _this.hour = [];
            _this.datetimeConverter(data['tank']);
            //console.log(this.user_water_data);
            //console.log(data)
            for (i = 0; i < _this.user_water_data.length; i++) {
                //this.user_time[i] = String(this.user_water_data[i]['datetime']);
                _this.user_water[i] = parseInt(_this.user_water_data[i]['liters']);
            }
            _this.waterlineData = [
                { data: _this.user_water, label: 'User Water' }
            ];
            _this.waterLabels = _this.hour;
            _this.lineChartOptions = {
                responsive: true
            };
            _this.lineChartColors = [
                {
                    backgroundColor: 'rgba(0,255,255,0.6)',
                    borderColor: 'rgba(148,159,177,1)',
                    pointBackgroundColor: 'rgba(148,159,177,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
                },
            ];
            _this.lineChartLegend = true;
            _this.lineChartType = 'line';
        });
        setInterval(function () {
            _this.getUserData();
        }, 300000);
    };
    ;
    UserDashboardComponent.prototype.datetimeConverter = function (timestampArray) {
        for (var i = 0; i < timestampArray.length; i++) {
            var t = new Date(timestampArray[i]['timestamp'] * 1000);
            this.date = t.getDate() + '-' + (t.getMonth() + 1) + '-' + t.getFullYear();
            this.hour.push(t.toISOString().substring(11, 13));
        }
    };
    UserDashboardComponent.prototype.querySearch = function () {
        this.startTimestamp = "";
        this.endTimestamp = "";
        this.dateParts = this.sdate.split('-');
        this.timeParts = this.stime.split(':');
        this.startTimestamp = new Date(Date.UTC(this.dateParts[0], this.dateParts[1] - 1, this.dateParts[2], this.timeParts[0], this.timeParts[1], this.timeParts[2])).getTime() / 1000;
        this.dateParts = this.edate.split('-');
        this.timeParts = this.etime.split(':');
        this.endTimestamp = new Date(Date.UTC(this.dateParts[0], this.dateParts[1] - 1, this.dateParts[2], this.timeParts[0], this.timeParts[1], this.timeParts[2])).getTime() / 1000;
        console.log(this.startTimestamp);
        console.log(this.endTimestamp);
        this.finalobjectmaker();
    };
    UserDashboardComponent.prototype.finalobjectmaker = function () {
        this.finalObj = {};
        this.finalObj = { 'appartmentId': this.authService.appartment, 'starttimestamp': this.startTimestamp, 'endtimestamp': this.endTimestamp };
        //console.log(this.finalObj)
    };
    UserDashboardComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-user-dashboard',
            template: __webpack_require__(699),
            styles: [__webpack_require__(689)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === 'function' && _c) || Object])
    ], UserDashboardComponent);
    return UserDashboardComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/home/raw-at/Desktop/iot_pro/client/src/user-dashboard.component.js.map

/***/ }),

/***/ 517:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserManagersComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UserManagersComponent = (function () {
    function UserManagersComponent(authService, flashMessage, router) {
        this.authService = authService;
        this.flashMessage = flashMessage;
        this.router = router;
    }
    UserManagersComponent.prototype.ngOnInit = function () {
        this.user_name_list = [];
        this.user_identity = [];
        this.final_user_identity_list = [];
        this.getUserName();
        this.user = {};
        this.table_view = true;
        if (localStorage.getItem('type') == 'user') {
            this.authService.userAccess = true;
        }
        else {
            this.authService.adminAccess = true;
        }
        this.authService.loadToken();
    };
    UserManagersComponent.prototype.getUserName = function () {
        var _this = this;
        this.authService.getAllUserdetails().subscribe(function (data) {
            _this.user_name_list = data['user_data'];
            /*
            for(var i=0;i<this.user_name_list.length;i++){
              this.user_identity[this.user_name_list['appartmentId']] = this.user_name_list['name']
              this.final_user_identity_list = this.user_identity;
              console.log(this.final_user_identity_list)
              
            }
            */
        });
    };
    UserManagersComponent.prototype.update = function (i) {
        this.table_view = false;
        console.log(this.user_name_list);
        this.name = this.user_name_list[i]['name'];
        this.email = this.user_name_list[i]['email'];
        this.appartmentId = this.user_name_list[i]['appartmentId'];
    };
    UserManagersComponent.prototype.delete = function (i) {
        var _this = this;
        var user_id = { id: this.user_name_list[i]['appartmentId'] };
        this.authService.deleteUser(user_id).subscribe(function (data) {
            if (data['msg'] == 'success') {
                _this.flashMessage.show('Deletion Done', { cssClass: 'alert-success', timeout: 1000 });
                //this.user_name_list = data['user_data'];
                setTimeout(function () { location.reload(); }, 1000);
            }
        });
    };
    UserManagersComponent.prototype.Submit = function () {
        var _this = this;
        var final_object = { name: this.name, email: this.email, appartmentId: this.appartmentId };
        this.authService.updateUser(final_object).subscribe(function (data) {
            if (data['msg'] == 'success') {
                _this.flashMessage.show('Update Done', { cssClass: 'alert-success', timeout: 1500 });
                location.reload();
                _this.table_view = true;
            }
        });
    };
    UserManagersComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-user-managers',
            template: __webpack_require__(700),
            styles: [__webpack_require__(690)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_angular2_flash_messages__["FlashMessagesService"]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === 'function' && _c) || Object])
    ], UserManagersComponent);
    return UserManagersComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/home/raw-at/Desktop/iot_pro/client/src/user-managers.component.js.map

/***/ }),

/***/ 518:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(38);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuards; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuards = (function () {
    function AuthGuards(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    AuthGuards.prototype.canActivate = function () {
        if (this.authService.loggedIn()) {
            return true;
        }
        else {
            this.router.navigate(['/login']);
            return false;
        }
    };
    AuthGuards = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === 'function' && _b) || Object])
    ], AuthGuards);
    return AuthGuards;
    var _a, _b;
}());
//# sourceMappingURL=/home/raw-at/Desktop/iot_pro/client/src/auth.guard.js.map

/***/ }),

/***/ 519:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=/home/raw-at/Desktop/iot_pro/client/src/environment.js.map

/***/ }),

/***/ 681:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 682:
/***/ (function(module, exports) {

module.exports = ".left_bar{\n    position: relative;\n    top: 80px;\n}"

/***/ }),

/***/ 683:
/***/ (function(module, exports) {

module.exports = ".area{\n    position: relative;\n    top:60px;\n}"

/***/ }),

/***/ 684:
/***/ (function(module, exports) {

module.exports = ".jumbotron{\n    background-image: url('http://sf.co.ua/15/12/wallpaper-10e17b.jpg');\n    background-size: cover;\n}"

/***/ }),

/***/ 685:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 686:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 687:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 688:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 689:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 690:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 691:
/***/ (function(module, exports) {

module.exports = "<app-navbar></app-navbar>\n<div class=\"container\">\n  <flash-messages></flash-messages>\n  <router-outlet></router-outlet>\n</div>"

/***/ }),

/***/ 692:
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col-sm-4 well left_bar\">\n      <h1 style=\"font-weight:bold;color:cadetblue;\">User List</h1>\n      <form>\n        <div class=\"checkbox\" *ngFor=\"let user of user_name_list\">\n          <label style=\"font-weight:bold;\" ><input (change)=\"checkBox(user.appartmentId,$event)\" type=\"checkbox\" value=\"{{user.appartmentId}}\">{{user.name}}</label>\n        </div>\n      </form>\n      \n    </div>\n    <div class=\"col-sm-6 col-sm-push-1\">\n        <div class=\"row\">\n          <h1 style=\"font-weight:bold;text-align:center;color:rgb(2,163,221)\">Filter Data</h1>\n          <form (submit)=\"querySearch()\">\n              <div class=\"form-group\">\n                <label>StartDate</label>\n                <input type=\"text\" class=\"form-control\" [(ngModel)]=\"sdate\" name=\"sdate\" placeholder=\"YYYY-MM-DD\">\n              </div>\n              <div class=\"form-group\">\n                <label>EndDate</label>\n                <input type=\"text\" class=\"form-control\" [(ngModel)]=\"edate\" name=\"edate\" placeholder=\"YYYY-MM-DD\">\n              </div>\n\n              <div class=\"form-group\">\n                  <label>StartTime</label>\n                  <input type=\"text\" class=\"form-control\" [(ngModel)]=\"stime\" name=\"stime\" placeholder=\"HH-MM-SS\">\n                </div>\n\n              <div class=\"form-group\">\n                  <label>EndTime</label>\n                  <input type=\"text\" class=\"form-control\" [(ngModel)]=\"etime\" name=\"etime\" placeholder=\"HH-MM-SS\">\n                </div>\n\n              <input type=\"submit\" class=\"btn btn-primary\" value=\"Get Graph\">\n            </form>\n\n        </div>\n        \n        \n        <div class=\"row\">\n\n          \n        </div>\n\n    </div>\n  </div>\n\n\n\n</div>\n<br>\n<div class=\"well container-fluid\">\n  <h2 style=\"font-weight:bold;text-align:center\">Graphs Area</h2>\n</div>\n\n<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col-md-8 col-md-push-2\">\n\n    <span style=\"font-size:15px\" *ngIf=\"time_data && water_data.length > 0\" class=\"label label-default\">Tank Water Graph For last 24 hours</span>\n      <div style=\"display: block;\">\n      <canvas baseChart *ngIf=\"time_data && water_data.length > 0\"\n        width=\"500\" height=\"300\"\n                  [(datasets)]=\"lineChartData\"\n                  [(labels)]=\"lineChartLabels\"\n                  [(options)]=\"lineChartOptions\"\n                  [(colors)]=\"lineChartColors\"\n                  [(legend)]=\"lineChartLegend\"\n                  [(chartType)]=\"lineChartType\"\n                  ></canvas>\n      </div>\n    </div>\n    \n  </div>\n</div>\n<br>\n  \n\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-md-8 col-md-push-2\">\n  \n      <span style=\"font-size:15px\" *ngIf=\" final_data_list.length > 0\" class=\"label label-default\">User Water</span>\n\n      <span style=\"font-size:15px\" *ngIf=\" final_data_list.length > 0\" class=\"label label-default\">Start Date:{{date_start}}</span>\n\n      <span style=\"font-size:15px\" *ngIf=\" final_data_list.length > 0\" class=\"label label-default\">End Date: {{date_end}}</span>\n      <br><br><br>\n      <div style=\"display: block;\">\n        <canvas baseChart *ngIf=\" final_data_list.length > 0\"\n          width=\"500\" height=\"300\"\n                    [(datasets)]=\"waterlineData\"\n                    [(labels)]=\"waterLabels\"\n                    [(options)]=\"lineChartOptions\"\n                    [(colors)]=\"lineChartColors\"\n                    [(legend)]=\"lineChartLegend\"\n                    [(chartType)]=\"lineChartType\"\n                    ></canvas>\n        </div>\n      </div>\n      \n    </div>\n  </div>"

/***/ }),

/***/ 693:
/***/ (function(module, exports) {

module.exports = "<div class=\"container area\">\n  <div class=\"row\">\n    <div class=\"col-xs-6 col-md-6 col-sm-6 col-lg-6 col-md-push-3 col-sm-push-3 col-xs-push-3 col-lg-push-3\">\n    <h2 class=\"page-header\" style=\"text-align:center;font-weight:bold\">Admin Login</h2>\n  <form (submit)=\"onLoginSubmit()\">\n    <div class=\"form-group\">\n      <label>Username</label>\n      <input type=\"text\" class=\"form-control\" [(ngModel)]=\"name\" name=\"name\">\n    </div>\n    <div class=\"form-group\">\n      <label>Password</label>\n      <input type=\"password\" class=\"form-control\" [(ngModel)]=\"password\" name=\"password\">\n    </div>\n    <input type=\"submit\" class=\"btn btn-primary\" value=\"Login\">\n  </form>\n  <br>  \n</div>\n  </div>\n</div>"

/***/ }),

/***/ 694:
/***/ (function(module, exports) {

module.exports = "<div class=\"jumbotron text-center\">\n    <h1 style=\"color:white;font-weight:bold\">WaterWEB</h1>\n    <p class=\"lead\" style=\"color:white\">Welcome to WaterWEB HomePage to view all your water details</p>\n    <div>\n      <a class=\"btn btn-default\" [routerLink]=\"['/login']\">Login</a>\n      <a class=\"btn btn-danger\" [routerLink]=\"['/admin']\" style=\"color:white\">Admin</a>\n    </div>\n  </div>\n  \n  <div class=\"row\">\n    <div class=\"col-md-4\">\n      <h3>Water Level Monitoring</h3>\n      <p>A WebApp for Monitoring water level of tank and water consumption of each user </p>\n    </div>\n    <div class=\"col-md-4\">\n      <h3>Live Data Visualization</h3>\n      <p>Chart.js used to plot dynamic data for each user.Data got updated by the sensor hourly and can be preview\n        using chart.js line plot.\n      </p>\n    </div>\n    <div class=\"col-md-4\">\n      <h3>Admin Water Monitoring</h3>\n      <p>Admin UI for monitoring water level of each user in building and can also watch past water consumption</p>\n    </div>\n  </div>\n  "

/***/ }),

/***/ 695:
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col-md-6 col-md-push-3\">\n<h2 class=\"page-header\">User Login</h2>\n<form (submit)=\"onLoginSubmit()\">\n  <div class=\"form-group\">\n    <label>Username</label>\n    <input type=\"text\" class=\"form-control\" [(ngModel)]=\"name\" name=\"name\">\n    \n  </div>\n  <div class=\"form-group\">\n    <label>Password</label>\n    <input type=\"password\" class=\"form-control\" [(ngModel)]=\"password\" name=\"password\">\n  </div>\n  <input type=\"submit\" class=\"btn btn-primary\" value=\"Login\">\n</form>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ 696:
/***/ (function(module, exports) {

module.exports = "\n<nav class=\"navbar navbar-default\">\n  <div class=\"container\">\n    <div class=\"navbar-header\">\n      <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\">\n        <span class=\"sr-only\">Toggle navigation</span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </button>\n      <a class=\"navbar-brand\" href=\"#\">WaterWeb</a>\n    </div>\n    <div id=\"navbar\" class=\"collapse navbar-collapse\">\n      <ul class=\"nav navbar-nav navbar-left\">\n        <li [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\"><a [routerLink]=\"['/']\">Home</a></li>\n      </ul>\n\n      <ul *ngIf=\"authService.userAccess\" class=\"nav navbar-nav navbar-right\">\n     \n      \n        <li *ngIf=\"authService.loggedIn()\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\"><a [routerLink]=\"['/userdashboard']\">Dashboard</a></li>\n        <li *ngIf=\"authService.loggedIn()\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\"><a [routerLink]=\"['/profile']\">Profile</a></li>\n\n        <li *ngIf=\"!authService.loggedIn()\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\"><a [routerLink]=\"['/login']\">Login</a></li>\n        <li *ngIf=\"authService.loggedIn()\"><a (click)=\"onLogoutClick()\" href=\"#\">Logout</a></li>\n\n     \n      </ul>\n\n      <ul *ngIf=\"authService.adminAccess\" class=\"nav navbar-nav navbar-right\">\n        \n         \n        <li *ngIf=\"authService.loggedIn()\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\"><a [routerLink]=\"['/admindashboard']\">Dashboard</a></li>\n        \n           <li *ngIf=\"authService.loggedIn()\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\"><a [routerLink]=\"['/usermanagers']\">User Management</a></li>   \n           \n           <li *ngIf=\"authService.loggedIn()\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\"><a [routerLink]=\"['/register']\">Register New User</a></li>   \n           \n           <li *ngIf=\"!authService.loggedIn()\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions] = \"{exact:true}\"><a [routerLink]=\"['/admin']\">Login</a></li>\n           <li *ngIf=\"authService.loggedIn()\"><a (click)=\"onLogoutClick()\" href=\"#\">Logout</a></li>\n   \n         \n        \n      </ul>\n   \n    </div><!--/.nav-collapse -->\n  </div>\n</nav>"

/***/ }),

/***/ 697:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"user\">\n  <h2 class=\"page-header\" style=\"font-weight:bold\">User: {{user.name}}</h2>\n  <ul class=\"list-group\">\n    <li class=\"list-group-item\">ApartmentId: {{user.appartmentId}}</li>\n    <li class=\"list-group-item\">Email: {{user.email}}</li>\n    \n  </ul>\n</div>"

/***/ }),

/***/ 698:
/***/ (function(module, exports) {

module.exports = "<h2 class=\"page-header\">Register</h2>\n<form (submit)=\"onRegisterSubmit()\">\n  <div class=\"form-group\">\n    <label>Name</label>\n    <input type=\"text\" [(ngModel)]=\"name\" name=\"name\" class=\"form-control\">\n  </div>\n\n  <div class=\"form-group\">\n    <label>Email</label>\n    <input type=\"text\" [(ngModel)]=\"email\" name=\"email\" class=\"form-control\" >\n  </div>\n  <div class=\"form-group\">\n    <label>Password</label>\n    <input type=\"password\" [(ngModel)]=\"password\" name=\"password\" class=\"form-control\">\n  </div>\n\n  <div class=\"form-group\">\n    <label>Confirm Password</label>\n    <input type=\"password\" [(ngModel)]=\"conf_password\" name=\"conf_password\" class=\"form-control\">\n  </div>\n\n  <div class=\"form-group\">\n      <label>Apartment ID</label>\n      <input type=\"text\" [(ngModel)]=\"apartmentId\" name=\"apartmentId\" class=\"form-control\">\n  </div>\n\n  <input type=\"submit\" class=\"btn btn-primary\" value=\"Submit\">\n  \n</form>\n"

/***/ }),

/***/ 699:
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <div class=\"row\">\n\n      <div class=\"col-sm-6 col-sm-push-3\">\n          <div class=\"row\">\n            <h1 style=\"font-weight:bold;text-align:center;color:rgb(2,163,221)\">Filter Data</h1>\n            <form (submit)=\"querySearch()\">\n                <div class=\"form-group\">\n                  <label>StartDate</label>\n                  <input type=\"text\" class=\"form-control\" [(ngModel)]=\"sdate\" name=\"sdate\" placeholder=\"YYYY-MM-DD\">\n                </div>\n                <div class=\"form-group\">\n                  <label>EndDate</label>\n                  <input type=\"text\" class=\"form-control\" [(ngModel)]=\"edate\" name=\"edate\" placeholder=\"YYYY-MM-DD\">\n                </div>\n  \n                <div class=\"form-group\">\n                    <label>StartTime</label>\n                    <input type=\"text\" class=\"form-control\" [(ngModel)]=\"stime\" name=\"stime\" placeholder=\"HH-MM-SS\">\n                  </div>\n  \n                <div class=\"form-group\">\n                    <label>EndTime</label>\n                    <input type=\"text\" class=\"form-control\" [(ngModel)]=\"etime\" name=\"etime\" placeholder=\"HH-MM-SS\">\n                  </div>\n  \n                <input type=\"submit\" class=\"btn btn-primary\" value=\"Get Graph\">\n              </form>\n  \n          </div>\n          \n          \n          <div class=\"row\">\n  \n            \n          </div>\n  \n      </div>\n    </div>\n  \n  \n  \n  </div>\n\n<div class=\"container-fluid\" style=\"position:relative;top:30px\">\n  <div class=\"row col-md-3 col-md-push-5\"> \n    <span style=\"font-size:30px\" class=\"label label-default\">Date: {{date}}</span><br><br>\n  </div>\n</div>\n\n<div class=\"container\" style=\"position:relative;top:50px\">\n  <div class=\"row\">\n      <h1 *ngIf=\"user_time && user_water.length > 0\" style=\"text-align:center;font-weight:bold\" class=\"well\" >User Data</h1>\n      \n    <div class=\"col-md-10 col-md-push-1\">\n      <div style=\"display: block;\">\n      <canvas baseChart *ngIf=\"user_time && user_water.length > 0\"\n        width=\"500\" height=\"200\"\n                  [datasets]=\"waterlineData\"\n                  [labels]=\"waterLabels\"\n                  [options]=\"lineChartOptions\"\n                  [colors]=\"lineChartColors\"\n                  [legend]=\"lineChartLegend\"\n                  [chartType]=\"lineChartType\"\n                  ></canvas>\n      </div>\n    </div>\n    \n  </div>\n</div>\n<br>\n<div class=\"container\">\n    <div class=\"row\">\n        \n        <h2 style=\"text-align:center;font-weight:bold\"  class=\"well\" >Tank Data\n          <br>Current Tank Value:<span style=\"color:red\">{{this.tank_current_value}}</span> Litres\n        </h2>\n        \n      <div class=\"col-md-10 col-md-push-1\">\n        <div style=\"display: block;\">\n        <canvas baseChart *ngIf=\"time_data && water_data.length > 0\"\n          width=\"500\" height=\"200\"\n                    [datasets]=\"lineChartData\"\n                    [labels]=\"lineChartLabels\"\n                    [options]=\"lineChartOptions\"\n                    [colors]=\"lineChartColors\"\n                    [legend]=\"lineChartLegend\"\n                    [chartType]=\"lineChartType\"\n                    ></canvas>\n        </div>\n      </div>\n      \n    </div>\n</div>\n"

/***/ }),

/***/ 700:
/***/ (function(module, exports) {

module.exports = "<div class=\"container\" *ngIf=\"table_view\">\n  <div class=\"row\">\n    <div class=\"col-sm-12 well left_bar\">\n      <h1 style=\"font-weight:bold;color:cadetblue;\">User List</h1>\n      \n      <table class=\"table\"> \n        <tbody>\n          <tr *ngFor=\"let user of user_name_list;let i = index\">\n            <td>{{user.name}}</td>\n              \n            <td>{{user.email}}</td>\n              \n\n            <td>{{user.appartmentId}}</td>\n            \n\n            <td><button type=\"button\" class=\"btn btn-success\" (click)=\"update(i)\">Update</button></td>\n            \n            \n            <td><button type=\"button\" class=\"btn btn-danger\"  (click)=\"delete(i)\" >Delete</button></td>\n          </tr>\n\n        </tbody>\n\n        <!---\n        <tbody *ngIf=\"updateClick\">\n          \n          <tr *ngFor=\"let user of user_name_list\">\n            <td>\n              <input type=\"text\" [(ngModel)]=\"name\" name=\"name\" placeholder=\"Name\" value=\"{{user.name}}\" class=\"form-control\">\n            </td>\n            <td>\n              <input type=\"text\" [(ngModel)]=\"email\" name=\"email\" placeholder=\"Email\" value=\"{{user.email}}\" class=\"form-control\">\n            </td>\n              <td>\n                  <input type=\"text\" [(ngModel)]=\"appartmentId\" name=\"appartmentId\" placeholder=\"ApartmentId\" value=\"{{user.appartmentId}}\" class=\"form-control\">\n                </td>\n                \n              \n            <td><button type=\"button\" class=\"btn btn-warning\" (click)=\"Submit()\">Submit</button></td>\n            <td><button type=\"button\" class=\"btn btn-danger\"  (click)=\"delete()\" >Delete</button></td>\n          </tr>\n\n        </tbody>\n      -->\n      </table>\n      \n    </div>\n  </div>\n</div>\n\n<div class=\"container\" *ngIf=\"!table_view\">\n    <div class=\"row\">\n      \n      <div class=\"col-sm-12 well left_bar\">\n        <h2 class=\"page-header\">Update User :<span style=\"font-weight:Bold;color:crimson\">{{name}}</span></h2>\n        <form (submit)=\"Submit()\">\n          <div class=\"form-group\">\n            <label>Name</label>\n            <input type=\"text\" [(ngModel)]=\"name\" name=\"name\" class=\"form-control\" value=\"{{name}}\">\n          </div>\n        \n          <div class=\"form-group\">\n            <label>Email</label>\n            <input type=\"text\" [(ngModel)]=\"email\" name=\"email\" class=\"form-control\" value=\"{{email}}\">\n          </div>\n        \n          <div class=\"form-group\">\n              <label>Apartment ID</label>\n              <input type=\"text\" [(ngModel)]=\"appartmentId\" name=\"apartmentId\" class=\"form-control\" value=\"{{appartmentId}}\">\n          </div>\n        \n          <input type=\"submit\" class=\"btn btn-primary\" value=\"Submit\">\n          \n        </form>\n    </div>\n</div>\n</div>"

/***/ }),

/***/ 724:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(390);


/***/ })

},[724]);
//# sourceMappingURL=main.bundle.map