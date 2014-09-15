(function () {
  var resumeApp = angular.module('resume', ['ngRoute']);

  resumeApp.config(function ($routeProvider) {

    // Route 
    $routeProvider
      .when('/', {
        templateUrl: '/views/list.html',
        controller: 'ListCtrl'
      })
      .when('/create', {
        templateUrl: '/views/createForm.html',
        controller: 'CreateCtrl'
      })
      .when('/member/:memberId', {
        templateUrl: '/views/memberDetail.html',
        controller: 'DetailCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

  resumeApp.controller('ListCtrl', function ($scope, $http) {
    var req = $http({
      url: '/list',
      method: 'GET'
    });

    req.error(function (err) {
      console.error('Submit Error:', err);
    });

    req.success(function (result) {
      $scope.list = result;
    });
  });

  resumeApp.controller('DetailCtrl', function ($scope, $http, $routeParams) {
    var req = $http({
      url: '/member/' + $routeParams.memberId,
      method: 'GET'
    });

    req.error(function (err) {
      console.error('Submit Error:', err);
    });

    req.success(function (result) {
      if (result.err) {
        console.error('Submit Error:', result.err);
      } else {
        $scope.member = result.member;
      }
    });
  });

  resumeApp.controller('CreateCtrl', function ($scope, $http) {
    $scope.submit = function () {
      var req = $http({
        url: '/create',
        method: 'POST',
        data: {
          name: $scope.inputName,
          email: $scope.inputEmail,
          gender: $scope.inputGender
        }
      });

      req.error(function (err) {
        console.error('Submit Error:', err);
      });

      req.success(function (result) {
        if (result.err) {
          console.error('Submit Error:', result.err);
        } else {
          console.log('id:', result.id);
        }
      });
    }
  });
})();