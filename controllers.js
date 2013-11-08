var App = angular.module('randomGHRepos', []);

App.controller('RepoListCtrl', function RepoListCtrl($scope, $http) {
  $scope.querySearchAPI = function() {
      delete $scope.repos;
      $http.get("https://api.github.com/search/repositories?q=language:javascript&sort=updated&order=desc")
          .success(function(data) {$scope.repos = data.items});
  };
});
