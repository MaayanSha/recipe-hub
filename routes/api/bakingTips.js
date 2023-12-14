const express = require('express')
const router = express.Router()
const path = require('path')
const bakingTipsController = require('../../controllers/bakingTipsController')

router.route('/')
    .get(bakingTipsController.getAllTips)
    .post(bakingTipsController.postNewTip)
    .patch(bakingTipsController.updateExistingTip)
    .delete(bakingTipsController.deleteExistingTip)


module.exports = router