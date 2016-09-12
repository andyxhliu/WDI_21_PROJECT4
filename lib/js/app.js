angular
  .module("OneApp", ['ngResource', 'satellizer', 'ui.router', 'angular-jwt'])
  .constant("SOUNDCLOUD_KEY", "057f6e8bbc48cc7f8ef8520b83444560")
  .config(whitelistUrls)
  .config(setupInterceptor)
  .config(oauthConfig)
  .config(Router);

whitelistUrls.$inject = ['$sceDelegateProvider'];
function whitelistUrls($sceDelegateProvider){
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'https://api.soundcloud.com/**'
  ]);
}
setupInterceptor.$inject = ["$httpProvider"];
function setupInterceptor($httpProvider) {
  return $httpProvider.interceptors.push("AuthInterceptor");
}

oauthConfig.$inject = ["$authProvider"];
function oauthConfig($authProvider) {
  $authProvider.tokenPrefix = '';

  $authProvider.facebook({
    url: '/oauth/facebook',
    clientId: "1833997416820716"
  });

  $authProvider.github({
    url: '/oauth/github',
    clientId: "a073ae2e88c6002916a1"
  });
}

Router.$inject = ["$stateProvider", "$urlRouterProvider"];
function Router($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state("main", {
      url: "/",
      templateUrl: "/templates/main.html"
    })
    .state("login", {
      url: "/login",
      templateUrl: "/templates/login.html",
      controller: "LoginController as login"
    })
    .state('register', {
      url: '/register',
      templateUrl: '/templates/register.html',
      controller: "RegisterController as register"
    })
    .state("usersIndex", {
      url: "/users",
      templateUrl: "/templates/users/index.html",
      controller: "UsersIndexController as usersIndex"
    })
    .state("roomsIndex", {
      url: "/rooms",
      templateUrl: "/templates/rooms/index.html",
      controller: "RoomsIndexController as roomsIndex"
    })
    .state("roomsNew", {
      url: "/rooms/new",
      templateUrl: "/templates/rooms/new.html",
      controller: "RoomsNewController as roomsNew"
    })
    .state("roomsShow", {
      url: "/rooms/:id",
      templateUrl: "/templates/rooms/show.html",
      controller: "RoomsShowController as roomsShow"
    })
    .state("roomsEdit", {
      url: "/rooms/:id/edit",
      templateUrl: "/templates/rooms/edit.html",
      controller: "RoomsEditController as roomsEdit"
    });

  $urlRouterProvider.otherwise("/login");
}