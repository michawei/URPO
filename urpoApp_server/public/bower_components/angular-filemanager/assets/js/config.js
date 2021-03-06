(function(angular) {
    "use strict";
    angular.module('FileManagerApp').constant("fileManagerConfig", {
        appName: "https://github.com/joni2back/angular-filemanager",
        defaultLang: "en",

        listUrl: "/api/list",
        uploadUrl: "/api/upload",
        renameUrl: "/api/mv",
        copyUrl: "/api/cp",
        removeUrl: "/api/rm",
        editUrl: "/api/edit",
        getContentUrl: "/api/getContent",
        createFolderUrl: "/api/mkdir",
        downloadFileUrl: "/api/download",
        compressUrl: "bridges/php/handler.php",
        extractUrl: "bridges/php/handler.php",
        permissionsUrl: "bridges/php/handler.php",
        folderUrl: "",

        allowedActions: {
            rename: true,
            copy: true,
            edit: true,
            changePermissions: true,
            compress: true,
            compressChooseName: true,
            extract: true,
            download: true,
            preview: true,
            remove: true
        },

        enablePermissionsRecursive: true,

        isEditableFilePattern: '\\.(txt|html|htm|aspx|asp|ini|pl|py|md|php|css|js|log|htaccess|htpasswd|json|sql|xml|xslt|sh|rb|as|bat|cmd|coffee|php[3-6]|java|c|cbl|go|h|scala|vb)$',
        isImageFilePattern: '\\.(jpg|jpeg|gif|bmp|png|svg|tiff)$',
        isExtractableFilePattern: '\\.(zip|gz|tar|rar|gzip)$'
    });
})(angular);
