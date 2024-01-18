import express from "express";

const app = express();

app.use(express.json());

const livros = [
    {
        id: 1,
        Nome: "O Senhor dos Anéis",
    },
    {
        id: 2,
        Nome: "Harry Potter",
    }
]

app.get("/", (req, res) => {
    res.send("Daniel");
});

app.get("/livros", (req, res) => {
    res.status(200).json(livros);
});

app.post("/livros", (req, res) => {
    livros.push(req.body);
    res.status(201).json(livros);
})

app.get("/livros/:id", (req, res) => {
    const id = req.params.id;
    const livro = livros.find(livro => livro.id == id);
    if (livro) {
        res.status(200).json(livro);
    } else {
        res.status(404).json({ mensagem: "Livro não encontrado" });
    }
});

app.put("/livros/:id", (req, res) => {
    const id = req.params.id;
    const novoNome = req.body.Nome;
    const livro = livros.find(livro => livro.id == id);
    if (livro) {
        livro.Nome = novoNome;
        res.status(200).json(livro);
    } else {
        res.status(404).json({ mensagem: "Livro não encontrado" });
    }
});

app.delete("/livros/:id", (req, res) => {
    const id = req.params.id;
    const livro = livros.find(livro => livro.id == id);
    if (livro) {
        livros.splice(livros.indexOf(livro), 1);
        res.status(200).json(livro);
    } else {
        res.status(404).json({ mensagem: "Livro não encontrado" });
    }
});




export default app;