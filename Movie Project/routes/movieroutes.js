const express = require("express")
const { Addmovie, getall, getbyId, UpdateMovie, deleteMovie } = require("../controller/moviecontroller")

const router = express.Router()

router.post('/add', Addmovie)
router.get('/getall', getall)
router.get('/get/:id', getbyId)
router.put("/update", UpdateMovie)
router.delete("/delete", deleteMovie)

module.exports = router