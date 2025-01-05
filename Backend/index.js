const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const ToDoModel = require("./Models/Todo")

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.use(cors({
    origin: '*', 
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));
  
// const mongoUrl = "mongodb://localhost:27017/NEW-DOCKER-DB";
// const mongoUrl = "mongodb://mongo-service:27017/NEW-DOCKER-DB";
const mongoUrl = process.env.MONGO_URI || "mongodb://mongo:27017/myapp";
console.log(mongoUrl, "???????")
mongoose.connect(mongoUrl , {
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.then(() => {
    console.log("Mongo Connection Established Successfully!")
})
.catch(() => {
    console.log("Mongo connection error")
})

app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

  
app.post('/add' , async(req, res) => {
    const task = req.body.task
    if (!task) {
        console.log('Task is required!')
        return res.status(400).json({ message: 'Task is required' });
      }
    const result = await ToDoModel.create({
        task : task
    })

    console.log(result)
    res.send(result)
})

app.get('/get' , async(req, res)=> {
    const result = await ToDoModel.find()
    
    console.log(result)
    res.send(result)
})

app.put('/update/:id', (req, res)=> {
    const {id} = req.params
    if (!id) {
        console.log('id is required!')
        return res.status(400).json({ message: 'Task is required' });
      }
    ToDoModel.findByIdAndUpdate({_id : id}, {done : true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.delete('/delete/:id', (req, res)=> {
    const {id} = req.params
    if (!id) {
        console.log('id is required!')
        return res.status(400).json({ message: 'Task is required' });
      }
    ToDoModel.findByIdAndDelete({_id : id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.listen(port , '0.0.0.0', () => {
    console.log("Server Connects Succesfully!");
})