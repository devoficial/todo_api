let db = require("../models");


exports.getTodo = (req,res) => {
    db.Todo.find()
    .then( data =>  res.status(201).json(data))
    .catch(err => res.send(err))
}

exports.createTodo = (req,res) => {
    db.Todo.create(req.body)
    .then(newTodo => res.json(newTodo))
    .catch(err => res.send(err))
}

exports.getSingleTodo = (req,res) => {
    db.Todo.findById(req.params.todoId)
    .then(data => res.json(data))
    .catch(err => res.send(err))
}
exports.updateTodo = (req,res) => {
    db.Todo.findOneAndUpdate({_id:req.params.todoId},req.body,{new:true})
    .then(data => res.json(data))
    .catch(err => res.send(err))
}

exports.deleteTodo = (req,res) => {
    db.Todo.remove({_id:req.params.todoId})
    .then(() =>  res.json({message:"That was deleted."}))
    .catch(err => res.send(err))
}



module.exports = exports;