let express = require("express"),
    router = express.Router();

let  db = require("../models");
let helpers = require("../helpers/todo");
    


router.route("/")
.get(helpers.getTodo)
.post(helpers.createTodo)


router.route("/:todoId")
.get(helpers.getSingleTodo)
.put(helpers.updateTodo)
.delete(helpers.deleteTodo)



module.exports = router;