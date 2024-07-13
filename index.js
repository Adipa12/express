const express = require("express");
const fs = require("fs");

const server = express();
server.use(express.json());
const PORT = 8080;

const readJson = ()=>{                        // for read the json data from db.json file
    const data = fs.readFileSync("db.json");
    return JSON.parse(data);
};
const writrJson=(data)=>{                     // for writing data in db.json file
    fs.writeFileSync("db.json", JSON.stringify(data, null, 2)); 
}


server.get("/todos", (req,res)=>{
    const data = readJson();
    res.send(data)
});

server.post("/todos",(req,res)=>{    // it is a post method/end-point which is very important...
    const data = readJson();
    const newTask = {
        id: data.todos.length +1,
        task: req.body.task,
        status: false
    }
    data.todos.push(newTask);
    writrJson(data);
    res.send(data);
});

server.put("/todos", (req,res)=>{   // it is for update the even id status true
    const data = readJson();
    data.todos.forEach(todo =>{
        if(todo.id % 2 == 0 && todo.status == false){
            todo.status= true;
        }
    })
    writrJson(data);
    res.send(data);
});

server.delete("/todos/delete-true",(req,res)=>{
    const data = readJson();
    data.todos = data.todos.filter((todo)=> !todo.status);
    writrJson(data);
    res.send(data)

});







// server.get("/cart",(req,res)=>{
//     res.send(`<h1>Welcome to cart do your things...</h1>`)
// })

server.listen(PORT,()=>{
    console.log("Port nom. 8080 is listining..");
});
