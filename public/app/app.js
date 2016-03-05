var modules = [
	'IndexModule',
	'AccountModule',
  'MembersModule',
	'RestServiceModule'
]

var app = angular.module('LandingPage', modules, function($interpolateProvider){
	$interpolateProvider.startSymbol('<%');
	$interpolateProvider.endSymbol('%>');

});