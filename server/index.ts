import express from "express";
import path from "path";
import 'dotenv/config';
import "./database";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../build")));

app.get("/api/jobs", (req, res) => {
    res.json({
        message: "Hello World!!!",
    });
});

app.post("/api/jobs", (req, res) => {
    res.json({
        message: "Hello World!!!",
    });
});

app.put("/api/jobs", (req, res) => {
    res.json({
        message: "Hello World!!!",
    });
});

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(port, async () => {
    console.log(`Listening on port ${port}`)
});