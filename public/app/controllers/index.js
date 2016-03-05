var indexCtr = angular.module('IndexModule', []);

indexCtr.controller('IndexController', ['$scope', 'RestService', function($scope, RestService){

	$scope.profile = {
		id:null,
		name: '',
		city: '',
		password: '',
		occupation: ''
	}

	$scope.init = function(){
		console.log('IndexController: INIT');
		RestService.query({resource:'currentuser'}, function(response){
			console.log(JSON.stringify(response));

			if (response.confirmation != 'success'){
//				alert(response.message);
				return;
			}

			$scope.profile = response.profile;
		});
	}

	function validate(props){
		for (var i=0; i<props.length; i++){
			var property = props[i];
			var value = $scope.profile[property];
			if (value.length == 0){
				return property;
			}
		}

		return null;
	}


	$scope.login = function(){
		var missingProperty = validate(['name', 'password']);
		if (missingProperty != null){
			alert('Please enter your '+missingProperty);
			return;
		}

		console.log('Log In: '+JSON.stringify($scope.profile));
		RestService.post({resource:'login'}, $scope.profile, function(response){
			console.log(JSON.stringify(response));

			if (response.confirmation != 'success'){
				alert(response.message);
				return;
			}

			window.location.href = '/account';

		});
	}

	$scope.submit = function(){
		var missingProperty = validate(['name', 'city', 'occupation', 'password']);
		if (missingProperty != null){
			alert('Please enter your '+missingProperty);
			return;
		}


		console.log('Submit: '+JSON.stringify($scope.profile));
		RestService.post({resource:'profile'}, $scope.profile, function(response){
			console.log(JSON.stringify(response));

			window.location.href = '/account';

		});


	}


}]);

