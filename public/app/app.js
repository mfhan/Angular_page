var modules = [
	'IndexModule',
	'AccountModule',
	'RestServiceModule'
]

var app = angular.module('LandingPage', modules, function($interpolateProvider){
	$interpolateProvider.startSymbol('<%');
	$interpolateProvider.endSymbol('%>');

});