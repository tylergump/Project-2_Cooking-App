const express = require('express')
const app = express()
const methodOverride = require('method-override')
const mongoose = require('mongoose')
require('dotenv').config()

//CONNECTIONS

const PORT = process.env.PORT

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, {
	useNewUrlParser: true,
	useunifiedTopology: true
}, () => {
	console.log('db connected');
})

const db = mongoose.connection

db.on('connected', () => {
	console.log('mongoose connected to', MONGODB_URI);
})
db.on('disconnected', () => {
	console.log('mongoose disconnected to', MONGODB_URI);
})
db.on('error', (error) => {
	console.log('mongoose error', error);
})

// MIDDLEWARE

app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))

// CONTROLLERS

const recipeController = require('./controllers/recipeController')
app.use('/recipes', recipeController)


// home page for testing

app.get('/', (req,res) => {
	res.send('thanks for coming')
})

// LISTENER

app.listen(PORT, () => {
	console.log('listening on port:', PORT);
})