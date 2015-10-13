/* global app */

app.factory("$conexion", ["$rootScope",function ($rootScope) {
	var r = {
		/**
		 * 
		 * @param {Object} api
		 * @param {function} callback
		 */
		getListadoMangas: function (api, callback) {
			console.log("conexion.getListadoMangas: ", api);

			var xhr = new XMLHttpRequest({mozSystem: true});
			xhr.open("GET", api.dominio+api.listadoDeMangas, true);

			xhr.onload = function (eventoCargado) {
				console.log('xhr.onload: ', eventoCargado);
				$rootScope.$apply($rootScope.nav.progreso.B_mostrar = false);
				callback(JSON.parse(xhr.response).manga, true);
			};
			xhr.onprogress = function () {
				$rootScope.$apply(function() {
					$rootScope.nav.progreso.N_valor ++;
					$rootScope.nav.progreso.B_mostrar = true;
				});
			};
			xhr.onerror = function (eventoError) {
				console.error('ERROR XHR: ', eventoError);
				$rootScope.$apply($rootScope.nav.progreso.B_mostrar = false);
				callback(undefined, false);
			};
			xhr.send();
		},
		
		/**
		 * 
		 * @param {Object} api 
		 * @param {String} id
		 * @param {function} callback
		 * @returns {undefined}
		 */
		getDescripcion : function(api, id, callback) {
			console.log("Conexion.getDescripcion", api);
			var xhr = new XMLHttpRequest({mozSystem: true});
			xhr.open(
				"GET",
				api.dominio+api.manga + id + "/",
				true
			);
			xhr.onload = function() {
				console.log('getDescripcion.onload');
				callback(JSON.parse(xhr.response), true);
			};
			xhr.onerror = function(e) {
				console.error('getDescripcion.onerror: ', e);
				callback(undefined,false);
			};
			xhr.send(null);
		},
		getImagen : function(url, callback){
			var xhr = new XMLHttpRequest({mozSystem: true});
			xhr.open(
				"GET",
				url,
				true
			);
			xhr.setRequestHeader("Accept", "image/png,image/*;q=0.8,*/*;q=0.5");
			xhr.responseType = 'arraybuffer';
			xhr.onload = function() {
				callback("data:image/png;base64,"+
					btoa(
						String.fromCharCode.apply(null,
							new Uint8Array(xhr.response)
						)
					)
				);
			};
			xhr.onerror = function(e) {
				console.error('getImagen.onerror: ', e);
				callback(undefined,false);
			};
			xhr.send(null);
		}
	};
	return r;
}]);

