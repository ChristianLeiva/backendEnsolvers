
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const app = express();
const port = 4000


app.use(cors());

app.use(bodyparser.json());


app.get('/', (res, req) => {
    res.send('Hello World');
})

app.listen(port, () => {
    console.log(`Server on port ${port}`);
})


// get obtener
// post crear
// put actualizar
// delete borrar 
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

app.get('/getItemList', (req, res) => {
    res.json(list)
})

app.post('/addToDoList', (req, res) => {
    let id = uuidv4();
    let toDo = req.body;
    toDo.id = id;
    list.push(toDo);
    res.json(list)
})

app.delete('/deleteItemList/:id', (req, res) => {
    //eliminar un item de la lista.
    //actualizar lista.
    //retornar la lista

    list.findIndex((elemento) => {

        return elemento.id == req.params.id;
    })
})