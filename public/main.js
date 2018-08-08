$(document).ready( () => {
    $.getJSON("/api/todos")
    .then(addTodos);

    $("#todoInput").keypress( (e) => {
        if(e.which == 13){
            createTodo()
        }
    })

    $(".list").on("click","li",function(){
        updateTodo($(this));
    })

    $(".list").on("click","span", function(e){
        e.stopPropagation();
        removeTodo($(this).parent())
    })
});

function addTodos(data){
    data.forEach( element => {
        addTodo(element);
    });
    $( "#sortable" ).sortable();
}

function addTodo(data) { 
    let newTodo = $(`<li class='task'>${data.name}<span>X</span></li>`);
    newTodo.data("id",data._id);
    newTodo.data("completed",data.completed);
        if(data.completed){
            newTodo.addClass("done");
        }
        $(".list").append(newTodo);
}

function createTodo(){
    const userInput = $("#todoInput").val();
    $.post("/api/todos",{name:userInput})
    .then( newdata => {
        addTodo(newdata);
    }).then(() => $("#todoInput").val(" "))
    .catch( err => console.log(err));
}
function removeTodo(todo){
    let getId = todo.data('id');
        $.ajax({
            method:"DELETE",
            url:`/api/todos/${getId}`
        })
        .then((data) =>  todo.remove())
        .catch((err) => console.log(err))
}

function updateTodo(todo){
    let getId = todo.data('id');
    let isDone = !todo.data("completed");
    let updatedData = {completed:isDone};
    $.ajax({
        method:"PUT",
        url:`/api/todos/${getId}`,
        data:updatedData
    })
    .then(updatedTodo => {
        todo.toggleClass("done");
        todo.data("completed",isDone);
    })
}