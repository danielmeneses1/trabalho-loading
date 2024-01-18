import express from "express";

const app = express();

app.use(express.json());

app.use("/livros", livrosRouter);

export default app;