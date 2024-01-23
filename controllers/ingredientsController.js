const Ingredient = require('../models/ingredient')

const asyncHandler = require('express-async-handler');

const getAllIngredients = asyncHandler(async (req,res)=>{
    const allIng = await Ingredient.find().lean()
    if (!allIng){
        return res.status(400).json({message:'no ingredients found'})
    }
    return res.status(200).json(allIng)
})

const addNewIngredient = asyncHandler(async(req,res)=>{

})

const updateIngredient = asyncHandler(async(req,res)=>{
    
})

const deleteIngredient = asyncHandler(async(req,res)=>{
    
})