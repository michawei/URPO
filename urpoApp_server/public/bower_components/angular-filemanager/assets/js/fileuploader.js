(function(window, angular) {
    "use strict";
    angular.module('FileManagerApp').service('fileUploader', ['$http', 'fileManagerConfig', 'Upload', function ($http, fileManagerConfig, Upload) {

        var self = this;
        self.requesting = false; 
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
	                }).error(function (data, status, headers, config) {
	                    console.log('error status: ' + status);
	                })
	            }
		        }

/*            var form = new FormData();
            form.append('test', 'test');
            form.append('destination', '/' + path.join('/'));

            for (var i = 0; i < fileList.length; i++) {
                var fileObj = fileList.item(i);
                fileObj instanceof window.File && form.append('file-' + i, fileObj);
                console.log(fileObj);
            }

            self.requesting = true;
            return $http.post(fileManagerConfig.uploadUrl, form, {
                transformRequest: angular.identity,
                headers: {
                    "Content-Type": undefined
                }
            }).success(function(data) {
                self.inprocess = false;
            }).error(function(data) {
                self.inprocess = false;
            });*/
        };
    }]);
})(window, angular);