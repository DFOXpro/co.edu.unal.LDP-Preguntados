/* global app */

app.controller("i",[
	"$rootScope",
	"$scope",
	"$timeout",
	//"$mI",
function ($rootScope, $scope, $t) {
//PRIVATE
	var W_control;
	var confirmar = function (respuesta) {
		if(respuesta.data[0] === "open" & respuesta.data[1]){
			$t(function(){
				$rootScope.nav.progreso.B_mostrar = false;
				$rootScope.nav.footer.B_mensage = false;
			},0);
		} else {
			$rootScope.nav.footer.alerta("Las preguntas no se cargaron");
		}
	};

//PUBLIC
	$rootScope.nav.footer.actualizar = function (){
		W_control.get.listadoDeMangas(confirmar, true);
	};
	$rootScope.nav.header.set(
		false,
		false,
		false,
		false,
		"UNal Preguntados"
	);
	$rootScope.nav.footer.alerta("Cargando");
//STATIC
//SCOPE

//MAIN
	try {
		var ih = $("#w1").html();
		var b = new Blob([ih], {type: 'javascript/worker'});
		var url = window.URL.createObjectURL(b);
		W_control = new Worker(url);
	} catch (e) {
		W_control = new Worker("js/control/cinicio.js");
	}
	W_control.postMessage(["open"]); W_control.onmessage = confirmar;
}]);