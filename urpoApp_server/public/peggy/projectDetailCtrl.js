var app = angular.module('urpoApp', []);

app.directive("animHide", function() {
      return function(scope, element, attrs) {
        scope.$watch(attrs["animHide"], function(newValue, oldValue) {
          if (newValue == true) {
            element.css("background-color", "red")
            .animate({ opacity: 0.2 }, 500, function () {
              scope.$parent.$apply(attrs["animHideDone"]);
            })
 
          }
        });
      };
    })

app.controller("projectDetailCtrl", function($scope, $http) {
	var project = '';
	$http.get("http://localhost:4000/project")
  		.success(function (res) { 
			project = {
				"id":"00001",
				"Category":"URPO",
				"Dept":"...",
				"Project_Name":"『同時定位與地圖建立系統』之技術授權",
				"Project_Description":"1. 依據雙方於民國 103 年 9 月 1 日簽署之合作研究協議書第三條『B型態』之『技術授權』合作模式 乙方同意依本條規定將授權標的授權與被授權人 約定如下:<br>2. 授權標的：係指『同時定位與地圖建立系統』之技術 其具體內容為本子約第四條各項之交付物及/或交付事項所表彰之所有智慧財產權。<br>3. 被授權人：乙方同意將本授權標的非專屬授權甲方及甲方依我國法令設立登記之關係企業使用及實施之權利 授權有效期間自底頁簽約日起十年。<br>4. 乙方理解並同意：前項被授權人製造、授權他人製造、販賣、要約銷售、經銷、進出口內含本授權標的之產品或服務 無需另行取得乙方之同意 甲方暨其關聯企業均可自行為之。<br>5. 除本條第三項之被授權人外 甲方不得將其在本契約中之權利再授權予第三人。",
				"Estimated_Start_Date":"1/1/15",
				"Estimated_End_Date":"12/31/15",
				"Region":"Taiwan",
				"Institution":"ITRI 工業研究院",
				"Competence":"",
				"Collaboration_Model":"2 Targeted Research - Funding Support",
				"Project_Agreement_Status":"3 Project Agreement Under Negotiation",
				"Currency":"NTD",
				"Cash_Funding":"1003692",
				"Project_Owners":[{"Name":"鍾佩蓉","EmpID":""}],
				"Principal_Investigators":[{"Name":"高永威","Email":"ywkao@itri.org.tw","Website":""}],
				"Milestone":[],
				"edit_state":[{"add_or_edit":"edit","edit_person":"鍾佩蓉","edit_column":"Cash_Funding"}],
				"file_system":{},
				"memo":"Hello world!!!"
				};
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
			$scope.projMilestone = project.Milestone;
			$scope.projMemo = project.memo;
			$scope.starColor = $scope.star();

			$scope.milestoneArray();
  		});


	
	$scope.more = false;
	$scope.titleSort = false;
	$scope.fromSort = false;
	$scope.toSort = false;
	$scope.stateSort = false;
	$scope.fundingSort = false;
	$scope.stateSort = false;

	$scope.predicate='index';
	$scope.reverse = false;
	$scope.titleReverse = false;
	$scope.fromReverse = false;
	$scope.toReverse = false;
	$scope.stateReverse = false;
	$scope.fundingReverse = false;
	$scope.stateReverse = false;

	$scope.editMemo = false;


	$scope.star = function(){
		var num = $scope.projProgress.split(" ")[0];
		if(num>=0 && num<=5 || num=='Project')
			return { color:'#d9534f' };
		else if(num==6)
			return { color:'#5cb85c' };
		else
			return { color:'#777' }
	}

	$scope.saveMemo = function(){
		$scope.editMemo = !$scope.editMemo;
		$scope.projMemo = $("#memo").val();
		console.log($scope.projMemo);
	};

	$scope.sort = function( num ){
		if(num==1){
			$scope.predicate='index';
			$scope.titleSort=!$scope.titleSort;
			$scope.titleReverse=!$scope.titleReverse;
			$scope.reverse=$scope.titleReverse;
		}		
		else if(num==2){
			$scope.predicate='from';
			$scope.fromSort=!$scope.fromSort;
			$scope.fromReverse=!$scope.fromReverse;
			$scope.reverse=$scope.fromReverse;
		}
		else if(num==3){
			$scope.predicate='to';
			$scope.toSort=!$scope.toSort;
			$scope.toReverse=!$scope.toReverse;
			$scope.reverse=$scope.toReverse;
		}
		else if(num==4){
			$scope.predicate='state';
			$scope.stateSort=!$scope.stateSort;
			$scope.stateReverse=!$scope.stateReverse;
			$scope.reverse=$scope.stateReverse;
		}
		else if(num==5){
			$scope.predicate='funding';
			$scope.fundingSort=!$scope.fundingSort;
			$scope.fundingReverse=!$scope.fundingReverse;
			$scope.reverse=$scope.fundingReverse;
		}
		else{

		}
	}

	var index = 0;
	//很簡單的eve資料物件
	function EventViewModel(title, content, from, to, state, funding) {
		var self = this;
		self.title = title;
		self.content = content;
		self.from = from;
		self.to = to;
		self.state = state;
		self.funding = funding;
		self.index = index;
		self.removeFlag = false;
		self.detailFlag = false;
		index =index+1;
	}

	function myViewModel() {
		var self = this;
		self.events = [];
		self.eventToRemove = null;

		self.markEventRemoved = function(eve) {
			eve.removeFlag = true;
			self.eventToRemove = eve;
		};

		self.removeEvent = function() {
			self.events.splice(self.events.indexOf(self.eventToRemove), 1);
		};

		self.markEventEdit = function(eve) {
			$.each(self.events, function(i, e) { e.editFlag=false; e.detailFlag=false;});
			eve.editFlag = true;
			eve.detailFlag = true;
		};

		self.saveEdit = function(eve, index){
			eve.title = $( "#title"+index ).val();
			eve.content = $( "#content"+index ).val();
			eve.from = $( "#from"+index ).val();
			eve.to = $( "#to"+index ).val();
			eve.state = $( "#state"+index ).val();
			eve.funding = $( "#funding"+index ).val();
			eve.editFlag = false;
		};

		self.markEventDetail = function(eve) {
			var originalState = eve.detailFlag;
			$.each(self.events, function(i, e) { e.editFlag=false; e.detailFlag=false; });
			eve.detailFlag = !originalState;
		};

		self.addEvent = function() {
			var eve = new EventViewModel(
				$scope.newTitle,
				$scope.newContent,
				$scope.newFrom,
				$scope.newTo,
				$scope.newState,
				$scope.newFunding);
				$scope.editFlag = false;
				$scope.newTitle = "";
				$scope.newContent = "";
				$scope.newFrom = "";
				$scope.newTo = "";
				$scope.newState = "";
				$scope.newFunding = "";
				self.events.push(eve);

				$scope.predicate='index';
				$scope.titleSort = true;
				$scope.titleReverse = true;
				$scope.reverse = true;
		};
	}

	$scope.milestoneArray = function(){
		vm = new myViewModel();
		var milestoneNum = $scope.projMilestone.length;
		vm.events.push(new EventViewModel("和尚","和尚端湯上塔，塔滑湯灑湯燙塔", "2015/7/14", "2017/8/15","Planning", 999999));
		vm.events.push(new EventViewModel("飛機與灰雞","抱著灰機上飛機，飛機起飛，灰雞要飛！", "2013/6/27", "2014/3/21","Complete",65535));
		vm.events.push(new EventViewModel("紅鯉魚與綠鯉魚與驢","紅鯉魚家有頭小綠驢叫李屢屢，綠鯉魚家有頭小紅驢叫呂里里，紅鯉魚說他家的李屢屢要比綠鯉魚家的呂里里綠，綠鯉魚說他家的呂里里要比紅鯉魚家的李屢屢紅，不只是紅鯉魚比綠鯉魚的驢綠，還是綠鯉魚比紅鯉魚的驢紅。", "2016/6/27", "2016/5/30","Done",5555));
		
		for(i=0; i<milestoneNum; i++){
			vm.events.push(new EventViewModel($scope.projMilestone[i].name, $scope.projMilestone[i].description, $scope.projMilestone[i].start_time, $scope.projMilestone[i].end_time, $scope.projMilestone[0].status, i));
		}

		$scope.model = vm;
	}

  	$(function() {
  		$( ".datepicker" ).datepicker({ dateFormat: "yy-mm-dd" });
	});

});