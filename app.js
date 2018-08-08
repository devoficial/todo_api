let express = require("express"),
    app = express(),
    port = 3000,
    bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(express.static(__dirname + "/views"));


let todoRoutes = require("./routes/todos")

app.get("/",(req,res) => res.sendFile("index.html"));

app.use("/api/todos",todoRoutes);

app.listen(port,() => console.log(`App is running on port ${port}`));