var membersCtr = angular.module('MembersModule', []);

membersCtr.controller('MembersController', ['$scope', 'RestService', function($scope, RestService){

  $scope.profile = null;
  $scope.members = null;

  $scope.init = function(){
    console.log('MembersController');
    RestService.query({resource:'currentuser'}, function(response){
      console.log(JSON.stringify(response));

      if (response.confirmation != 'success'){
        alert(response.message);
        return;
      }
      $scope.profile = response.profile;
    });

    RestService.query({resource:'profile'}, function(response){
      console.log(JSON.stringify(response));

      if (response.confirmation != 'success'){
        alert(response.message);
        return;
      }
      $scope.members = response.profiles;
    });
  }

}]);

