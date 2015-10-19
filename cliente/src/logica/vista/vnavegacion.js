/* global app */

app.controller("nav", [
	"$rootScope",
	"$scope",
	function ($rootScope, $scope) {
//PRIVATE
	//none
//SCOPE
		$scope.header = {
			B_menu : false,
			B_atras : false,
			B_buscar : false,
			B_btn_buscar : false,
			B_btn_pantallaCompleta : false,
			S_ipt_Buscar : "",
			S_titulo : "",
			F_atras : function () {
				$rootScope.nav.header.F_atras();
			},
			F_buscar : function () {
				console.log("navBuscar");
				$scope.header.B_buscar = !$scope.header.B_buscar;
				window.setTimeout(function() { document.getElementById("ipt-buscar").focus(); },0);//Soluciona http://stackoverflow.com/a/26581206
			},
			F_buscarDebounce : function () {
				$rootScope.nav.header.F_buscar($scope.header.S_ipt_Buscar);
			}
		};
		$rootScope.$watch("nav.header.S_titulo", function(newValue) {
			console.log("nav.header.S_titulo", newValue);
			$scope.header.S_titulo = newValue;
		});

		$scope.footer = {
			B_btn_recargar: false,
			B_btns_visor_nav: false,
			B_btns_orden: false,
			B_orden: true,
			B_btns_mostrarMangas: false,
			B_grid: false,
			B_btn_extras: false,
			B_btn_categorias: false,
			B_mensage: false,
			S_mensage: "",
			F_cambiarModoLista: function (b) {
				$rootScope.nav.footer.B_grid = b;
				$scope.footer.B_grid = b;
			},
			F_actualizar: function () {
				$rootScope.nav.footer.actualizar();
			}
		};
		$rootScope.$watch("nav.footer.B_mensage", function (newValue, v) {
			$scope.footer.B_mensage = newValue;
		});

		$scope.progreso = {
			N_valor: -1,
			B_mostrar: true
		};
		$rootScope.$watch("nav.progreso.N_valor", function (newValue, v) {
			$scope.progreso.N_valor = newValue;
		});
		$rootScope.$watch("nav.progreso.B_mostrar", function (newValue, v) {
			$scope.progreso.B_mostrar = newValue;
		});

		$scope.menu = {
			N_orden : 0,
			N_lista : 0,
			B_mostrar : false,
			F_cambiarOrden : function (n) {
				console.log("F_cambiarOrden", n);
				$scope.menu.N_orden = n;
				$rootScope.nav.menu.B_mostrar = true;
				$rootScope.nav.menu.N_orden = n;
			},
			F_cambiarLista : function (n) {
				$scope.menu.N_lista = n;
				$rootScope.nav.menu.B_mostrar = true;
				$rootScope.nav.menu.N_lista = n;
			}
		};
		$rootScope.$watch("nav.menu.B_mostrar", function(newValue) {
			$scope.menu.B_mostrar = newValue.B_mostrar;
		});

//STATIC
	//none

//PUBLIC
		$rootScope.nav = {
			menu : {
				N_orden : 0,
				N_lista : 0,
				B_mostrar : false
			},
			progreso : {
				N_valor : -1,
				B_mostrar : true
			},
			header : {
				S_titulo : "",
				set : function (
					B_menu,
					B_atras,
					B_btn_buscar,
					B_btn_pantallaCompleta,
					S_titulo
				) {
					$scope.header.B_menu = B_menu;
					$scope.header.B_atras = B_atras;
					$scope.header.B_btn_buscar = B_btn_buscar;
					$scope.header.B_btn_pantallaCompleta = B_btn_pantallaCompleta;
					$scope.header.S_titulo = S_titulo;
				}
			},
			footer : {
				B_grid : false,
				B_mensage : false,
				set : function (
					B_btn_recargar,
					B_btns_visor_nav,
					B_btns_orden,
					B_btns_mostrarMangas
				) {
					$scope.footer.B_btn_recargar = B_btn_recargar;
					$scope.footer.B_btns_visor_nav = B_btns_visor_nav;
					$scope.footer.B_btns_orden = B_btns_orden;
					$scope.footer.B_btns_mostrarMangas = B_btns_mostrarMangas;
				},
				alerta : function (mensage) {
					console.log("nav.alerta", mensage);
					$rootScope.nav.footer.B_mensage = true;
					$scope.footer.B_mensage = true;
					$scope.footer.S_mensage=mensage;
					try {
						$scope.$digest();
					} catch (e) {
					}

					window.setTimeout(function (){
						$scope.footer.B_mensage=false;
						try {
							$scope.$digest();
						} catch (e) {
						}
					}, 10000);
				},
				actualizar : function () {
					//do nothing
				}
			}
		};

	}]);