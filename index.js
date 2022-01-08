
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const app = express();
const port = 4000
const mysql      = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'admin',
  database : 'todos'
});

connection.connect();

app.use(cors());

app.use(bodyparser.json());


app.get('/', (res, req) => {
    res.send('Hello World');
})

app.listen(port, () => {
    console.log(`Server on port ${port}`);
})


const list = [
    {
        id: 1,
        checbox: false,
        text: "Estudiar",
    },
    {
        id: 2,
        checbox: true,
        text: "alkdfmakld",
    }
];

let selectAll = () => {
    return new Promise((resolve, reject)=>{
        connection.query('SELECT * from list', function (error, results, fields) {
            
            if (error) {
                reject(["banana"]);
            };
            
           resolve(results)
        });
    })
}

const returnList = async ()=>{
    

    let result = await selectAll();
    return result;
}

app.get('/getItemList', (req, res) => {

    console.log("returning item list")
    let r = returnList();
    console.log("R", r)
    res.send(r)
})

app.post('/addItem', (req, res) => {
    console.log("item added", req.body)
    //let id = uuidv4();
    let toDo = req.body;
    //toDo.id = id;
    //connection.connect();
    var query = connection.query('INSERT INTO list SET ?', toDo, function (error, results, fields) {
        if (error) throw error;
        // Neat!
      });
    //connection.end();
    res.json(returnList())
    
    
})

app.delete('/deleteItem/:id', (req, res) => {
    console.log("item deleted", "id " + req.params.id)

    let index = list.findIndex((elemento) => {
        return elemento.id == req.params.id;
    })

    if(index >= 0){
        list.splice(index,1);
    }  

    res.json(list);
})