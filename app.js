const path = require('path')
const express = require('express')
const met = require('./met.js')

const app = express()
const port = process.env.PORT || 3000

const publicDir = path.join(__dirname, 'public')

app.use(express.static(publicDir))

app.get('/', function(req, res) {
	res.send('<h1>¡Hola!</h1> <h2>Prueba del examen parcial dos<h2>')
})

app.get('/students/:id', function(req, res) {
	if (req.params.id!='A01039364'){
		return res.send({
			error: "Debes de ingresar el id válido (A01039364)."
		})
	}

	res.send({
		id: 'A01039364',
		fullname: 'Fernando David Romero Nava',
		nickname: 'Fer',
		age: 22
	})
})


app.get('/met', function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*')
	if (!req.query.search){
		return res.send({
			error: "Debes enviar un search term"
		})
	}
	
	met.metGetId(req.query.search, function(error, response){
		if(error) {
			return res.send({
				error: error
			})
		}
		const metId = response
		console.log(metId)
		met.metGetObject(metId, function(error, response) {
			if(error) {
				return res.send({
					error: error
				})
			}
			const data = response
			console.log(response)
			res.send({
				searchTerm: req.query.search,
				artist: response.artist,
				title: response.title,
				year: response.year,
				technique: response.technique,
				metUrl: response.metUrl
			})
		})
	})

})


app.get('*', function(req, res){
	res.send({
		error: 'Esta ruta no existe.'
	})
})

app.listen(port, function() {
	console.log('up and running')
})