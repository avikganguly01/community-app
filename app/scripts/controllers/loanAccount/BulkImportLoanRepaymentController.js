(function (module) {
    mifosX.controllers = _.extend(module, {
        BulkImportLoanRepaymentController: function (scope, resourceFactory, location, API_VERSION, $rootScope, Upload) {

            scope.first = {};
            scope.first.templateUrl =  API_VERSION + '/loans/repayments/downloadtemplate' + '?tenantIdentifier=' + $rootScope.tenantIdentifier
                + '&locale=' + scope.optlang.code + '&dateFormat=' + scope.df;
            scope.formData = {};
            var requestParams = {staffInSelectedOfficeOnly:true};

            resourceFactory.clientTemplateResource.get(requestParams, function (data) {
                scope.offices = data.officeOptions;
                scope.staffs = data.staffOptions;
            });

            scope.first.queryParams = '&';
            scope.changeOffice = function () {
                if(scope.formData.officeId) {
                    if(scope.first.queryParams.indexOf("officeId")==-1) {
                        scope.first.queryParams += 'officeId=' + scope.formData.officeId;
                    }else {
                        scope.first.queryParams=scope.first.queryParams.replace(/&officeId=\d+/i,"&officeId="+ scope.formData.officeId);
                    }
                } else {
                    scope.first.queryParams ='&';
                }
            };

            scope.onFileSelect = function (files) {
                scope.formData.file = files[0];
            };


            scope.upload = function () {
                Upload.upload({
                    url: $rootScope.hostUrl + API_VERSION + '/loans/repayments/uploadtemplate',
                    data: {file: scope.formData.file,locale:scope.optlang.code,dateFormat:scope.df},
                }).then(function (data) {
                    // to fix IE not refreshing the model
                    if (!scope.$$phase) {
                        scope.$apply();
                    }
                });
            };
        }
    });
    mifosX.ng.application.controller('BulkImportLoanRepaymentController', ['$scope', 'ResourceFactory', '$location', 'API_VERSION', '$rootScope', 'Upload', mifosX.controllers.BulkImportLoanRepaymentController]).run(function ($log) {
        $log.info("BulkImportLoanRepaymentController initialized");
    });
}(mifosX.controllers || {}));