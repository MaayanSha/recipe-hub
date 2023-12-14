const express = require('express')
const router = express.Router()
const path = require('path')
const recipesController = require('../../controllers/recipesController')

router.route('/')
    .get(recipesController.getAllRecipes)
    .post(recipesController.addNewRecipe)
    .patch(recipesController.editRecipe)
    .delete(recipesController.deleteRecipe)

router.route('/:id')
    .get(recipesController.getRecipeById)


module.exports = router