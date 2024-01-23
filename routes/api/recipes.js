const express = require('express')
const router = express.Router()
const path = require('path')
const recipesController = require('../../controllers/recipesController')
const authenticateToken = require('../../auth/authenticate')

router.route('/')
    .get(recipesController.getAllRecipes)

router.route('/:id')
    .get(recipesController.getRecipeById)

router.route('/')
    .post(authenticateToken, recipesController.addNewRecipe)
    .patch(authenticateToken, recipesController.editRecipe)
    .delete(authenticateToken, recipesController.deleteRecipe)
module.exports = router