import mongoose from "mongoose";

const vendaSchema = new mongoose.Schema({
    idVenda : { type: mongoose.Schema.Types.ObjectId },
    idUsuario: {type: String, required: true},
    emailUsuario : { type: String, required: true },
    idLivro : { type: String, required: true },
    nomeLivro : { type: String, required: true },
})

const venda = mongoose.model("vendas", vendaSchema);

export default venda;