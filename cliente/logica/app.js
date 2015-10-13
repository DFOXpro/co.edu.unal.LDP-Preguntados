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
			when("/lp", {//ListadoPricipal
				templateUrl: "lp",
				controller: "lp"
			}).
			when("/m/:mangaId", {//manga(Descripcion y capitulos)
				templateUrl: "d",
				controller: "d"
			}).
			when("/m/:mangaId/:capituloId", {
				templateUrl: "capitulo-tmplt",
				controller: "c"
			}).
			when("/a", {//Ayuda
				templateUrl: "a",
				controller: "e"
			}).
			when("/ad", {//Acerca de
				templateUrl: "ad",
				controller: "e"
			}).
			when("/c", {//Configuración
				templateUrl: "c",
				controller: "e"
			}).
			otherwise({
				redirectTo: "/i"
			});
	}]);