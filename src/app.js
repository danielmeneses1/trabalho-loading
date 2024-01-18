import { Express } from "express";

const app = new Express();

app.get("/", (req, res) => {
    res.send("Daniel");
});