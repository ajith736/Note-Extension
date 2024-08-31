const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// Middleware
app.use(cors());
app.use(express.json());

// Create a todo
app.post("/todos", async (req, res) => {
    try {
        const { description, favorited } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description, favorited) VALUES ($1, $2) RETURNING *",
            [description, favorited]
        );
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Get all todos
app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo ORDER BY favorited DESC");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.patch("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { favorited } = req.body;
        await pool.query("UPDATE todo SET favorited = $1 WHERE todo_id = $2", [favorited, id]);
        res.json("Todo updated");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// Delete a todo
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("Todo deleted");
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(5000, () => {
    console.log("Server started on port 5000");
});
