var app = angular.module('urpoApp', []);

app.controller("projectDetailCtrl", function($scope, $http) {
	var project = '';
	$http.get("http://localhost:4000/project")
  		.success(function (res) { 
			project = res[1];
			console.log(project);
			$scope.projTitle = project.Project_Name;
			$scope.projID = project.id;
			$scope.projCategory = project.Category;
			$scope.projDepartment = project.Dept;
			$scope.projCountry = project.Region;
			$scope.projInstitution = project.Institution;
			$scope.projHost = project.Principal_Investigators;
			$scope.projOwners = project.Project_Owners;
			$scope.projStart = project.Estimated_Start_Date;
			$scope.projEnd = project.Estimated_End_Date;
			$scope.projDescription = project.Project_Description;
			$scope.projProgress = project.Project_Agreement_Status;
			$scope.projMoney = project.Cash_Funding;
			$scope.projCurrency = project.Currency;

			$scope.starColor = $scope.star();
  		});


	$scope.star = function(){
		var num = $scope.projProgress.split(" ")[0];
		if(num>=0 && num<=5 || num=='Project')
			return { color:'#d9534f' };
		else if(num==6)
			return { color:'#5cb85c' };
		else
			return { color:'#777' }
	}

});