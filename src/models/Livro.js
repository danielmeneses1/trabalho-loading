import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: { type: String, required: true },
    preco: { type: Number , required : true},
    paginas: { type: Number },
    genero: { type: String , required: true},
   }, { versionKey: false });
   
   const livro = mongoose.model("livros", livroSchema);
   
   export default livro;