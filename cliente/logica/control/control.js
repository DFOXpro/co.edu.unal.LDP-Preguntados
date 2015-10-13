/* global app */

app.factory("$modelo", [
	"$persistencia",
	"$conexion",
function ($p, $c) {
//PUBLIC
	sort_by = function (field, reverse, primer) {
		console.log("sort_By", field);
		var key = primer ?
		function (x) {
			return primer(x[field]);
		} :
		function (x) {
			return x[field];
		};
		reverse = [-1, 1][+!!reverse];
		return function (a, b) {
			return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
		};
	};

	var r = {
		get : {
			/**
			* Carga el cache y el api para hacer más sencillo el callback stock
			* @param {type} callback (cache,apis)
			* @returns {undefined}
			*/
			api : function (callback) {
				$p.get($p.ID,function (id){
				$p.get($p.APIS,function (apis){
					console.log("modelo>getAPI",id, apis);
					callback(apis[id], id);
				});});
			},
			listadoDeMangas : function (callback, b) {
				$p.get($p.ID,function (id){
				$p.getSinCache(id,function (lista){
					console.log("modelo.listadoDeMangas",lista);
					if (b | lista === undefined){
						r.get.api(function(api){
							$c.getListadoMangas(
								api, function(respuesta, exito){
									callback(respuesta);
									console.log("request.listadoDeMangas ", exito, api);
									if(exito)
										$p.set(
											id,
											respuesta.sort(sort_by('h', false, window.parseInt)),
											$p.TLISTA
										);
								}
							);
						});
					} else callback(lista);
				},$p.TLISTA);
				});
			},
			imagen : function (url, index, callback) {
				$p.getSinCache(url,function (img){
					if(img === undefined)
						$c.getImagen(url,function (img){
							callback(img, index);
							if(img !== undefined) $p.set(url, img, $p.TIMAGENES, true);
						});
					else {
						callback(img, index);
						//console.log("modelo.get.imagen db");
					}
				});
				
			}
		}
	};

	return r;
}]);