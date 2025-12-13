const express = require("express")
const { AddBook, Getall, updateBook, deleteBook } = require("../controller/bookcontroller")

const router = express.Router()

router.post('/bookregister', AddBook)
router.get('/getall', Getall)
router.put('/updatebook', updateBook)
router.delete('/deletebook', deleteBook)

module.exports = router