(function(window, angular) {
    "use strict";
    angular.module('FileManagerApp').service('fileUploader', ['$http', 'fileManagerConfig', 'Upload', function ($http, fileManagerConfig, Upload) {

        var self = this;
        self.requesting = false; 
        var dataList = [];
        self.upload = function(fileList, path) {
        	if (fileList && fileList.length) {
	            for (var i = 0; i < fileList.length; i++) {
	                var file = fileList[i];
	                Upload.upload({
	                    url: fileManagerConfig.uploadUrl,
	                    fields: {'destination': '/' + path.join('/')},
	                    file: file
	                }).progress(function (evt) {
	                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
	                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
	                }).success(function (data, status, headers, config) {
	                    console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
	                    self.inprocess = false;
	                    dataList.push(data);
	                    if(i == fileList.length - 1) {
	                    	$scope.fileNavigator.refresh();
                        $('#uploadfile').modal('hide');
                        console.log('success');
                        //return('success');
	                    }
	                }).error(function (data, status, headers, config) {
	                    console.log('error status: ' + status);
	                    self.inprocess = false;
	                });
	            }
		        }
        };
    }]);
})(window, angular);