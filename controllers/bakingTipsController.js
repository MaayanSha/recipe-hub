//import model
const BakingTips = require('../../models/bakingTipsDB');

//import async handler for CRUD requests
const asyncHandler = require('express-async-handler');

//@desc: get all tips
//@route: GET /
//@access: private
const getAllTips = asyncHandler(async(req,res)=>{
    //fetch tips from db, omit the rating field and send json-like data
    const tips = await BakingTips.find().select(-rating).lean();
    if (!tips){
        return res.status(400).json({message:'no tips found'})
    }
    res.json(tips);
})

//@desc: send new tip
//@route: POST /
//@access: private
const postNewTip = asyncHandler(async(req,res)=>{
    if (!req.body.title | !req.body.content){
        return res.status(500).json({message:'title or content are required'})
    }
    //check for duplicates
    const dupe = BakingTips.findOne({title: req.body.title}).exec()
    if (dupe ){
        return res.status(500).json({message:'title already exists for another tip.'})
    }
    const tipObject = {
        title: req.body.title,
        content: req.body.content
    };
    const tip = await BakingTips.create(tipObject);
    if (tip){
        res.status(201).json({message:'tip created successfully'})
    }
    else{
        res.status(400).json({message:'something went wrong'})
    }
})

//@desc: update tips
//@route: FETCH /
//@access: private
const updateExistingTip = asyncHandler(async(req,res)=>{
    if (!req.body.title | !req.body.content){
        return res.status(500).json({message:'title or content are required'})
    }
    const tip = BakingTips.findOne({title: res.body.title}).exec()
    tip.title = res.body.title
    tip.content = res.body.content
    const updatedTip = await tip.save();
    res.json({message:'tip updated successfully'})
})

//@desc: delete tips
//@route: DELETE /
//@access: private
const deleteExistingTip = asyncHandler(async(req,res)=>{
    
})

module.exports = {
    getAllTips,
    postNewTip,
    updateExistingTip,
    deleteExistingTip
}