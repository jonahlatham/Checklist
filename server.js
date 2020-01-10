const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path')

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/build')))
/////////////////////////////////////////////////////////////// 
let id = 0
let tasks = []
 
app.get('/*', (req, res)=>{
    res.sendFile('index.html', {
        root: path.join(__dirname, "build")
    })
})

app.get('/api/tasks', (req, res) => {
    res.send(tasks)
})

app.post('/api/tasks', (req, res) => {
    id++
    const newItem = { id, task: req.body.task, isComplete: false }
    tasks.push(newItem)
    res.send(tasks)
})

app.put('/api/tasks', (req, res) => {
    tasks = tasks.map((e) => {
        if (e.id === req.body.id) {
            e.isComplete = true
        }
        return e
    })
    res.send(tasks)
})

app.delete('/api/tasks', (req, res) => {
    tasks = tasks.filter((e) => {
        return e.id !== Number(req.query.id)
    })
    res.send(tasks)
})

/////////////////////////////////////////////////////////////////
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

// http://localhost:8080