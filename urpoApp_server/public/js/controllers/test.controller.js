angular.module('urpoApp').controller('testCtrl', ['$scope', '$http', function($scope, $http) {

	$scope.PM_list = {};
	$scope.filter_category = {};
	$scope.filter_dept = {};
	$scope.filter_region = {};
	$scope.filter_institution = {};
	$scope.filter_collaboration = {};
	$scope.filter_agreementStatus = {};
	$scope.filter_employee = {};
	$scope.filter_principal = {};
	$scope.tmp_filter_id = "";


	$scope.project_list = [];

	$scope.send_1 = function(){
		
		// Use to post to project database
		for( var i = 0 ; i < $scope.project_list.length ; i++ ){
			$http.post('/project', $scope.project_list[i]).success(function(data) {
				//console.log(data);
				//$scope.project_list = data;
				//console.log($scope.project_list);
			})
		};
	};

	$scope.send_2 = function(){

		$http.get("/project/filter").success(function(data){
			console.log(data);
		});

		// Use to post to pm database
		/*var tmp_dict = {};
		$http.get("/project").success(function(data){
			//console.log(data);
			$scope.project_list = data;
			//console.log($scope.project_list);

			var ALL_EMPID = 0;

			for ( var i=0 ; i < $scope.project_list.length ; i++){

				for ( var j=0 ; j < $scope.project_list[i].employee.length ; j++ ){

					if ( !($scope.project_list[i].employee[j].name in tmp_dict) ){
						var tmp_EMPID = ALL_EMPID.toString();
						while(tmp_EMPID.length != 5){
							tmp_EMPID = "0" + tmp_EMPID;
						}
						console.log(tmp_EMPID);
						ALL_EMPID += 1;
						tmp_dict[$scope.project_list[i].employee[j].name] = tmp_EMPID;
						$scope.PM_list[$scope.project_list[i].employee[j].name] = { 'id': tmp_EMPID, 'projectID': [data[i]._id], 'real_id': ''};

						$http.post("/pm", {
							name: $scope.project_list[i].employee[j].name,
						    username: tmp_EMPID,
						    password: "",
						    id: tmp_EMPID,
						    projectID: [$scope.project_list[i]._id],
						    //Draft_ID: [],
						    profile: "",    //存路徑
						    remark: "",
						    //role: "PM"
						}).success(function (post_data){
							$scope.PM_list[post_data.name]['real_id'] = post_data._id;
						})
					} else {
						$scope.PM_list[$scope.project_list[i].employee[j].name].projectID.push($scope.project_list[i]._id);
					}
				};
			};
			
			// Use to post to Filter
			for ( var i=0 ; i < $scope.project_list.length ; i++){

				if ( !($scope.project_list[i].category in $scope.filter_category) && $scope.project_list[i].category!="" ){
					$scope.filter_category[$scope.project_list[i].category] = true;
				}
				if ( !($scope.project_list[i].dept in $scope.filter_dept) && $scope.project_list[i].dept!="" ){
					$scope.filter_dept[$scope.project_list[i].dept] = true;
				}
				if ( !($scope.project_list[i].region in $scope.filter_region) && $scope.project_list[i].region!="" ){
					$scope.filter_region[$scope.project_list[i].region] = true;
				}
				if ( !($scope.project_list[i].institution in $scope.filter_institution) && $scope.project_list[i].institution!="" ){
					$scope.filter_institution[$scope.project_list[i].institution] = true;
				}
				for ( var j=0 ; j < $scope.project_list[i].employee.length ; j++ ){
					if ( !($scope.project_list[i].employee[j].name in $scope.filter_employee) ){
						$scope.filter_employee[$scope.project_list[i].employee[j].name] = true;
					}
				}
				for ( var j=0 ; j < $scope.project_list[i].principal.length ; j++ ){
					if ( !($scope.project_list[i].principal[j].investigator in $scope.filter_principal) && $scope.project_list[i].principal[j].name != undefined ){
						$scope.filter_principal[$scope.project_list[i].principal[j].name] = true;
					}
				}
			}
			$scope.filter_agreementStatus = {"1 NDA Under Negotiation": true, "2 NDA Signed": true, "3 Project Agreement Under Negotiation": true, "4 Project Agreement Signed": true, "5 Project Agreement Pending": true, "6 Project Completed": true, "7 Others (Please use Remarks)": true, "8 Project Terminated": true};
			$scope.filter_collaboration = {"0 Undecided": true, "1 On Radar Screen": true, "2 Targeted Research - Funding Support": true, "3 Targeted Research - Joint Lab": true, "4 Targeted Research - Corporate Lab": true, "5 Targeted Research - Research Center": true, "6 Do Things Together - Joint Development": true, "7 Do Things Together - Joint Venture": true, "8 Others (Please use Remarks)": true};
			console.log($scope.filter_category);
			console.log($scope.filter_dept);
			console.log($scope.filter_region);
			console.log($scope.filter_institution);
			console.log($scope.filter_agreementStatus);
			console.log($scope.filter_employee);
			console.log($scope.filter_principal);
			$http.post("/filter", {
				category: [],
				dept: [],
				region: [],
				institution: [],
				collaboration: [],
				agreementStatus: [],
				employee: [],
				principal: []
			}).success(function (filter_data){
				$scope.tmp_filter_id = filter_data._id;
			});

		});*/
	};

	$scope.send_3 = function(){
		
		//Use to update PM's Project_id
		/*for ( var key in $scope.PM_list){
			//console.log(key);
			//console.log("/pm/"+$scope.PM_list[key].real_id);
			$http.put("/pm/"+$scope.PM_list[key].real_id, {"projectID": $scope.PM_list[key].projectID});
		};

		for ( var i=0 ; i<$scope.project_list.length ; i++ ){
			for ( var j=0 ; j<$scope.project_list[i].employee.length ; j++ ){
				console.log($scope.project_list[i].employee[j]);
				$scope.project_list[i].employee[j].id = $scope.PM_list[$scope.project_list[i].employee[j].name].id;
			}
			console.log($scope.project_list[i].employee);
			$http.put("/project/"+$scope.project_list[i]._id, {'employee': $scope.project_list[i].employee});
		};

		// Use to post to Filter database
		var tmp = [];
		for ( var key in $scope.filter_category ){
			tmp.push(key);
		}
		$http.put("/filter/"+$scope.tmp_filter_id, {'category': tmp});

		tmp = [];
		for ( var key in $scope.filter_dept ){
			tmp.push(key);
		}
		$http.put("/filter/"+$scope.tmp_filter_id, {'dept': tmp});

		tmp = [];
		for ( var key in $scope.filter_region ){
			tmp.push(key);
		}
		$http.put("/filter/"+$scope.tmp_filter_id, {'region': tmp});

		tmp = [];
		for ( var key in $scope.filter_institution ){
			tmp.push(key);
		}
		$http.put("/filter/"+$scope.tmp_filter_id, {'institution': tmp});
		
		tmp = [];
		for ( var key in $scope.filter_collaboration ){
			tmp.push(key);
		}
		$http.put("/filter/"+$scope.tmp_filter_id, {'collaboration': tmp});

		tmp = [];
		for ( var key in $scope.filter_agreementStatus ){
			tmp.push(key);
		}
		$http.put("/filter/"+$scope.tmp_filter_id, {'agreementStatus': tmp});

		tmp = [];
		for ( var key in $scope.filter_employee ){
			tmp.push(key);
		}
		$http.put("/filter/"+$scope.tmp_filter_id, {'employee': tmp});

		tmp = [];
		for ( var key in $scope.filter_principal ){
			tmp.push(key);
		}
		$http.put("/filter/"+$scope.tmp_filter_id, {'principal': tmp});
		*/
	}
}]);

angular.module('urpoApp').directive('test', function() {
	return {
		restrict: 'E',
		templateUrl: '/js/components/test.html'
	};
});