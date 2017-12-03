'use strict';

angular.module('conFusion.services', ['ngResource'])
        .constant("baseURL","https://192.168.0.23:3443/")
        .factory('menuFactory', ['$resource', 'baseURL', function($resource,baseURL) {

                return $resource(baseURL+"dishes/:id", null,  {
                    'update':{method:'PUT' }
                });
                        
        }])

        .factory('commentFactory', ['$resource', 'baseURL', function($resource,baseURL) {

                return $resource(baseURL+"dishes/:id/comments/:commentId",
                                {id:"@Id", commentId:"@CommentId"},
                                {'update':{method:'PUT' }
                });
                        
        }])

        .factory('promotionFactory', ['$resource', 'baseURL', function($resource, baseURL) {
                return   $resource(baseURL+"promotions/:id", null,  {
                    'update':{method:'PUT' }
                });
        }])

        .factory('corporateFactory', ['$resource', 'baseURL', function($resource,baseURL) {
                return $resource(baseURL+"leadership/:id", null,  {
                    'update':{method:'PUT' }
                });
    
        }])

        .factory('feedbackFactory', ['$resource', 'baseURL', function($resource,baseURL) {
                return $resource(baseURL+"feedback/:id");
    
        }])
        
        .factory('favoriteFactory', ['$resource', 'baseURL', 'localStorage', function($resource,baseURL, localStorage) {
                return $resource(baseURL+"favorites/:id",
                                null, {
                                    'update':{method:'PUT' },
                                    'query': {method:'GET', isArray:false}
                });
    
        }])

        .factory('localStorage', ['$window', function($window) {
            return {
                store: function(key, value) {
                  $window.localStorage[key] = value;
                },
                get: function(key, defaultValue) {
                  return $window.localStorage[key] || defaultValue;
                },
                remove: function(key) {
                    $window.localStorage.removeItem(key);
                },
                storeObject: function(key, value) {
                  $window.localStorage[key] = JSON.stringify(value);
                },
                getObject: function(key,defaultValue) {
                  return JSON.parse($window.localStorage[key] || defaultValue);
                }
            };
        }]) 
        .factory('AuthFactory', ['$resource', '$http', 'localStorage', '$rootScope', '$window', 'baseURL', function($resource, $http, localStorage, $rootScope, $window, baseURL) {
            var authFac = {};
            var TOKEN_KEY = 'Token';
            var isAuthenticated = false;
            var username = '';
            var authToken = undefined;
            var authError = undefined;
            
            //Load credentials from local storgae
            function loadUserCredentials() {
                var credentials = localStorage.getObject(TOKEN_KEY, '{}');
                if(credentials.username != undefined) {
                    useCredentials(credentials);
                }
            }
            //Store user credentials in local storage
            function storeUserCredentials(credentials) {
                localStorage.storeObject(TOKEN_KEY, credentials);
                useCredentials(credentials);
            }
            //Set the credentials on the http header
            function useCredentials(credentials) {
                isAuthenticated = true;
                username = credentials.username;
                authToken = credentials.token;
                
                //Set the token in $http header for future requests
                $http.defaults.headers.common['x-access-token'] = authToken;
            }
            //Unset the credentials from the http header
            function destroyUserCredentials(credentials) {
                authToken = undefined;
                isAuthenticated = false;
                username = '';
                //Reset the token in $http header for future requests
                $http.defaults.headers.common['x-access-token'] = authToken;
                localStorage.remove(TOKEN_KEY);
            }
            
            //Login call to the server to retrieve the token
            authFac.login = function(loginData) {
                console.log("Logging in at: "+baseURL+"users/login");
                authError = undefined;
                //Call REST API endpoint
                $resource(baseURL+"users/login") 
                .save(loginData, function(response) {
                    console.log("Login successful");
                    //Store username and token
                    storeUserCredentials({username:loginData.username, token:response.token});
                    //Broadcast event to all other controllers
                    $rootScope.$broadcast('login:Successful');
                    
                }, function(response) {
                    isAuthenticated = false;
                    console.log(response.data.err);
                    authError = response.data.err;
                    $rootScope.$broadcast('login:Failed');
                });
            };
            //Logout function to clear server state
            authFac.logout = function() {
                $resource(baseURL + "users/logout").get(function(response) {});
                destroyUserCredentials();
            };
            //Register new user function
            authFac.register = function(registerData) {
                authError = undefined;
                $resource(baseURL + "users/register") 
                .save(registerData, 
                    //If successful registration
                    function(response) {
                        authFac.login({username:registerData.username, password:registerData.password});
                    
                        if(authError == undefined && registerData.rememberMe) {
                            localStorage.storeObject('userinfo', {
                                username:registerData.username,
                                password:registerData.password
                            });
                        }
                    
                        if(authError == undefined) $rootScope.$broadcast('registration:Successful');
                    },
                     //If not successful
                     function(response) {
                        isAuthenticated = false;
                        console.log(response.data.err);
                        authError = response.data.err;
                        $rootScope.$broadcast('registration:Failed');
                    });
            };
            authFac.getError = function() {
                return authError;  
            };
            //Helper function to see if we are authenticated
            authFac.isAuthenticated = function() {
                return isAuthenticated;
            };
            //Header function to get the user name
            authFac.getUsername = function() {
                return username;
            };
            //Load user credentials at the start
            loadUserCredentials();
            
            return authFac;
        }])

;