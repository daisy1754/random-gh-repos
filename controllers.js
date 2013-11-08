var App = angular.module('randomGHRepos', []);

App.controller('RepoListCtrl', function RepoListCtrl($scope, $http) {
  $scope.querySearchAPI = function() {
      delete $scope.repos;
      $http.get("https://api.github.com/search/repositories?q=language:javascript&sort=updated&order=desc")
          .success(function(data) {$scope.repos = data.items});
  };

  $scope.queryRepositoriesAPI = function() {
      delete $scope.repos;
      if (!$scope.numOfRepositoriesEstimate) {
        $http.get("https://api.github.com/search/repositories?q=created:>=" + $scope.formattedDate())
          .success(function(data) {
              $scope.numOfRepositoriesEstimate = data.items[0].id;
              $scope.queryNewerRepositories();
          });
      } else {
        $scope.queryNewerRepositories();
      }
  };

  $scope.queryNewerRepositories = function() {
      $http.get("https://api.github.com/repositories?since=" + $scope.numOfRepositoriesEstimate)
          .success(function(data) {$scope.repos = data});
  }

  $scope.formattedDate = function() {
      var now = new Date();
      return now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
  }
});
