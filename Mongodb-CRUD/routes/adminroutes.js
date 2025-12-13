const express = require("express")
const router = express.Router()
const userController = require("../controller/useController")
const { isAdmin } = require("../middleware/isAdmin")

router.post('/login',isAdmin, userController.adminLogin)

module.exports = router