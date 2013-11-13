var App = angular.module('randomGHRepos', []);

App.controller('RepoListCtrl', function RepoListCtrl($scope, $http) {
  $scope.querySearchAPI = function() {
      delete $scope.repos;
      $scope.currentDate = new Date();
      $http.get("https://api.github.com/search/repositories?q=language:javascript&sort=updated&order=desc")
          .success(function(data) {$scope.repos = data.items});
  };

  $scope.queryRepositoriesAPI = function() {
      delete $scope.repos;
      $scope.currentDate = new Date();
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
      var now = $scope.currentDate;
      return now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
  }

  $scope.filter = function(item) {
    var shouldBeDisplayed = true;
    if ($scope.descriptionFilter && !item.description) {
      shouldBeDisplayed = false;
    }
    if ($scope.urlFilter && !item.homepage) {
      shouldBeDisplayed = false;
    }
    return shouldBeDisplayed;
  }
});
