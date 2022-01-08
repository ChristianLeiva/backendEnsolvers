
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

let query = ()=>{

}

const returnList = async ()=>{
    

    let result = await selectAll();
    return result;
}

app.get('/getItemList', async (req, res) => {

    console.log("returning item list")
    let r = await returnList();
    res.send(r)
})

app.post('/addItem', async (req, res) => {
    console.log("item added", req.body)

    let toDo = req.body;


    await new Promise((resolve, reject)=>{
        var query = connection.query('INSERT INTO list SET ?', toDo, function (error, results, fields) {
            if (error) reject(err);
            resolve(results)
          });
    });

    let r = await returnList();
    res.json(r)

    
    
})

app.delete('/deleteItem/:id', async (req, res) => {
    console.log("item deleted", "id " + req.params.id)

    await new Promise((resolve, reject)=>{
        var query = connection.query('DELETE from list where id = ' + req.params.id, function (error, results, fields) {
            if (error) reject(err);
            resolve(results)
          });
    });

    let r = await returnList();
    res.json(r)
})