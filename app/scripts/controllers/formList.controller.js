/**
 * Created by zhangshuai on 16/4/28.
 */
'use strict';

(function () {

    var innerDetailCtrl = function ($scope, _content) {
        var _self = this;
        _self.content = _content.content;
        _self.cancel = function () {
            $scope.$hide();
        };
    };
    var itemCreateCtrl = function ($scope, $http, $cookies, toaster,$rootScope) {
        var _self = this;
        /**
         * @description 配置富文本编辑框
         * @type {{plugins: string, menubar: boolean, theme: string, statusbar: boolean, toolbar: string, advlist_bullet_styles: string, advlist_number_styles: string}}
         */
        _self.tinymceOptions = {
            plugins: 'table,image,advlist,link,textcolor,colorpicker,preview,lists,code',
            menubar: true,
            theme: 'modern',
            height: 500,
            statusbar: false,
            trusted: true,
            toolbar: 'undo redo | styleselect | bold italic forecolor backcolor | alignleft aligncenter alignright' +
            ' alignjustify | bullist numlist outdent indent  | link table | preview code',
            advlist_bullet_styles: 'default,circle,disc,square',
            advlist_number_styles: 'default,lower-alpha,lower-greek,lower-roman,upper-alpha,upper-roman'
        };
        _self.submit = function () {
            var itemData = {
                "name": _self.name,
                "tenant": $cookies.get("tenantId"),
                "content": _self.tinymceModel
            };
            console.log(itemData);
            $http.post('/rest/item', itemData).success(function (res) {
                toaster.success('新建成功', '成功');
                $scope.$hide();
                $rootScope.$broadcast('initData');
            }).error(function (res) {
                console.log(res);
            });
        };
        _self.cancel = function () {
            $scope.$hide();
        };
    };
    var itemEditCtrl = function ($scope, data, $cookies, $http, toaster,$rootScope) {
        var _self = this;
        _self.tinymceOptions = {
            plugins: 'table,image,advlist,link,textcolor,colorpicker,preview,lists,code',
            menubar: true,
            theme: 'modern',
            height: 500,
            statusbar: false,
            trusted: true,
            toolbar: 'undo redo | styleselect | bold italic forecolor backcolor | alignleft aligncenter alignright' +
            ' alignjustify | bullist numlist outdent indent  | link table | preview code',
            advlist_bullet_styles: 'default,circle,disc,square',
            advlist_number_styles: 'default,lower-alpha,lower-greek,lower-roman,upper-alpha,upper-roman'
        };
        _self.id = data.data.id;
        _self.tinymceModel = data.data.content;
        _self.name = data.data.name;
        _self.submit = function () {
            var udateData = {
                "id": _self.id,
                "tenant": $cookies.get("tenantId"),
                "name": _self.name,
                "content": _self.tinymceModel
            }
            $http.put('/rest/item', udateData).success(function (res) {
                toaster.success('更新成功', '成功');
                $scope.$hide();
                $rootScope.$broadcast('initData');
            }).error(function (res) {
                console.log(res);
            });
        };
        _self.cancel = function () {
            $scope.$hide();
        };


    };
    var keyWordCtrl = function ($scope, $http, $cookies, toaster,$rootScope) {
        var _self = this;
        _self.name = $scope.name;
        _self.submit = function () {
            var keyWordData = {
                "name": _self.name,
                "tenant": $cookies.get("tenantId")
            };
            console.log(keyWordData);

            $http.post('/rest/keyWord', keyWordData).success(function (res) {
                toaster.success('新建成功', '成功');
                $scope.$hide();
                $rootScope.$broadcast('initData');
            }).error(function (res) {
                console.log(res);
            });
        };
        _self.cancel = function () {
            $scope.$hide();
        };
    };
    var editKeyWordCtrl = function ($scope, data, $cookies, $http, toaster,$rootScope) {
        var _self = this;
        console.log(data);
        _self.id = data.data.id;
        _self.name = data.data.name;
        _self.submit = function () {
            var keyWordData = {
                "id": _self.id,
                "name": _self.name,
                "tenant": $cookies.get("tenantId")
            };
            console.log(keyWordData);

            $http.put('/rest/keyWord', keyWordData).success(function (res) {
                toaster.success('更新成功', '成功');
                $scope.$hide();
                $rootScope.$broadcast('initData');
            }).error(function (res) {
                console.log(res);
            });
        };
        _self.cancel = function () {
            $scope.$hide();
        };
    }
    var createTempletCtrl = function ($scope, $http, $cookies, toaster,$rootScope) {
        var _self = this;
        /**
         * @description 配置富文本编辑框
         * @type {{plugins: string, menubar: boolean, theme: string, statusbar: boolean, toolbar: string, advlist_bullet_styles: string, advlist_number_styles: string}}
         */
        _self.tinymceOptions = {
            plugins: 'table,image,advlist,link,textcolor,colorpicker,preview,lists,code',
            menubar: true,
            theme: 'modern',
            height: 400,
            statusbar: false,
            trusted: true,
            toolbar: 'undo redo | styleselect | bold italic forecolor backcolor | alignleft aligncenter alignright' +
            ' alignjustify | bullist numlist outdent indent  | link table | preview code',
            advlist_bullet_styles: 'default,circle,disc,square',
            advlist_number_styles: 'default,lower-alpha,lower-greek,lower-roman,upper-alpha,upper-roman'
        };
        _self.submit = function () {
            var templetData = {
                "name": _self.name,
                "userId": $cookies.get("userId"),
                "content": _self.tinymceModel,
                "type": _self.type,
                "userName": $cookies.get("realname")
            };
            $http.post('/rest/templet', templetData).success(function (res) {
                toaster.success('新建成功', '成功');
                $scope.$hide();
                $rootScope.$broadcast('initData');
            }).error(function (res) {
                console.log(res);
            });
        };
        _self.cancel = function () {
            $scope.$hide();
        };
    }
    var editTempletCtrl = function ($scope, data, $cookies, $http, toaster,$rootScope) {
        var _self = this;

        _self.typeList = [{
            type: 0,
            name: '个人模板'
        }, {
            type: 1,
            name: '共享模板'
        }, {
            type: 2,
            name: '专家模板'
        }];

        /**
         * @description 配置富文本编辑框
         * @type {{plugins: string, menubar: boolean, theme: string, statusbar: boolean, toolbar: string, advlist_bullet_styles: string, advlist_number_styles: string}}
         */
        _self.tinymceOptions = {
            plugins: 'table,image,advlist,link,textcolor,colorpicker,preview,lists,code',
            menubar: true,
            theme: 'modern',
            height: 500,
            statusbar: false,
            trusted: true,
            toolbar: 'undo redo | styleselect | bold italic forecolor backcolor | alignleft aligncenter alignright' +
            ' alignjustify | bullist numlist outdent indent  | link table | preview code',
            advlist_bullet_styles: 'default,circle,disc,square',
            advlist_number_styles: 'default,lower-alpha,lower-greek,lower-roman,upper-alpha,upper-roman'
        };
        _self.id = data.data.id;
        _self.name = data.data.name;
        _self.type = data.data.type;
        _self.tinymceModel = data.data.content;
        _self.submit = function () {
            console.log(_self.tinymceModel);
            var templetData = {
                "id": _self.id,
                "name": _self.name,
                "userId": $cookies.get("userId"),
                "content": _self.tinymceModel,
                "type": _self.type,
                "userName": $cookies.get("realname")
            }
            $http.put('/rest/templet', templetData).success(function (res) {
                toaster.success('更新成功', '成功');
                $scope.$hide();
                $rootScope.$broadcast('initData');
            }).error(function (res) {
                console.log(res);
            });
        };
        _self.cancel = function () {
            $scope.$hide();
        }
    }
    var createContractCtrl = function ($scope, mainService, $http, $cookies, toaster,$rootScope) {
        var _self = this;
        /**
         * @description 配置富文本编辑框
         * @type {{plugins: string, menubar: boolean, theme: string, statusbar: boolean, toolbar: string, advlist_bullet_styles: string, advlist_number_styles: string}}
         */
        _self.tinymceOptions = {
            plugins: 'table,image,advlist,link,textcolor,colorpicker,preview,lists,code',
            menubar: true,
            theme: 'modern',
            height: 300,
            statusbar: false,
            trusted: true,
            advlist_bullet_styles: 'default,circle,disc,square',
            advlist_number_styles: 'default,lower-alpha,lower-greek,lower-roman,upper-alpha,upper-roman'
        };
        var dataOfCompany = {};
        var templet = {};
        var keyIds = {};
        _self.mapData = {};
        _self.thisUserId = $cookies.get('userId');
        _self.thisTenantId = $cookies.get('tenantId');
        _self.tinymceModel = $scope.content;
        _self.party_aName = '';
        $http.get("/rest/company/byId?id=" + _self.thisTenantId).success(function (res) {
            _self.party_aName = res.value.name;
        });
        mainService.getMenuData(8, 10, _self.thisUserId, _self.thisTenantId).success(function (res) {

            _self.dataOfCompany = res.value.datas;
        });
        mainService.getMenuData(1, 4, _self.thisUserId, _self.thisTenantId).success(function (res) {

            _self.templet = res.value.datas;
        });
        mainService.getMenuData(1, 3, _self.thisUserId, _self.thisTenantId).success(function (res) {
            _self.mapData.mappingLists = [];
            _.each(res.value.datas, function (n) {
                _self.mapData.mappingLists.push({
                    id: n.id,
                    fullname: n.name
                });
            });
        });
        _self.change = function (content) {
            _self.tinymceModel = content;
        };
        _self.submit = function () {
            var contractData = {
                "name": _self.name,
                "party_a": _self.thisTenantId,
                "party_b": _self.party_b,
                "effectiveTime": new Date(_self.effectiveTime).getTime(),
                "expirationTime": new Date(_self.expirationTime).getTime(),
                "situate": 1,
                "keyIDs": _self.keyIDs,
                "content": _self.tinymceModel
            };
            console.log(_self.effectiveTime);
            $http.post('/rest/contract', contractData).success(function (res) {
                toaster.success('新建成功', '成功');
                $scope.$hide();
                $rootScope.$broadcast('initData');
            }).error(function (res) {
                console.log(res);
            });
        }
        _self.cancel = function () {
            $scope.$hide();
        }

    };
    var editProductCtrl = function ($scope, data, $cookies, $http, toaster,$rootScope) {
        var _self = this;
        console.log(data);
        _self.id = data.data.id;
        _self.name = data.data.name;
        _self.describle = data.data.desc;
        _self.leader = data.data.leader;
        _self.submit = function () {
            var productData = {
                "id": _self.id,
                "name": _self.name,
                "tenant": $cookies.get("tenantId"),
                "desc": _self.describle,
                "leader": _self.leader
            };
            $http.put('/rest/product', productData).success(function (res) {
                toaster.success('更新成功', '成功');
                $scope.$hide();
                $rootScope.$broadcast('initData');
            }).error(function (res) {
                console.log(res);
            });
        };
        _self.cancel = function () {
            $scope.$hide();
        }
    }
    var createProductCtrl = function ($scope, $http, $cookies, toaster,$rootScope) {
        var _self = this;

        _self.submit = function () {
            var productData = {
                "name": _self.name,
                "tenant": $cookies.get('tenantId'),
                "desc": _self.desc,
                "leader": _self.leader
            }
            $http.post('/rest/product', productData).success(function (res) {
                toaster.success('新建成功', '成功');
                $scope.$hide();
                $rootScope.$broadcast('initData');
            }).error(function (res) {
                console.log(res);
            });
        }
        _self.cencel = function () {
            $scope.$hide();
        }

    };
    var editContractCtrl = function ($scope, mainService, data, $http, $cookies, toaster,$rootScope) {
        var _self = this;
        console.log(data);
        _self.tinymceOptions = {
            plugins: 'table,image,advlist,link,textcolor,colorpicker,preview,lists,code',
            menubar: true,
            theme: 'modern',
            height: 400,
            statusbar: false,
            trusted: true,
            toolbar: 'undo redo | styleselect | bold italic forecolor backcolor | alignleft aligncenter alignright' +
            ' alignjustify | bullist numlist outdent indent  | link table | preview code',
            advlist_bullet_styles: 'default,circle,disc,square',
            advlist_number_styles: 'default,lower-alpha,lower-greek,lower-roman,upper-alpha,upper-roman'
        };
        _self.thisUserId = $cookies.get('userId');
        _self.thisTenantId = $cookies.get('tenantId');
        _self.tinymceModel = data.data.content;
        _self.party_b = data.data.party_b;
        var dataOfCompany = {};
        var templets = {};
        _self.mapData = {};
        _self.id = data.data.id;
        _self.name = data.data.name;
        _self.keyIDs = data.data.keyWords.split(',');
        _self.effectiveTime = new Date(data.data.effectiveTime);
        _self.expirationTime = new Date(data.data.expirationTime);
        _self.templetId = data.data.templetId;
        _self.templetMapData = {};
        console.log(_self.templetId);
        $http.get("/rest/company/byId?id=" + _self.thisTenantId).success(function (res) {
            _self.party_aName = res.value.name;
        });
        mainService.getMenuData(8, 10, _self.thisUserId, _self.thisTenantId).success(function (res) {

            _self.dataOfCompany = res.value.datas;
        });
        mainService.getMenuData(1, 4, _self.thisUserId, _self.thisTenantId).success(function (res) {
            _self.templets = res.value.datas;
            _.each(res.value.datas, function (n) {
                _self.templetMapData[n.id] = n.content;
            });
        });
        mainService.getMenuData(1, 3, _self.thisUserId, _self.thisTenantId).success(function (res) {
            _self.mapData.mappingLists = [];
            _.each(res.value.datas, function (n) {
                _self.mapData.mappingLists.push({
                    id: n.id,
                    fullname: n.name
                });
            });
        });
        _self.submit = function () {
            var contractData = {
                "id": _self.id,
                "name": _self.name,
                "party_a": _self.thisTenantId,
                "party_b": _self.party_b,
                "templetId": _self.templetId,
                "effectiveTime": new Date(_self.effectiveTime).getTime(),
                "expirationTime": new Date(_self.expirationTime).getTime(),
                "situate": 1,
                "keyIDs": _self.keyIDs,
                "content": _self.tinymceModel
            };
            console.log(_self.effectiveTime);
            $http.put('/rest/contract', contractData).success(function (res) {
                toaster.success('更新成功', '成功');
                $scope.$hide();
                $rootScope.$broadcast('initData');
            }).error(function (res) {
                console.log(res);
            });
        }
        _self.change = function (templetId) {
            console.log(templetId);
            _self.tinymceModel = _self.templetMapData[templetId];
        };
        _self.cancel = function () {
            $scope.$hide();
        }
    };
    var checkContractCtrl = function ($scope, data, $cookies, $http, toaster,$rootScope) {
        var _self = this;
        _self.typeMapData = [{
            type: 1,
            name: '未审核'
        }, {
            type: 2,
            name: '已通过'
        }, {
            type: 3,
            name: '驳回'
        }];
        console.log(data);
        _self.id = data.data.id;
        _self.name = data.data.name;
        _self.party_a = data.data.party_a;
        _self.party_b = data.data.party_b;
        _self.keyIDs = data.data.keyWords.split(',');
        _self.effectiveTime = new Date(data.data.effectiveTime);
        _self.expirationTime = new Date(data.data.expirationTime);
        _self.templetId = data.data.templetId;
        _self.content = data.data.content;
        _self.situate = data.data.situate;
        _self.submit = function () {
            var contractData = {
                "id": _self.id,
                "name": _self.name,
                "party_a": _self.party_a,
                "party_b": _self.party_b,
                "templetId": _self.templetId,
                "effectiveTime": new Date(_self.effectiveTime).getTime(),
                "expirationTime": new Date(_self.expirationTime).getTime(),
                "situate": _self.situate,
                "keyIDs": _self.keyIDs,
                "content": _self.content
            };
            console.log(contractData);
            $http.put('/rest/contract', contractData).success(function (res) {
                toaster.success('审核成功', '成功');
                $scope.$hide();
                $rootScope.$broadcast('initData');
            }).error(function (res) {
                console.log(res);
            });
        }
        _self.cancel = function () {
            $scope.$hide();
        }
    };
    var editSignFormCtrl = function ($scope, data, $cookies, $http, toaster, commonService,$rootScope) {
        var _self = this;
        _self.id = data.data.id;
        _self.tenant = $cookies.get('tenantId');
        _self.party_a = data.data.party_a;
        _self.party_b = data.data.party_b;
        _self.contractId = data.data.contractId;
        _self.party_a_opinion = data.data.party_a_opinion;
        _self.party_b_opinion = data.data.party_b_opinion;

        _self.init = function () {
            commonService.getCompanyCache().then(function (res) {
                console.log(res);
                _self.companyMap = res;
                console.log(_self.companyMap);
                _self.party_aName = _self.companyMap[_self.party_a];
                _self.party_bName = _self.companyMap[_self.party_b];
            });

        };
        _self.init();
        _self.submit = function () {
            var signFormData = {
                "id": _self.id,
                "party_a": _self.party_a,
                "party_b": _self.party_b,
                "contractId": _self.contractId,
                "party_a_opinion": _self.party_a_opinion,
                "party_b_opinion": _self.party_b_opinion
            };
            $http.put('/rest/signForm', signFormData).success(function (res) {
                toaster.success('更新成功', '成功');
                $scope.$hide();
                $rootScope.$broadcast('initData');
            }).error(function (res) {
                console.log(res);
            });
        };
        _self.cancel = function () {
            $scope.$hide();
        }

    };
    var createUserCtrl = function ($scope, $http, $cookies, toaster,$rootScope) {
        var _self = this;
        _self.error = {};
        _self.checkData = {};
        _self.checkAll = function () {
            if (_self.password) {
                if (_self.tPassword) {
                    if (_self.password == _self.tPassword) {
                    }
                    else {
                        _self.checkData.checkTPasswordResult = 'false';
                        _self.error.tPassword = '两次密码输入不一致';
                    }
                }
                else {
                    _self.checkData.checkTPasswordResult = 'false';
                    _self.error.tPassword = '第二次输入密码不能为空';
                }
            }
            else {
                _self.checkData.checkPasswordResult = 'false';
                _self.error.password = '密码输入不能为空';
            }
        };
        _self.submit = function () {
            _self.error = {};
            _self.checkAll();
            var userData = {
                "username": _self.username,
                "password": _self.password,
                //"tenant":$cookies.get('tenantId'),
                "role": 'ROLE_USER',
                "mobile": _self.mobile,
                "name": _self.name
            };
            console.log(userData);
            if ((_self.checkData.checkTPasswordResult != 'false' && _self.checkData.checkPasswordResult != 'false')) {
                $http.post('/rest/user', userData).then(function (res) {
                    if (res.status == 403) {
                        toaster.warning('无权操作', '警告');
                    }
                    else if (res.status == 200) {
                        toaster.success('新建成功', '成功');
                        $scope.$hide();
                        $rootScope.$broadcast('initData');
                    }
                });
            }
        };
        _self.cancel = function () {
            $scope.$hide();
        }
    };
    var editUserCtrl = function ($scope, data, $cookies, $http, toaster, rigistService,$rootScope) {
        var _self = this;
        _self.error = {};
        _self.checkData = {};
        _self.id = data.data.id;
        _self.username = data.data.username;
        _self.role = data.data.role;
        _self.name = data.data.name;
        _self.mobile = data.data.mobile;
        _self.checkAll = function () {
            if (_self.password) {
                if (_self.tPassword) {
                    if (_self.password == _self.tPassword) {
                    }
                    else {
                        _self.checkData.checkTPasswordResult = 'false';
                        _self.error.tPassword = '两次密码输入不一致';
                    }
                }
                else {
                    _self.checkData.checkTPasswordResult = 'false';
                    _self.error.tPassword = '第二次输入密码不能为空';
                }
            }
            else {
                _self.checkData.checkPasswordResult = 'false';
                _self.error.password = '密码输入不能为空';
            }
        };
        _self.submit = function () {
            _self.error = {};
            _self.checkAll();
            var userData = {
                "id": _self.id,
                "username": _self.username,
                "password": _self.password,
                //"tenant":$cookies.get('tenantId'),
                "role": _self.role,
                "mobile": _self.mobile,
                "name": _self.name
            };
            if ((_self.checkData.checkTPasswordResult != 'false' && _self.checkData.checkPasswordResult != 'false')) {
                $http.put('/rest/user/admin', userData).then(function (res) {
                    if (res && res.status == 200) {
                        toaster.success('修改成功', '成功');
                        $rootScope.$broadcast('initData');
                        if (_self.id == $cookies.get('userId')) {
                            rigistService.logout();
                        }
                        $scope.$hide();
                    }
                });
            }
        };
        _self.cancel = function () {
            $scope.$hide();
        }
    };
    var editCompanyCtrl = function($scope, data, $cookies, $http, toaster,$rootScope){
        var _self = this;
        _self.id = data.data.id;
        _self.name = data.data.name;
        _self.address = data.data.address;
        _self.contact = data.data.contact;
        _self.describle = data.data.describle;
        _self.size = data.data.size;
        _self.submit = function(){
            if($cookies.get('role_pyq')=='ROLE_ADMIN'){
                var companyData = {
                    "id": _self.id,
                    "name": _self.name,
                    "address": _self.address,
                    "contact":_self.contact,
                    "describle":_self.describle,
                    "size":_self.size
                }
                $http.put('/rest/company', companyData).then(function (res) {
                    console.log(res);
                     if (res.status == 200) {
                        toaster.success('编辑成功', '成功');
                        $scope.$hide();
                         $rootScope.$broadcast('initData');
                    }else if(res.status == 201){
                         toaster.warning('公司名已经存在！', '失败');
                     }
                });
            }else {
                toaster.warning('无权限操作', '失败');
            }


        };
        _self.cancel = function(){
            $scope.$hide();
        };

    };
    var createGroupCtrl = function($scope, $http, $cookies, toaster,$rootScope){
        var _self = this;
        _self.tenant = $cookies.get('tenantId');
        _self.submit = function(){
            var GroupData = {
                "tenant":_self.tenant,
                "name":_self.name
            }
            $http.post('/rest/group', GroupData).success(function (res) {
                toaster.success('新建成功', '成功');
                $scope.$hide();
                $rootScope.$broadcast('initData');
            }).error(function (res) {
                console.log(res);
            });
        }
        _self.cancel = function(){
            $scope.$hide();
        }
    };
    var editGroupCtrl = function($scope, data, $cookies, $http, toaster,$rootScope){
        var _self = this;
        _self.name  = data.data.name;
        _self.id = data.data.id;
        _self.tenant = data.data.tenant;
        _self.submit = function(){
            if(!(data.data.name == '管理组'))
            {
                var groupData = {
                    "id":_self.id,
                    "tenant":_self.tenant,
                    "name":_self.name
                };
                $http.put('/rest/group',groupData).success(function(res){
                    toaster.success('编辑成功', '成功');
                    $scope.$hide();
                    $rootScope.$broadcast('initData');
                }).error(function(res){
                    toaster.warning('编辑失败', '失败');
                    console.log('编辑失败', '失败');
                });
            }else{
                toaster.warning('管理组不能修改！', '提示');
                $scope.$hide();
            }

        };
        _self.cancel = function(){
            $scope.$hide();
        }
    }
    var editRoleCtrl = function($scope,data,$cookies,$http,toaster,$rootScope){
        var _self = this;
        _self.userId = $cookies.get('userId');
        _self.roleList = [];
        _self.init = function(){
            $http.get('/rest/role/getRoles/?userId='+_self.userId).success(function(res){
                _self.roleList = res.value;
                $http.get('/rest/role/?group_id='+data.groupId).success(function(res){
                    if(res.code == 200) {
                        _self.menusChecked = [];
                        angular.forEach(res.value,function(n){

                            _self.menusChecked.push(n);
                        });
                        angular.forEach(_self.menusChecked,function(menuId){
                            angular.forEach(_self.roleList,function(role){
                                if(role.id == menuId) {
                                    role.isChecked = true;
                                    role.isOpen = true;
                                }
                                if(role.children && role.children.length>0) {
                                    angular.forEach(role.children,function(role_c){
                                        if(role_c.id == menuId) {
                                            role_c.isChecked = true;
                                        }
                                    });
                                }
                            });
                        });
                        console.log(_self.roleList );
                    }
                }).error(function(res){
                    console.log(res);
                });

            }).error(function(res){

            });
        };
        _self.init();
        _self.groupId = data.groupId;
        _self.changeParents = function(role){
            if(role.isChecked){
                angular.forEach(role.children,function(n){
                    n.isChecked = true;
                });
            }
            else{
                angular.forEach(role.children,function(n){
                    n.isChecked = false;
                });
            }
        },
            _self.changechilds = function(role){
                var i = 0;
                angular.forEach(role.children,function(n){
                    if(n.isChecked)
                    {
                        i = i + 1;
                    }
               });
                if(i>0){
                    role.isChecked = true;
                }
                else{
                    role.isChecked = false;
                }

            };
        _self.submit = function(){
            _self.checked = [];
            angular.forEach(_self.roleList,function(parent){
                if(parent.isChecked)
                {
                    _self.checked.push(parent.id);
                }
                if(parent.children && parent.children.length>0)
                {
                    angular.forEach(parent.children,function(children){
                        if(children.isChecked)
                        {
                            _self.checked.push(children.id);
                        }
                    });
                }
            });
            var roleData = {
                "tenantId":$cookies.get('tenantId'),
                "groupId":_self.groupId,
                "roles":_self.checked
            };
            $http.post('/rest/role',roleData).success(function(res){
                if(res.code == 200)
                {
                    toaster.success("权限分配成功","成功");
                    $scope.$hide();
                    $rootScope.$broadcast('initData');
                }
                else{
                    toaster.warning("权限分配失败","失败");
                }
            }).error(function(res){
                toaster.warning("权限分配失败","失败");
            });
        }
        _self.cancel = function(){
            $scope.$hide();
        }
    };
    var editRoleUserCtrl = function($scope,groupData,$cookies,$http,toaster,$rootScope){
        var data = $scope.data = {};
        //拉取User
        $http.get('/rest/user/list').then(function(res){
            if(res.status == 200){
                var userList = [];
                if(res.data.value && res.data.value.length > 0){
                    angular.forEach(res.data.value,function(a){
                        userList.push({
                           userId: a.id,
                           name: a.name
                        });
                    });
                    $scope.allUser = userList;

                    //通过组ID拉去组下面的user
                    $http.get('/rest/user/list/group?groupId='+ groupData.groupId).then(function (result) {
                        console.log(result);
                        if(result.status == 200){
                            if (result.data.value && result.data.value.length > 0) {
                                var users = [];
                                    angular.forEach(result.data.value,function(a){
                                        users.push({
                                            userId: a.id,
                                            name: a.name
                                        });
                                    });
                                data.users = users;
                            }
                            else {
                                data.users = [];
                            }
                            var allUser = [];
                            angular.forEach($scope.allUser, function (item) {
                                var hasIn = false;
                                angular.forEach(data.users, function (n) {
                                    if (n.userId == item.userId) {
                                        hasIn = true;
                                    }
                                });
                                if (!hasIn) {
                                    allUser.push(item);
                                }
                            });
                            $scope.allUser = angular.copy(allUser);
                        }

                    });
                }
            }

        });

        $scope.groupRigthPush = function () {
            var allUser = [];
            var pushUser = [];
            angular.forEach($scope.allUser, function (n) {
                if (n.isSelected) {
                    pushUser.push(n)
                }
                else {
                    allUser.push(n);
                }
            });
            data.users = pushUser.concat(data.users);
            $scope.allUser = angular.copy(allUser);
            $scope.allIsAllcheck();
            $scope.thisIsAllcheck();
        };

        $scope.groupLeftPush = function () {
            var pushUser = [];
            var groupUser = [];
            angular.forEach(data.users, function (n) {
                if (n.isSelected) {
                    pushUser.push(n);
                }
                else {
                    groupUser.push(n);
                }
            });
            data.users = groupUser;
            $scope.allUser = pushUser.concat($scope.allUser);
            $scope.allIsAllcheck();
            $scope.thisIsAllcheck();
        }

        $scope.allIsAllcheck = function () {
            var hasAllCheck = true;
            var allAllcheckedList = [];
            angular.forEach($scope.allUser, function (n) {
                if (!n.isSelected) {
                    hasAllCheck = false;
                }
                else {
                    allAllcheckedList.push(n);
                }
            });
            data.allAllcheckedList = allAllcheckedList;
            data.allAllSelected = hasAllCheck;
        }

        $scope.thisIsAllcheck = function () {
            var hasThisAllcheck = true;
            var thisAllcheckedList = [];
            angular.forEach(data.users, function (n) {
                if (!n.isSelected) {
                    hasThisAllcheck = false;
                }
                else {
                    thisAllcheckedList.push(n);
                }
            });
            data.thisAllcheckedList = thisAllcheckedList;
            data.thisAllSelected = hasThisAllcheck;
        }


        $scope.allAllCheck = function () {
            var allAllcheckedList = []
            angular.forEach($scope.allUser, function (item) {
                if (data.allAllSelected) {
                    item.isSelected = true;
                    allAllcheckedList.push(item);
                }
                else {
                    item.isSelected = false;
                }
            });
            data.allAllcheckedList = allAllcheckedList;
        };

        $scope.saveGroup = function () {

            var userIds = [];
            angular.forEach(data.users, function (n) {
                userIds.push(n.userId);
            });

            //保存的接口
            $http.put('/rest/role/user',{
                groupId: groupData.groupId,
                tenantId:$cookies.get('tenantId'),
                userIds: userIds
            }).success(function (result) {
                if(result.code == 200){
                    $scope.$hide();
                    $rootScope.$broadcast('initData');
                    toaster.success('修改成功');

                }
            });

        }

    };
    var formListCtrl = function ($scope,$state, mainService, $cookies, $filter, $modal, $http, toaster, commonService) {
        var _self = this;
        _self.thisListId = $state.params.listId;
        _self.thisItemId = $state.params.itemId;
        _self.thisUserId = $cookies.get('userId');
        _self.thisTenantId = $cookies.get('tenantId');

        _self.getKeyName = function (str, data) {
            var strRes = '';
            if (str) {
                var charList = str.split(',');
                _.each(charList, function (n, i) {
                    if (_self.keyMap[n]) {
                        if (i == charList.length - 1) {
                            strRes += _self.keyMap[n];
                        }
                        else {
                            strRes += _self.keyMap[n] + ',';
                        }
                    }
                });
            }
            return strRes;
        };

        _self.init = function () {
            mainService.getMenuData(1, 3, _self.thisUserId, _self.thisTenantId).success(function (res) {
                _self.keyMap = {};
                _.each(res.value.datas, function (n) {
                    _self.keyMap[n.id] = n.name;
                });
                mainService.getMenuData(_self.thisListId, _self.thisItemId, _self.thisUserId, _self.thisTenantId).success(function (res) {
                    _self.tableTheadList = res.value.tableFieldsMap;
                    var arr = [];
                    _self.tabledataList = res.value.datas;
                    angular.forEach(_self.tableTheadList, function (data, index, array) {
                        arr.push(index);
                    });
                    _self.tableTheadPropertis = arr;
                });
            });
            commonService.getCompanyCache().then(function (res) {
                _self.companyMap = res;
            });
        };
        _self.init();

        $scope.$on('initData',function(){
           _self.init();
        });

        _self.delete = function (itemId, data) {
            console.log(data);
            if (confirm('是否删除')) {
                switch (itemId) {
                    case '2':
                    {
                        $http.delete('/rest/item/?id=' + data.id).success(function (res) {
                            toaster.success('删除成功', '成功');
                            _self.init();
                        }).error(function (res) {
                            console.log(res);
                        });
                        break;
                    }
                        ;

                    case '3':
                    {
                        $http.delete('/rest/keyWord/?id=' + data.id).success(function (res) {
                            toaster.success('删除成功', '成功');
                            _self.init();
                        }).error(function (res) {
                            console.log(res);
                        });
                        break;
                    }

                    case '4':
                    {
                        if (data.userId == $cookies.get('userId')) {
                            $http.delete('/rest/templet/?id=' + data.id).success(function (res) {
                                toaster.success('删除成功', '成功');
                                _self.init();
                            }).error(function (res) {
                                console.log(res);
                            });
                        } else {
                            toaster.warning("无法删除他人共享模板！");
                        }
                        break;
                    }
                    case '5':
                    {
                        if (data.situate == 1 || data.situate == 3) {
                            $http.delete('/rest/contract/?id=' + data.id).success(function (res) {
                                toaster.success('删除成功', '成功');
                                _self.init();
                            }).error(function (res) {
                                console.log(res);
                            });
                        } else {
                            toaster.warning("无权限删除，已审核合同！");
                        }
                        break;
                    }
                    case '9':
                    {
                        $http.delete('/rest/product/?id=' + data.id).success(function (res) {
                            toaster.success('删除成功', '成功');
                            _self.init();
                        }).error(function (res) {
                            console.log(res);
                        });
                        break;
                    }
                    case '11':
                    {
                        if(data.type != 1) {
                            $http.delete('/rest/templet/?id=' + data.id).success(function (res) {
                                toaster.success('删除成功', '成功');
                                _self.init();
                            }).error(function (res) {
                                console.log(res);
                            });
                        }else{
                            toaster.warning("无法删除他人共享模板！");
                        }
                        break;
                    }
                    case '12':
                    {
                        $http.delete('/rest/keyWord/?id=' + data.id).success(function (res) {
                            toaster.success('删除成功', '成功');
                            _self.init();
                        }).error(function (res) {
                            console.log(res);
                        });
                        break;
                    }
                    case '13':
                    {
                        $http.delete('/rest/item/?id=' + data.id).success(function (res) {
                            toaster.success('删除成功', '成功');
                            _self.init();
                        }).error(function (res) {
                            console.log(res);
                        });
                        break;
                    }
                        ;
                    case '15':
                    {
                        $http.delete('/rest/user/?id=' + data.id).success(function (res) {
                            toaster.success('删除成功', '成功');
                            _self.init();
                        }).error(function (res) {
                            console.log(res);
                        });
                        break;
                    }
                    case '17':
                    {
                        if(!(data.name ==  '管理组'))
                        {
                            $http.delete('/rest/group/?id=' + data.id).success(function (res) {
                                toaster.success('删除成功', '成功');
                                _self.init();
                            }).error(function (res) {
                                console.log(res);
                            });
                        }else
                        {
                            toaster.warning('无权限删除管理组！！', '提示');
                        }


                        break;
                    }
                }
            }
        };
        _self.edit = function (itemID, data) {
            var modalConfig = null;
            switch (itemID) {
                case '2':
                {
                    modalConfig = {
                        templateUrl: '../../views/modal/editItem.html',
                        controller: 'itemEditCtrl',
                        controllerAs: 'itemEdit',
                        resolve: {
                            data: function () {
                                return {
                                    data: data
                                }
                            }
                        }
                    };
                    break;
                }
                    ;

                case '3':
                {
                    modalConfig = {
                        templateUrl: '../../views/modal/editKeyWord.html',
                        controller: 'editKeyWordCtrl',
                        controllerAs: 'editKeyWord',
                        resolve: {
                            data: function () {
                                return {
                                    data: data
                                }
                            }
                        }
                    };
                    break;
                }
                    ;
                case '4':
                {
                    if (data.userId == $cookies.get('userId')) {
                        modalConfig = {
                            templateUrl: '../../views/modal/editTemplet.html',
                            controller: 'editTempletCtrl',
                            controllerAs: 'editTemplet',
                            resolve: {
                                data: function () {
                                    return {
                                        data: data
                                    }
                                }
                            }
                        };
                    }
                    else {
                        toaster.warning("无法编辑他人共享模板！");
                    }
                    break;
                }
                    ;
                case '5':
                {
                    if (data.situate != 2) {
                        modalConfig = {
                            templateUrl: '../../views/modal/editContract.html',
                            controller: 'editContractCtrl',
                            controllerAs: 'editContract',
                            resolve: {
                                data: function () {
                                    return {
                                        data: data
                                    }
                                }
                            }
                        };
                    } else {
                        toaster.warning("无权限编辑，已审核通过合同！");
                    }
                    break;
                }
                    ;
                case '6':
                {
                    if (data.situate == 1 || data.situate == 3) {
                        modalConfig = {
                            templateUrl: '../../views/modal/checkContract.html',
                            controller: 'checkContractCtrl',
                            controllerAs: 'checkContract',
                            resolve: {
                                data: function () {
                                    return {
                                        data: data
                                    }
                                }
                            }
                        };
                    } else {
                        toaster.warning("该合同已通过审核！");
                    }
                    break;
                }
                    ;
                case '7':
                {
                    modalConfig = {
                        templateUrl: '../../views/modal/editSignForm.html',
                        controller: 'editSignFormCtrl',
                        controllerAs: 'editSignForm',
                        resolve: {
                            data: function () {
                                return {
                                    data: data
                                }
                            }
                        }
                    };

                    break;
                }
                    ;
                case '9':
                {
                    modalConfig = {
                        templateUrl: '../../views/modal/editProduct.html',
                        controller: 'editProductCtrl',
                        controllerAs: 'editProduct',
                        resolve: {
                            data: function () {
                                return {
                                    data: data
                                }
                            }
                        }
                    };
                    break;
                }
                    ;
                case '11':
                {
                    if (data.type != 1) {
                    modalConfig = {
                        templateUrl: '../../views/modal/editTemplet.html',
                        controller: 'editTempletCtrl',
                        controllerAs: 'editTemplet',
                        resolve: {
                            data: function () {
                                return {
                                    data: data
                                }
                            }
                        }
                    };
                    }else{
                        toaster.warning("无法编辑他人共享模板！");
                    }
                    break;
                }
                case '12':
                {
                    modalConfig = {
                        templateUrl: '../../views/modal/editKeyWord.html',
                        controller: 'editKeyWordCtrl',
                        controllerAs: 'editKeyWord',
                        resolve: {
                            data: function () {
                                return {
                                    data: data
                                }
                            }
                        }
                    };
                    break;
                }
                case '13':
                {
                    modalConfig = {
                        templateUrl: '../../views/modal/editItem.html',
                        controller: 'itemEditCtrl',
                        controllerAs: 'itemEdit',
                        resolve: {
                            data: function () {
                                return {
                                    data: data
                                }
                            }
                        }
                    };
                    break;
                }
                    ;
                case '15':
                {
                    modalConfig = {
                        templateUrl: '../../views/modal/editUser.html',
                        controller: 'editUserCtrl',
                        controllerAs: 'editUser',
                        resolve: {
                            data: function () {
                                return {
                                    data: data
                                }
                            }
                        }
                    };
                    break;
                }
                case '16':
                {
                    modalConfig = {
                        templateUrl: '../../views/modal/editCompany.html',
                        controller: 'editCompanyCtrl',
                        controllerAs: 'editCompany',
                        resolve: {
                            data: function () {
                                return {
                                    data: data
                                }
                            }
                        }
                    };
                    break;
                }
                case '17':
                {
                    modalConfig = {
                        templateUrl: '../../views/modal/editGroup.html',
                        controller: 'editGroupCtrl',
                        controllerAs: 'editGroup',
                        resolve: {
                            data: function () {
                                return {
                                    data: data
                                }
                            }
                        }
                    };
                    break;
                }

            }
            if (itemID == 4 && data.userId != $cookies.get('userId')) {
            }
            else if (modalConfig != null) {
                $modal({
                    templateUrl: modalConfig.templateUrl,
                    backdrop: 'static',
                    controller: modalConfig.controller,
                    controllerAs: modalConfig.controllerAs,
                    resolve: modalConfig.resolve
                });
            }
        };
        _self.create = function (itemID) {

            var modalConfig = {};
            //itemid
            switch (itemID) {
                case '2':
                {
                    modalConfig = {
                        templateUrl: '../../views/modal/createItem.html',
                        controller: 'itemCreateCtrl',
                        controllerAs: 'item'
                    };
                    break;
                }

                case '3':
                {
                    modalConfig = {
                        templateUrl: '../../views/modal/createKeyWord.html',
                        controller: 'keyWordCtrl',
                        controllerAs: 'keyword'
                    };
                    break;
                }

                case '4':
                {
                    modalConfig = {
                        templateUrl: '../../views/modal/createTemplet.html',
                        controller: 'createTempletCtrl',
                        controllerAs: 'createTemplet'
                    };
                    break;
                }

                case '5':
                {
                    modalConfig = {
                        templateUrl: '../../views/modal/createContract.html',
                        controller: 'createContractCtrl',
                        controllerAs: 'createContract'
                    };
                    break;
                }
                case '9':
                {
                    modalConfig = {
                        templateUrl: '../../views/modal/createProduct.html',
                        controller: 'createProductCtrl',
                        controllerAs: 'createProduct'
                    };
                    break;
                }
                    ;
                case '15':
                {
                    modalConfig = {
                        templateUrl: '../../views/modal/createUser.html',
                        controller: 'createUserCtrl',
                        controllerAs: 'createUser',
                        resolve: {
                            data: function () {
                                return {
                                    data: data
                                }
                            }
                        }
                    };
                    break;
                }
                case '17':
                {
                    modalConfig = {
                        templateUrl: '../../views/modal/createGroup.html',
                        controller: 'createGroupCtrl',
                        controllerAs: 'createGroup',
                        resolve: {
                            data: function () {
                                return {
                                    data: data
                                }
                            }
                        }
                    };
                    break;
                }
            }
            $modal({
                templateUrl: modalConfig.templateUrl,
                backdrop: 'static',
                controller: modalConfig.controller,
                controllerAs: modalConfig.controllerAs
            });
        };
        _self.showRoleDetail = function(groupId){
            $modal({
                templateUrl: '../../views/modal/editRole.html',
                backdrop: 'static',
                resolve: {
                    data: function () {
                        return {
                            groupId: groupId
                        }
                    }
                },
                controller: 'editRoleCtrl',
                controllerAs: 'editRole'

            });
        };
        _self.showUserDetail = function(groupId){
            console.log('haha');
            $modal({
                templateUrl: '../../views/modal/editRoleUser.html',
                backdrop: 'static',
                resolve: {
                    groupData: function () {
                        return {
                            groupId: groupId
                        }
                    }
                },
                controller: 'editRoleUserCtrl',
                controllerAs: 'editRoleUser'

            });
        };
        _self.showDetail = function (content) {
            $modal({
                templateUrl: '../../views/modal/innerDetail.html',
                backdrop: 'static',
                resolve: {
                    _content: function () {
                        return {
                            content: content
                        }
                    }
                },
                controller: 'innerDetailCtrl',
                controllerAs: 'inner'

            });
        };


    };
    innerDetailCtrl.$inject = ['$scope', '_content'];
    formListCtrl.$inject = ['$scope','$state', 'mainService', '$cookies', '$filter', '$modal', '$http', 'toaster', 'commonService'];
    itemCreateCtrl.$inject = ['$scope', '$http', '$cookies', 'toaster'];
    itemEditCtrl.$inject = ['$scope', 'data', '$cookies', '$http', 'toaster','$rootScope'];
    keyWordCtrl.$inject = ['$scope', '$http', '$cookies', 'toaster','$rootScope'];
    editKeyWordCtrl.$inject = ['$scope','data', '$cookies', '$http', 'toaster','$rootScope'];
    editTempletCtrl.$inject = ['$scope', 'data', '$cookies', '$http', 'toaster','$rootScope'];
    editProductCtrl.$inject = ['$scope', 'data', '$cookies', '$http', 'toaster','$rootScope'];
    createTempletCtrl.$inject = ['$scope', '$http', '$cookies', 'toaster','$rootScope'];
    createContractCtrl.$inject = ['$scope', 'mainService', '$http', '$cookies', 'toaster','$rootScope'];
    createProductCtrl.$inject = ['$scope', '$http', '$cookies', 'toaster','$rootScope'];
    editContractCtrl.$inject = ['$scope', 'mainService', 'data', '$http', '$cookies', 'toaster','$rootScope'];
    checkContractCtrl.$inject = ['$scope', 'data', '$cookies', '$http', 'toaster','$rootScope'];
    editSignFormCtrl.$inject = ['$scope', 'data', '$cookies', '$http', 'toaster', 'commonService','$rootScope'];
    createUserCtrl.$inject = ['$scope', '$http', '$cookies', 'toaster','$rootScope'];
    editUserCtrl.$inject = ['$scope', 'data', '$cookies', '$http', 'toaster', 'rigistService','$rootScope'];
    editCompanyCtrl.$inject = ['$scope', 'data', '$cookies', '$http', 'toaster','$rootScope'];
    createGroupCtrl.$inject = ['$scope', '$http', '$cookies', 'toaster','$rootScope'];
    editGroupCtrl.$inject = ['$scope', 'data', '$cookies', '$http', 'toaster','$rootScope'];
    editRoleCtrl.$inject = ['$scope', 'data', '$cookies', '$http', 'toaster','$rootScope'];
    editRoleUserCtrl.$inject = ['$scope', 'groupData', '$cookies', '$http', 'toaster','$rootScope']
    angular.module('formListCtrl', [])
        .controller('innerDetailCtrl', innerDetailCtrl)
        .controller('formListCtrl', formListCtrl)
        .controller('itemCreateCtrl', itemCreateCtrl)
        .controller('itemEditCtrl', itemEditCtrl)
        .controller('keyWordCtrl', keyWordCtrl)
        .controller('editKeyWordCtrl', editKeyWordCtrl)
        .controller('createTempletCtrl', createTempletCtrl)
        .controller('editTempletCtrl', editTempletCtrl)
        .controller('createContractCtrl', createContractCtrl)
        .controller('editProductCtrl', editProductCtrl)
        .controller('createProductCtrl', createProductCtrl)
        .controller('editContractCtrl', editContractCtrl)
        .controller('checkContractCtrl', checkContractCtrl)
        .controller('editSignFormCtrl', editSignFormCtrl)
        .controller('createUserCtrl', createUserCtrl)
        .controller('editUserCtrl', editUserCtrl)
        .controller('editCompanyCtrl', editCompanyCtrl)
        .controller('createGroupCtrl', createGroupCtrl)
        .controller('editGroupCtrl', editGroupCtrl)
        .controller('editRoleCtrl',editRoleCtrl)
        .controller('editRoleUserCtrl',editRoleUserCtrl)
})();
