/* global app */

app.controller("i",[
	"$rootScope",
	"$scope",
	"$mI",
	"$visor",
function ($rootScope, $scope, $m, $visor) {
//PRIVATE
	var confirmar = function (respuesta) {
		console.log("inicio.confirmar", respuesta);
		if(respuesta !== undefined){
			$rootScope.nav.footer.B_mensage = false;
			$m.get.rutaDeImagen(function(ruta){
				$rootScope.imgSrc = ruta;
			});
			location.replace("#/lp");
		} else {
			$visor.set("/img/inicio.png");
			$rootScope.nav.footer.alerta("Oops, needs internet");
		}
	};

//PUBLIC
	console.log("inicio>InitGui");
	$rootScope.nav.footer.actualizar = function (){
		$m.get.listadoDeMangas(confirmar, true);
	};
	$rootScope.nav.header.set(
		false,
		false,
		false,
		false,
		"Kasai Manga"
	);
	$rootScope.nav.footer.set(
		true,
		false,
		false,
		false
	);
	$rootScope.nav.footer.alerta("Loading");
//STATIC
//SCOPE

//MAIN
	$m.iniciar(confirmar);
}]);