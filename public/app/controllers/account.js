var accountCtr = angular.module('AccountModule', []);

accountCtr.controller('AccountController', ['$scope', 'RestService', function($scope, RestService){

	$scope.profile = {
		id:null
	}

	$scope.init = function(){
		console.log('AccountController: INIT');
		RestService.query({resource:'currentuser'}, function(response){
			console.log(JSON.stringify(response));

			if (response.confirmation != 'success'){
				alert(response.message);
				return;
			}

			$scope.profile = response.profile;
		});
	}

	$scope.update = function(){
		console.log('UPDATE: '+JSON.stringify($scope.profile));


		RestService.put({resource:'profile', id:$scope.profile.id}, $scope.profile, function(response){
			console.log(JSON.stringify(response));
		});
	}


	$scope.bio = function(){
		console.log('UPDATE: '+JSON.stringify($scope.profile));


		RestService.put({resource:'profile', id:$scope.profile.id}, $scope.profile, function(response){
			console.log(JSON.stringify(response));
		});
	}


}]);

