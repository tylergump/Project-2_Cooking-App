const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: { 
        type: String,
        required: true
    },
    image: { type: String
    },
    ingredients: {
        type: String,
        required: true
    },
    recipe: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Recipe', recipeSchema)