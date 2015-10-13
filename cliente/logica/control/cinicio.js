/* global app */

app.factory("$mI", [
	"$persistencia",
	"$modelo",
function ($p, $m) {
//PRIVATE
	/**
	 * 
	 * @param {String} key
	 * @param {Value} valor
	 * @param {String} texto
	 * @returns {undefined}
	 */
	var setConfiguracion = function (key, valor, texto) {
		console.log("modelo.setConfiguracion");
		return {
			key : key,
			valor : valor,
			texto : texto
		};
	};

	/**
	 * 
	 * @param {String} dominio
	 * @param {String} nombre
	 * @param {url} listadoDeMangas
	 * @param {url} manga
	 * @param {url} capitulo
	 * @param {url} imagen
	 * @returns {undefined}
	 */
	var setApi = function (nombre, dominio, listadoDeMangas, manga, capitulo, imagen) {
		console.log("modelo.setApi");
		return {
			nombre : nombre,
			dominio : dominio,
			listadoDeMangas : listadoDeMangas,
			manga : manga,
			capitulo : capitulo,
			imagen : imagen
		};
	};

	iniciaCache = function (apis, config) {
		console.log("modelo.iniciaCache", apis, config);
		if(apis === undefined){
			console.log("inicializando apis");
			apis = [
				setApi(
					"English (MangaEden)",
					"http://www.mangaeden.com/api/",
					"list/0/",//0 Ingles 1 Italiano
					"manga/",
					"chapter/",
					"http://cdn.mangaeden.com/mangasimg/"
				),
				setApi(
					"Italiano (MangaEden)",
					"http://www.mangaeden.com/api/",
					"list/1/",
					"manga/",
					"chapter/",
					"http://cdn.mangaeden.com/mangasimg/"
				)
			];
			$p.set($p.APIS, apis);
			$p.set($p.ID, 0);
		} else console.log("apis ya inicializados");

		if (typeof config !== "object")
			$p.set($p.CONFIGURACION, [
				setConfiguracion("sombraBtnPC", false, "Enable fullscreen button shadow"),
				setConfiguracion("temaOscuro", true, "Use dark theme"),
				setConfiguracion("lenguaje", 0, "Languaje")
			]);
	};


//PUBLIC
	var r = {
		get:{
			listadoDeMangas : $m.get.listadoDeMangas,//Hereda
			rutaDeImagen : function(callback){
				$m.get.api(function(api){callback(api.imagen);});
			}
		},
		iniciar : function(callback){
			$p.open(function (apis, config) {
				console.log("modelo.inicio");
				iniciaCache(apis, config);
				$m.get.listadoDeMangas(callback);
			});
		}
	};
	return r;
}]);