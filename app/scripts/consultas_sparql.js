/*
*	Se ejecuta al cargar la pagina
*/
$(document).ready(function() {	
	consultarPorRegion();
});

/*
*  Consulta las regiones.
*/
function consultarPorRegion(){
	var consulta = "SELECT DISTINCT ?nombre ?regiones ?id_servicio  WHERE {\
					    ?regiones a <http://praga.ceisufro.cl/schemas/DAL/Establecimientossalud_01_12_2012> .\
						?regiones <http://praga.ceisufro.cl/schemas/DAL/id_servicio> ?id_servicio.\
					    ?regiones <http://praga.ceisufro.cl/schemas/DAL/nom_servicio> ?nombre\
					} group by ?id_servicio \
					order by ?id_servicio";

	$.ajax({
		dataType: 'jsonp',
		data: {
			query: consulta,
			output: 'json'
		},
		url: 'http://praga.ceisufro.cl/sparql',
		success: function(data){
			console.log(data);
			$(data.results.bindings).each(function(i, item){
				$("#regiones").append("<option value='"+item.id_servicio.value+"'>"+item.nombre.value+"</option>");
			});
		}
	});	
}
/**
   Se realiza una consulta de los clubes en donde ha jugado el jugador seleccionado.
*/
function consultarClubes(q){
	var consulta = "select distinct ?jugador ?clubes\
					where {\
					    ?jugador a <http://praga.ceisufro.cl/schemas/DAL/Establecimientossalud_01_12_2012>.\
					    ?jugador <http://dbpedia.org/property/clubs> ?clubes.\
					    ?jugador <http://dbpedia.org/property/name> ?nombre\
					    FILTER(?nombre = '"+q+"'@en)\
					}";
	$.ajax({
		dataType: 'jsonp',
		data: {
			query: consulta,
			output: 'json'
		},
		url: 'http://praga.ceisufro.cl/sparql',
		success: function(data){
			$("#clubes").html("");

			if(data.results.bindings.length == 0){
				alert("Este jugador no tiene club registrado en la BD.");
			}

			$(data.results.bindings).each(function(i, item){
				$("#clubes").append('<li>'+item.clubes.value+"</li>");
			});
		}
	});	
}
/**
	Esta funcion se llama al hacer click sobre un jugador en particular.
*/	
function verClubes(nombre){
	consultarClubes(nombre);
}