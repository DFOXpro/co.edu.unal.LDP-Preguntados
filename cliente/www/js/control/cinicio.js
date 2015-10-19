/* global indexedDB */

/**
 * {
 *	0orden:['get, set']
 *	1llave
 *	2tabla
 *	3dato
 * }
 * @param {type} e 
 * @returns {undefined}
 */
var datos;
onmessage = function (e) {
//PUBLIC
	//console.log('idb worker', e.data[0]);
	switch(e.data[0]){
		case 'open':
			importScripts('../../preguntas.js');
			datos = preguntas();
			if(datos !== undefined) postMessage(["open", true]);
			break;
		case 'get':
			var llave = e.data[1], tabla = e.data[2];
			request.onerror = function (event) {
				console.error('idb.get:onerror', event);
				postMessage(undefined);
				event = null;
			};
			request.onsuccess = function (event) {
//					console.log(
//						'idb.get db',
//						llave,
//						event.target.result,
//						tabla
//					);
				var resultado = undefined;
				if(event.target.result !== undefined)
					resultado = event.target.result.dato;
				if(e.data[3] !== undefined) postMessage([resultado, e.data[3]]);
				else postMessage(resultado);
				resultado = null;
				event = null;
			};
			llave = null;
			tabla = null;
			break;
		case 'set':
			var llave = e.data[1], tabla = e.data[2], dato = e.data[3];
			var request = db.transaction([tabla], "readwrite")
			.objectStore(tabla).put({
				"dato": dato,
				"id": llave
			});
			request.onsuccess = function () {
				console.log("idb.set OK", llave, tabla);
			};
			request.onerror = function (e) {
				console.error("idb.set:request.onerror",e);
			};
			llave = null;
			tabla = null;
			dato = null;
			break;
		e = null;
	}
};