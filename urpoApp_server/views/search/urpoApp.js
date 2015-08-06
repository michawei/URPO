'use strict';
var App = angular.module('urpoApp', ['ngResource', 'App.filters']);



App.controller('ClientCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.selectedCompany = [];
    $scope.item = [];
    $http.get('/filter/sample').success(function(data){
        $scope.item = data;
    });
    $scope.companyList = [];

    $scope.sentence = "nothing chosen";
    $scope.makesentence = function(name){
        $scope.companyList = [];
        $scope.tmpname = $scope.item[name];
        for(var y = 0; y < $scope.tmpname.length; y++) {
            $scope.companyList.push({"id": y,"name":$scope.tmpname[y]});
        }
        console.log($scope.companyList);
        if ($scope.selectedCompany.length == 0){
            $scope.sentence = 'nothing chosen';
        }
        else if ($scope.selectedCompany.length == 1){
            $scope.sentence = $scope.companyList[$scope.selectedCompany[0]].name;
        }
        else{
            $scope.sentence = 'selected ' + $scope.selectedCompany.length + ' filters';
        }
    }
    
    $scope.setSelectedClient = function () {
        var id = this.company.id;
        if (_.contains($scope.selectedCompany, id)) {
            $scope.selectedCompany = _.without($scope.selectedCompany, id);
        } else {
            $scope.selectedCompany.push(id);
        }
        return false;
    };
    $scope.isChecked = function (id) {
        if (_.contains($scope.selectedCompany, id)) {
            return 'glyphicon glyphicon-ok pull-right';
        }
        return false;
    };
    $scope.checkAll = function () {
        $scope.selectedCompany = _.pluck($scope.companyList, 'id');
    };
}]);





angular.module('App.filters', []).filter('companyFilter', [function () {
    return function (clients, selectedCompany) {};
}]);
