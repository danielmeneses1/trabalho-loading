import express from "express";
import livrosRouter from "./routs/RotaLivros.js";
import usuariosRouter from "./routs/RotaUsuarios.js";
import conectaNaDatabase from "./config/dbconnect.js";

const conexao = await conectaNaDatabase();

conexao.on("error", (erro)=>{
    console.error("Erro na conexão com o MongoDB: " + erro);
});

conexao.once("open", ()=>{
    console.log("Conexão com o MongoDB realizada com sucesso!");
});



const app = express();

app.use(express.json());

app.use("/livros", livrosRouter);
app.use("/usuarios", usuariosRouter);

export default app;

//mongodb+srv://admin:<password>@cluster0.ppo3xsa.mongodb.net/?retryWrites=true&w=majority