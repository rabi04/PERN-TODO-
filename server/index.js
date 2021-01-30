const express = require("express");
const app = express();
const cors = require('cors');
const pool = require('./db');
const { Console } = require("console");
const port = 5000;

 //middleware
 app.use(cors());
 app.use(express.json());//allowa us to access the req.body.
 
 //Routes

 //Get all todo
 app.get('/todos', async(req, res)=>{
    try {
        const alltodos = await pool.query("SELECT * FROM TODO");
        res.json(alltodos.rows);
        console.log("Get all is working fine!!");
    } catch (error) {
        console.error(error.message);
    }
})

 //get a todo
 app.get('/todos/:id' , async(req,res)=>{
    try {
        const {id} = req.params;
        const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1',[id]);
        res.json(todo.rows);
        console.log("GET  a todo is working fine!!");
    } catch (error) {
        Console.error(error.message);
    }
 });
 
 //create a todo
 app.post('/todos', async(req , res)=>{
     try {
          //res.json(req.body);
          const {description}  = req.body;
          const newtodos = await pool.query("INSERT INTO TODO (description) VALUES ($1) RETURNING *",[description]);
          res.json(newtodos.rows);
          console.log("Add(post) a todo is working fine!!!")
     } catch (error) {
         console.error(error.message);
     }
 });

 //update a todo
 app.put('/update/:id',async(req,res)=>{
    try {
        const {id} = req.params
        const {description} = req.body;
        const updateValue = await pool.query("UPDATE todo SET description = $1 WHERE todo_id=$2",[description , id]);
        res.status(200).json(description);
    } catch (error) {
        console.error(error.message);
    }
 });

 //delete a todo
 app.delete('/delete/:id' , async(req , res)=>{
     try {
         const {id} = req.params;
         await pool.query("DELETE FROM todo WHERE todo_id = $1" , [id]);
         res.json(`deleted todo_id ${id}`);
         console.log("delete succesful!!!");
     } catch (error) {
         console.error(error.message);
     }
 })

//
 app.listen(port, ()=>{
     console.log(`listing to port ${port}`);
 })