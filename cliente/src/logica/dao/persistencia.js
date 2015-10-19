/* global app */

app.factory("$persistencia", function () {
//PRIVATE
	var cacheDeSesion = Array();
	var db;
//PUBLIC
	var r = {
//STATIC
		ID: "id",
		APIS: "apis",
		CONFIGURACION: "config",
		TLISTA: "lista",
		TMANGA: "manga",
		TGENERAL: "general",
		TIMAGENES: "imagenes",

		/**
		 * Async Simplificación de indexedDB a kindOf localStorage
		 * @param {String} llave
		 * @param {function} callback
		 * @param {String} tabla
		 */
		get : function (llave, callback, tabla) {
			if(db === undefined) location.replace("#/i");
			else if (cacheDeSesion[llave] !== undefined) {
				console.log(
					"persistencia.get cache",
					llave,
					cacheDeSesion[llave]
				);
				callback(cacheDeSesion[llave]);
			} else {
				//No tiene los datos en chache, se comunica con IDB
				if(tabla === undefined) tabla = r.TGENERAL;
				var request = db.transaction([tabla]).objectStore(tabla).get(llave);
				request.onerror = function (event) {
					console.error("persistencia.get:onerror", event);
				};
				request.onsuccess = function (event) {
					console.log(
						"persistencia.get db",
						llave,
						event.target.result,
						tabla
					);
					if(event.target.result !== undefined)
						cacheDeSesion[llave] = event.target.result.dato;
					callback(cacheDeSesion[llave]);
				};
			}
		},
		getSinCache : function (llave, callback, tabla) {
			if(db === undefined) location.replace("#/i");
			else {
				if(tabla === undefined) tabla = r.TIMAGENES;
				var request = db.transaction([tabla]).objectStore(tabla).get(llave);
				request.onerror = function (event) {
					console.error("persistencia.get:onerror", event);
				};
				request.onsuccess = function (event) {
//					console.log(
//						"persistencia.getSinCache",
//						llave,
//						event.target,
//						tabla
//					);
					if(event.target.result !== undefined) callback(event.target.result.dato);
					else callback(undefined);
				};
			}
		},
		/**
		 * Async
		 * @param {String} llave
		 * @param {Value} dato a guardar
		 * @param {String} tabla
		 * @param {Bool} SinCache
		 */
		set : function (llave, dato, tabla, SinCache) {
			if(db === undefined) open(function () {r.set(llave, tabla);});
			if(SinCache === undefined){
				cacheDeSesion[llave] = dato;
				console.log("set con cache");
			} else console.log("set sin cache");
			if(tabla === undefined) tabla = r.TGENERAL;
			var request = db.transaction([tabla], "readwrite")
			.objectStore(tabla).put({
				"dato": dato,
				"id": llave
			});
			request.onsuccess = function () {
				console.log("persistencia.set OK", llave, tabla);
			};
			request.onerror = function (e) {
				console.error("persistencia.set:request.onerror",e);
			};
		},

		/**
		 * Inicia la conección con indexedDB, trae todos los datos de idb a memoria 
		 * @param {type} callback
		 * @returns {undefined}
		 */
		open : function (callback) {
			console.log("Persistencia.open");
			var rqst = window.indexedDB.open("kasaiMangaDB", 2);
			rqst.onerror = function (evento) {
				console.error("indexedDB.open.onerror", evento);
			};
			rqst.onsuccess = function (event) {
				db = event.target.result;
				r.get(r.APIS,  function(apis){
				r.get(r.CONFIGURACION, function(config){
					callback(apis, config);
				});});
			};
			rqst.onupgradeneeded = function (event) {
				console.log("indexedDB.open.request.onupgradeneeded",event.target.result);
				db = event.target.result;
				try {
					db.deleteObjectStore("persistencia");
				}
				catch (e) {
				}
				// Create an objectStore for this database
				db.createObjectStore(r.TGENERAL, {keyPath: "id"});
				db.createObjectStore(r.TLISTA, {keyPath: "id"});
				db.createObjectStore(r.TMANGA, {keyPath: "id"});
				db.createObjectStore(r.TIMAGENES, {keyPath: "id"});
			};
		}
	};
	return r;
});