const request = require('request')

const metGetId = function(term, callback) {
	console.log("Ando en metGetID")

	const url = 'https://collectionapi.metmuseum.org/public/collection/v1/search?q=' + term
	request({url, json: true}, function(error, response) {
	if (error) {
		callback('Service unavailable', undefined)
	} else if (response.body.Response == 'False') {
		callback(response.body.Error, undefined)
	} else if (response.body.total == 0) {
		callback("No se encontraron resultados con la búsqueda realizada.", undefined)	   	
	}
	else {
		const data = response.body
		const info = data.objectIDs[0]
		callback(undefined, info)
	   	}
	})
}

const metGetObject = function(id, callback) {
	
	console.log("Ando en metGetObj")
	console.log(id)

	const url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' + id
	request({url, json: true}, function(error, response) {
	if (error) {
		callback('Service unavailable', undefined)
	} else if (response.body.message == 'could not get parse objectID') {
		callback('could not get parse objectID', undefined)
	} else {
		const data = response.body
		console.log(data)
		const info = {
			artist : data.constituents[0].name,
			title: data.title,
			year: data.year,
			technique: data.medium,
			metUrl : data.objectURL
			}
		callback(undefined, info)
		}
	})
}

module.exports = {
	metGetId: metGetId,
	metGetObject: metGetObject
}