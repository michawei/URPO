
angular.module('urpoAPP', ['ngSanitize', 'ngCsv']).controller('searchController', function($scope) {
	

    $scope.Data = GET_PROJECTLIST();
    
    for (var i = 0; i < $scope.Data.length; i ++) {
        $scope.Data[i].select = false;
    }

    $scope.myHide = function (index) {
        var len = $scope.getHeader1().length;
        if(index == len ) {
            return true;
        } else {
            return false;
        }
    }

    $scope.selectAll = function() {
    	for (var i = 0; i < $scope.Data.length; i++) {
    		if ($scope.Data[i].select == 0) console.log((i+1) + " change to true");
    		$scope.Data[i].select = true;
    	}
    }

    $scope.unselectAll = function() {
    	for (var i = 0; i < $scope.Data.length; i++) {
    		if ($scope.Data[i].select == 1) console.log((i+1) + " change to false");
    		$scope.Data[i].select = false;
    	}
    }

    

    $scope.select1 = function(x) {
        
        console.log(x.Project_Name);
        for (var i = 0; i < $scope.Data.length; i ++) {
            if ($scope.Data[i].id == x.id) {
                $scope.Data[i].select = true;
                break;
            }
        }
    }

    

    $scope.unselect1 = function(x) {
        
        for (var i = 0; i < $scope.Data.length; i ++) {
            if ($scope.Data[i].Project_Name == x.Project_Name) {
                $scope.Data[i].select = false;
                break;
            }
        }
        

    }

    

    $scope.order = "id";
    var list = ["id", "Category", "Dept", "Project_Name", "Estimated_Start_Date", "Estimated_End_Date", "Region", "Institution", "Project_Agreement_Status", "Project_Owners", "Principal_Investigators"];
    var glyphicon_status = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    $scope.sort = function(index) {
        console.log('sort');
        for (var i = 0; i < glyphicon_status.length; i ++) {
            glyphicon_status[i] = 0;
        }
        if($scope.order == list[index]) {
            glyphicon_status[index] = 1;
            $scope.order = "-" + $scope.order;
        } else {
            glyphicon_status[index] = 0;
            $scope.order = list[index]; 
        }

    };

    $scope.glyphicon_hide = function(index) {
        return glyphicon_status[index];
    }
    

    $scope.getHeader = function() {
        var a = Object.keys($scope.Data[0]);
        a.pop();    // $$hash ?
        a.pop();    // select
        return a;
    }

    $scope.getHeader1 = function() {
        return ["id", "Project Name", "Project Owners", "Category", "Department", "Principal Investigators", "Region", "Institution", "Start Date", "End Date"];
        //return Object.keys($scope.OriginalData[0]);
    }

    $scope.header = $scope.getHeader();
    $scope.header1 = $scope.getHeader1();


    var DataProcessing = function(data) {
        // Project_Owners
        var tmp = ["", "", "", ""];
        for (var i = 0; i < data['Project_Owners'].length; i ++) {
            
            console.log(data['Project_Owners'][i].Name);
            tmp[0] += ("Name:" + data['Project_Owners'][i].Name + " ");
            tmp[0] += ("EmpID:" + data['Project_Owners'][i].EmpID + "\n");
        }
        data['Project_Owners'] = tmp[0];
        // Principal_Investigators
        for(var i = 0; i < data['Principal_Investigators'].length; i ++) {
            console.log(data['Principal_Investigators'][i].Name);
            tmp[1] += ("Name:" + data['Principal_Investigators'][i].Name + " ");
            tmp[1] += ("Email:" + data['Principal_Investigators'][i].Email + " ");
            tmp[1] += ("Website:" + data['Principal_Investigators'][i].Website + "\n");
        }
        data['Principal_Investigators'] = tmp[1];
        // Milestone
        for(var i = 0; i < data['Milestone'].length; i ++) {
            console.log(data['Milestone'][i].Name);
            var M = data['Milestone'][i];
            tmp[2] += ("Name:" + M.name + " ");
            tmp[2] += ("start time:" + M.start_time + " ");
            tmp[2] += ("end time:" + M.end_time + " ");
            tmp[2] += ("status:" + M.status + " ");
            tmp[2] += ("description:" + M.description + " ");
            tmp[2] += ("files:\n")
            for(var j = 0; j < M.file.length; j ++) {
                tmp[2] += ("File Name: " + M.file[j].file_name + " File Path: " + M.file[j].file_path + "\n");
            }
        }
        data['Milestone'] = tmp[2];

        // Edit State
        for(var i = 0; i < data['edit_state'].length; i ++) {
            var E = data['edit_state'][i];
            tmp[3] += ("state" + (i + 1) + ": ");
            tmp[3] += ("add or edit: " + E.add_or_edit + " ");
            tmp[3] += ("edit person: " + E.edit_person + " ");
            tmp[3] += ("edit column: " + E.edit_column + "\n");
        }
        data['edit_state'] = tmp[3];


        data['file_system'] = [];
        delete data['select']; // no need to be in csv file

        return data;
    }


    $scope.getData1 = function() {
        var data = [];
        var tmp = $scope.Data;
        for (var i = 0; i < tmp.length; i ++) {
            
            if(tmp[i].select == true) {
                var tmpData = {}
                $.extend(tmpData, $scope.Data[i]);
                tmpData = DataProcessing(tmpData);
                
                data.push(tmpData);    
            }
        }


        return data;
    }

    $scope.getOwner = function(obj) {
        var a = [];
        for(var i = 0; i < obj.length; i ++) {
            a.push(obj[i].Name);
        }
        return a;
    }

    var getID = function(x, y) {
        for (var i = 0; i < x.length; i ++) {
            if (x[i].Name == y) {
                return x[i].EmpID; 
            }
        }
    }

    var getWebsite = function(x, y) {
        for (var i = 0; i < x.length; i ++) {
            if (x[i].Name == y) {
                return x[i].Website; 
            }
        }
    }

    var getEmail = function(x, y) {
        for (var i = 0; i < x.length; i ++) {
            if (x[i].Name == y) {
                return x[i].Email; 
            }
        }
    }


    $scope.getInvestigator = $scope.getOwner;

    $scope.transferOwnerData = function(x, y) {
        $scope.ModalName = y;
        $scope.Information = "";
        $scope.Email = "";
        $scope.Website = "";

        if (getID(x, y) != "") {
            $scope.Information = "EMPID: \n" + getID(x, y) + "\n";    
        }
        
    }

    $scope.transferInvestigatorData = function(x, y) {
        $scope.ModalName = y;
        var tmp = "";
        $scope.Information = "";
        $scope.Email = "";
        $scope.Website = "";

        if (getEmail(x, y) != "") {
            $scope.Email = ("Email: " + getEmail(x, y));    
        }
        if (getWebsite(x, y) != "") {
            $scope.Website += ("Website: " + getWebsite(x, y));    
        }
        
        
    }


});