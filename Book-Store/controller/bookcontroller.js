const Book = require('../model/bookmodel')

exports.AddBook = async (req,res)=>{
    const { name, author , price } = req.body

    if(!name || !author || !price){
        return res.status(404).json({message : "All fields are required"})
    }
    const extBook = await Book.findOne({name})

    if(extBook){
        return res.status(404).json({message : "Book already exists"})
    }

    const book = Book.create({
        name,
        author,
        price
    })

    res.status(201).json({message : "Book Added..", book})
}

exports.Getall = async (req,res)=>{
    const getall = await Book.find()
    if(!getall){
        return res.status(404).json({message : "Date is empty"})
    }

    res.status(201).json({getall})
}

exports.getBook = async (req,res)=>{
    const id = req.params.id
    const book = await Book.findById(id)
      if (!book) {
        return res.status(401).json({message: "Book not Found !"})
    }
    res.status(201).json({message:"Book Found Successfully.", book})
}

exports.updateBook = async (req,res)=>{
    const id = req.params.id
    const {name, author, price} = req.body
    const book = await Book.findByIdAndUpdate(id, {
        name,author,price
    },{
        new : true,
        runValidators : true
    }
    )
     if (!book) {
        return res.status(401).json({message: "Book not Found !"})
    }
    res.status(201).json({message: "Book Details Updated successfully..", book})
}

exports.deleteBook = async (req,res)=>{
    const id = req.params.id

    const book = await Book.findByIdAndDelete(id)
    if (!book) {
        return res.status(401).json({message: "Book not Found !"})
    }
    res.status(201).json({message: "Book Deleted Successfully." , success:true})
}