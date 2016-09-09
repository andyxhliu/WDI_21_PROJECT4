angular
  .module("OneApp", ['ngResource', 'satellizer', 'ui.router', 'angular-jwt'])
  .constant("GIPHY_KEY", "dc6zaTOxFJmzC")
  .config(setupInterceptor)
  .config(oauthConfig)
  .config(Router);

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
    });

  $urlRouterProvider.otherwise("/login");
}