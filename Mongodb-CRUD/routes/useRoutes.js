const express = require("express")
const router = express.Router()
const userController = require("../controller/useController")
const { isAuth } = require("../middleware/verify")


router.post("/register", userController.register)
router.post('/login',isAuth, userController.login)
router.get('/getall', userController.getall)
router.get("/get/:id",isAuth, userController.getbyId)
router.put('/update/:id',isAuth, userController.update)
router.delete('/delete/:id',isAuth, userController.Delete)

module.exports = router