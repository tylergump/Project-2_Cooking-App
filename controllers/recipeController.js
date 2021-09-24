const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipes')

router.get('/seed', async (req, res) => {
    const newRecipes =
      [
        {
          name: 'Blueberry Pie',
          author: 'Robert Digital',
          image: 'https://www.inspiredtaste.net/wp-content/uploads/2016/06/Blueberry-Pie-Recipe-2-1200.jpg',
          ingredients: 'bluberries, pie crust, sugar',
          recipe: 'mix it all together and bake at 400 degrees for 30 minutes'
        },
        {
            name: 'Blueberry Pie 2',
            author: 'Clifford Robinson',
            image: 'https://www.inspiredtaste.net/wp-content/uploads/2016/06/Blueberry-Pie-Recipe-2-1200.jpg',
            ingredients: 'bluberries, pie crust, sugar',
            recipe: 'mix it all together and bake at 400 degrees for 30 minutes'
          }
      ]
  
    try {
      const seedItems = await Recipe.create(newRecipes)
      res.send(seedItems)
    } catch (err) {
      res.send(err.message)
    }
  })


// INDEX
router.get('/', (req, res) => {
    try{
    Recipe.find({}, (err, allRecipes) => {
        err ? res.send(err)
        : res.render('index.ejs', {
            recipes: allRecipes
        })
    })
} catch (err) {
    res.send(err.message)
    console.log(err.message)
}
})

//new 

router.get('/new', (req, res) => {
    res.render('new.ejs')
  })
  
//show 
router.get('/:id', (req, res) => {
	try{
		Recipe.findById(req.params.id, (err, foundRecipe) => {
			err ? res.send(err)
			: res.render('show.ejs', {
				recipe: foundRecipe
			})
		})
	}
	catch (err) {
		res.send(err.message)
	}
})




//post
router.post('/', (req, res) => {
    Recipe.create(req.body, (error, createdRecipe) => {
        if (error) {
            console.log(error)
            res.send(error)
        } else {
            res.redirect('/recipes')
        }
    })
})

//edit

router.get('/:id/edit', (req, res) => {
    try{
        Recipe.findById(req.params.id, (err, foundRecipe) => {
            err ? res.send(err)
            : res.render('edit.ejs', {
                recipe: foundRecipe
            })
        })
    }
    catch(err) {
        res.send(err.message)
    }
})

//update

router.put('/:id', (req, res) => {
    try {
        Recipe.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedRecipe) => {
            err ? res.send(err)
            : res.redirect('/recipes/' + req.params.id)
        })
    }
    catch (err) {
        res.send(err.message)
    }
})

module.exports = router