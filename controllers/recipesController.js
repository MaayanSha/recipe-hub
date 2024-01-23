//import model
//import async handler for CRUD requests
const asyncHandler = require('express-async-handler');
const Recipe = require('../models/recipesDB')

const getAllRecipes = asyncHandler(async(req, res)=>{
    const recipes = await Recipe.find().lean()
    if (!recipes | recipes.length == 0){
        return res.status(400).json({message: 'no recipes here yet'})
    }
    res.json(recipes)
    })

const getRecipeById = asyncHandler(async(req,res)=>{
    if (!req.params.item){
        return res.status(400).json({message:'missing name in request'})
    }
    const recipe = await Recipe.find({item:req.params.item}).lean()
    if (!recipe){
        return res.status(400).json({message:'invalid id in request'})   
    }
    return res.json(recipe)
    })

const addNewRecipe = asyncHandler(async(req,res) => {
    if(!req.body.item | !req.body.steps | !req.body.ingredients){
        return res.json('Please fill out all fields.')
    }
    const dupe = await Recipe.findOne({item: req.body.item}).exec();
    if (dupe){
        return res.status(400).json({message: 'recipe name already exists'})
    }
    const newRecipe = {
        item: req.body.item,
        ingredients: req.body.ingredients,
        steps:req.body.steps
    }
    const recipe = await Recipe.create(newRecipe)
    if (recipe){
        return res.status(200).json({message:'recipe created successfully'})
    }
    else{
        return res.status(500).json({message:'failed creating new recipe'})
    }
})

const editRecipe = asyncHandler(async(req, res)=>{
    const {item, ingredients, steps} = req.body
    if (!item | !ingredients |!steps){
        return res.json('Please fill out all fields.')
    }
    const recipe = await Recipe.findOneAndUpdate({item: item}, {
        ingredients:ingredients,
        steps:steps
    })
    if (recipe){
        return res.status(200).json({message:'recipe updated successfully'})
    }
    else{
        return res.status(500).json({message:'failed updating recipe'})
    }
})

const deleteRecipe = asyncHandler(async(req,res)=>{
    const item = req.body.item
    if (!item){
        return res.json('Please specify recipe name')
    }
    const recipe = await Recipe.findOneAndDelete({item:item})
    if (recipe){
        return res.status(200).json({message:'recipe deleted successfully'})
    }
    else{
        return res.status(500).json({message:'failed deleting recipe'})
    }
})

module.exports = {
    getAllRecipes,
    getRecipeById,
    addNewRecipe,
    editRecipe,
    deleteRecipe
}