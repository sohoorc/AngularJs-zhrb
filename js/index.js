
var app = angular.module('zhrb', ['ionic']);

app.config(
  function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    $ionicConfigProvider.tabs.position('bottom');

    $stateProvider
      .state('start', {
        url: '/Start',
        templateUrl: 'tpl/start.html'
      })
      .state('main', {
        url: '/Main',
        templateUrl: 'tpl/main.html',
        controller: 'mainCtrl'
      })
      .state('detail', {
        url: '/Detail/:id',
        templateUrl: 'tpl/detail.html',
        controller: 'detailCtrl'
      })
      .state('themes', {
        url: '/Themes/:id',
        templateUrl: 'tpl/themes.html',
        controller: 'themesCtrl'
      })
      .state('myOrder', {
        url: '/MyOrder',
        templateUrl: 'tpl/myOrder.html',
        controller: 'myOrderCtrl'
      })
     .state('me', {
         url: '/me',
         templateUrl: 'tpl/me.html',
         controller: 'meCtrl'
     });

    $urlRouterProvider.otherwise('/Start')

  });


app.controller('parentCtrl', ['$scope', '$state',
  function ($scope, $state) {

    $scope.jump = function (stateName, arg) {
      $state.go(stateName, arg);
    }
  }]);

app.controller('mainCtrl', ['$scope', '$http', '$ionicSlideBoxDelegate',
  function ($scope, $http, $ionicSlideBoxDelegate) {
    $scope.hasMore = true;
    $http //获取新闻列表
      .get('data/getpage.php')
      .success(function (data) {
         $scope.Time = data.date;        //拿到日期
          $scope.viewTime = `${$scope.Time.slice(0,4)}年${$scope.Time.slice(4,6)}月${$scope.Time.slice(6,8)}日`;
          $scope.dishList = data.stories;
          $scope.topList = data.top_stories;

      });

      $http    //侧边栏新闻
       .get('data/get_theme.php?themeId')
       .success(function (data) {
           console.log(data);
           $scope.orderList = data.others;
       });

    $scope.loadMore = function () {
        $scope.Time--;
      $http
        .get('data/get_before_page.php?dateId=' + $scope.Time)
        .success(function (data) {
            console.log(data);
          if (data.length < 5) {
            $scope.hasMore = false;
          }
            $scope.dishList= $scope.dishList.concat(data.stories);
        });
    }


  }]);


app.controller('detailCtrl', ['$scope', '$http', '$stateParams',
  function ($scope, $http, $stateParams) {
    $http
      .get('data/get_detaile_news.php?newsId=' + $stateParams.id)
      .success(function (data) {
        console.log(data);
        $scope.obj = data;
      });
    $scope.setId = function () {
        localStorage.setItem('new_id', $scope.obj.id);
    }
  }
]);


app.controller('themesCtrl', ['$scope', '$http', '$stateParams',
    function ($scope, $http, $stateParams) {
    console.log($stateParams.id);
        $http
         .get('data/get_theme.php?themesId=' + $stateParams.id)
         .success(function (data) {
             console.log(data);
             $scope.themeList = data.stories;
             $scope.themeTitle = data;
         });
        $scope.setId = function () {
            localStorage.setItem('new_id', $scope.obj.id);
        }
    }
]);

app.controller('myOrderCtrl', ['$scope', '$http','$stateParams',
  function ($scope, $http,$stateParams) {

    $http.get('data/get_theme.php?themeId')
      .success(function (data) {
        console.log(data);
        $scope.orderList = data.others;
      });

  }]);

app.controller('meCtrl', ['$scope', '$http','$stateParams',
    function ($scope, $http,$stateParams) {



    }]);


//自定义过滤器
app
 .filter('parseImg', function(){
     return function(value){
         // value = value[0] || value;
         // console.log(value);
         if (value) {
             // var url = value.replace('http://', '');
             // console.log(url);
             value = value.replace(/http:\/\//g, 'http://images.weserv.nl/?url=');
             value = value.replace(/https:\/\//g, 'http://images.weserv.nl/?url=');
             return value;
             // return 'http://192.168.0.103:9090/proxy/?url=' + value;
         }else{
             return '/img/img.png';
         }
     }
 }).filter('setHTML', function ($sce) {
    return function (input) {
        if (input) {
            input = input.replace(/http:\/\//g, 'http://images.weserv.nl/?url=');
            input = input.replace(/https:\/\//g, 'http://images.weserv.nl/?url=');
            var body = angular.element(input)[0];
            var none = body.querySelector('.img-place-holder');
            console.log(none && none.remove());
            // body.children[0].remove()
            // return $sce.trustAsHtml(body.innerHTML);
            return $sce.trustAsHtml(body.innerHTML);
        }else{
            return $sce.trustAsHtml('');
        }
    }
});














