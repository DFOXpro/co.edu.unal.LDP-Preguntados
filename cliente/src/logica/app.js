var app = angular.module("app", [
	"ngRoute","ngAnimate"
]);

app.config(["$routeProvider",
	function ($routeProvider) {
		$routeProvider.
			when("/i", {//Inicio
				templateUrl: "i",
				controller: "i"
			}).
			otherwise({
				redirectTo: "/i"
			});
	}]);