require('dotenv').config();
require('./db-connection');
const path = require('path');
const express = require("express");
const app = express();
const bp = require('body-parser');
var { getStudents, getStudent, addStudent, editStudent, deleteStudent } = require('./students');
const PORT = process.env.SERVER_PORT || 3001;

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.get("/students", (req, res) => {
    getStudents().then((data, error) => {
        if (error) {
            res.json({ error })
        } else {
            for (let i in data) {
                data[i] = [
                    data[i].name,
                    data[i].surname,
                    data[i].username,
                    data[i].password,
                    data[i].email
                ]
            }
            res.json({ students: data });
        }
        console.log("\x1b[37m", req.url, "\x1b[43m", req.method, "\x1b[0m");
    })
});

app.get("/student/:username", (req, res) => {
    getStudent(req.params.username).then((data, error) => {
        if (error) {
            res.json({ message: "not found" })
        } else {
            res.json({
                student: data
            });
        }
        console.log("\x1b[37m", req.url, "\x1b[43m", req.method, "\x1b[0m");
    })
});

app.post("/student/:username", (req, res) => {
    editStudent({
        name: req.body.name,
        surname: req.body.surname,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    }).then((data, error) => {
        if (error) {
            res.json({ status: "400", message: "Unable to save changes" })
        } else {
            res.json({ status: "200", message: "Changes saved" })
        }
        console.log("\x1b[37m", req.url, "\x1b[43m", req.method, "\x1b[0m");
    });
});

app.post("/student", (req, res) => {
    getStudent(req.body.username).then((data, error) => {
        if (error) {
            res.json({ error })
            console.log("\x1b[37m", req.url, "\x1b[43m", req.method, "\x1b[0m");
        } else {
            if (data == null) {
                addStudent({
                    name: req.body.name,
                    surname: req.body.surname,
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email
                }).then((data, error) => {
                    if (error) {
                        res.json({ status: "400", message: "This username is already taken" })
                    } else {
                        res.json({ status: "200", message: "New user created" })
                    }
                    console.log("\x1b[37m", req.url, "\x1b[43m", req.method, "\x1b[0m");
                });
            } else{
                res.json({ status: "400", message: "This username is already taken" })
                console.log("\x1b[37m", req.url, "\x1b[43m", req.method, "\x1b[0m");
            }
        }
    })
});

app.delete("/student", (req, res) => {
    deleteStudent(req.body.username).then((data, error) => {
        if (error) {
            res.json({ status: "400", message: "Unable to deleted user" });
        } else {
            res.json({ status: "200", message: "User deleted" });
        }
        console.log("\x1b[37m", req.url, "\x1b[43m", req.method, "\x1b[0m");
    })
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});